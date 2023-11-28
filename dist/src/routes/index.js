"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fs_1 = __importDefault(require("fs"));
const express_validator_1 = require("express-validator");
const papaparse_1 = __importDefault(require("papaparse"));
const proyecto_schema_1 = require("../schema/proyecto.schema");
const departamento_schema_1 = require("../schema/departamento.schema");
const provincia_schema_1 = require("../schema/provincia.schema");
const distrito_schema_1 = require("../schema/distrito.schema");
const router = (0, express_1.Router)();
router.get("/seed", (_req, res) => {
    try {
        fs_1.default.readFile("./src/data/proyectos_data.csv", "utf8", (err, data) => {
            if (err) {
                console.error(err);
                return;
            }
            papaparse_1.default.parse(data, {
                header: true,
                complete: function (results) {
                    return __awaiter(this, void 0, void 0, function* () {
                        // console.log(results.data);
                        // El array 'results.data' contendrá los datos del CSV
                        Promise.all(results.data.map((data) => __awaiter(this, void 0, void 0, function* () {
                            const newProyecto = new proyecto_schema_1.Proyecto(Object.assign(Object.assign({}, data), { location: {
                                    type: "Point",
                                    coordinates: [
                                        Number(data.longitud),
                                        Number(data.latitud),
                                    ],
                                } }));
                            yield newProyecto.save();
                        })));
                        res.json({ msg: "Data loaded..." });
                    });
                },
                error: function (error) {
                    console.error(error.message);
                    res.json({ msg: "Error while loading data" });
                },
            });
        });
    }
    catch (error) { }
});
router.get("/nearby_locations/:lat/:lng", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { lat, lng } = req.params;
    try {
        const results = yield proyecto_schema_1.Proyecto.aggregate([
            {
                $geoNear: {
                    near: {
                        type: "Point",
                        coordinates: [Number(lng), Number(lat)],
                    },
                    distanceField: "distance",
                    spherical: true,
                    maxDistance: 5000,
                },
            },
        ]);
        return res.json({ results });
    }
    catch (error) {
        console.log(error);
    }
}));
router.get("/proyectos/:cui", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cui } = req.params;
    const proyectos = yield proyecto_schema_1.Proyecto.find({ cui });
    res.json(proyectos);
}));
router.post("/comment/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { author = "default", comment = "default" } = req.body;
    const proyecto = yield proyecto_schema_1.Proyecto.findById(id);
    if (!proyecto)
        throw new Error("El proyecto no existe");
    proyecto.comments.push({
        author,
        comment,
        createdAt: new Date(),
    });
    const updatedProyecto = yield proyecto.save();
    res.json(updatedProyecto);
}));
router.get("/dashboard/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        res.json({ message: `Dashboard data for project with id ${id}` });
    }
    catch (error) { }
}));
router.get("/ubigeo/:ubigeo?", [(0, express_validator_1.param)("ubigeo").optional()], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { ubigeo } = req.params;
        let ubigeoDb;
        if (!ubigeo) {
            ubigeoDb = yield departamento_schema_1.Departamento.find();
        }
        else if (ubigeo.length === 2) {
            ubigeoDb = yield provincia_schema_1.Provincia.find({ department_id: ubigeo });
        }
        else if (ubigeo.length === 4) {
            ubigeoDb = yield distrito_schema_1.Distrito.find({ province_id: ubigeo });
        }
        else {
            return res.json({
                message: "El codigo de ubigeo no es valido",
            });
        }
        res.json(ubigeoDb);
    }
    catch (error) { }
}));
exports.default = router;
