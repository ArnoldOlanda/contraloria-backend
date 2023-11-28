import { Request, Response, Router } from "express";
import fs from "fs";
import { param } from "express-validator";
import Papa from "papaparse";
import { Proyecto } from "../schema/proyecto.schema";
import { Departamento } from "../schema/departamento.schema";
import { Provincia } from "../schema/provincia.schema";
import { Distrito } from "../schema/distrito.schema";

const router = Router();

router.get("/seed", (_req, res) => {
    try {
        fs.readFile("./src/data/proyectos_data.csv", "utf8", (err, data) => {
            if (err) {
                console.error(err);
                return;
            }

            Papa.parse(data, {
                header: true,
                complete: async function (results: any) {
                    // console.log(results.data);
                    // El array 'results.data' contendrá los datos del CSV
                    Promise.all(
                        results.data.map(async (data: any) => {
                            const newProyecto = new Proyecto({
                                ...data,
                                location: {
                                    type: "Point",
                                    coordinates: [
                                        Number(data.longitud),
                                        Number(data.latitud),
                                    ],
                                },
                            });
                            await newProyecto.save();
                        })
                    );
                    res.json({ msg: "Data loaded..." });
                },
                error: function (error: any) {
                    console.error(error.message);
                    res.json({ msg: "Error while loading data" });
                },
            });
        });
    } catch (error) {}
});

router.get("/nearby_locations/:lat/:lng", async (req, res) => {
    const { lat, lng } = req.params;

    try {
        const results = await Proyecto.aggregate([
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
    } catch (error) {
        console.log(error);
    }
});

router.get("/proyectos/:cui", async (req, res) => {
    const { cui } = req.params;
    const proyectos = await Proyecto.find({ cui });
    res.json(proyectos);
});

router.post("/comment/:id", async (req, res) => {
    const { id } = req.params;
    const { author = "default", comment = "default" } = req.body;

    const proyecto = await Proyecto.findById(id);
    if (!proyecto) throw new Error("El proyecto no existe");

    proyecto.comments.push({
        author,
        comment,
        createdAt: new Date(),
    });

    const updatedProyecto = await proyecto.save();

    res.json(updatedProyecto);
});

router.get("/dashboard/:id", async (req, res) => {
    try {
        const { id } = req.params;
        res.json({ message: `Dashboard data for project with id ${id}` });
    } catch (error) {}
});

router.get(
    "/ubigeo/:ubigeo?",
    [param("ubigeo").optional()],
    async (req: Request, res: Response) => {
        try {
            const { ubigeo } = req.params;
            let ubigeoDb: any;

            if (!ubigeo) {
                ubigeoDb = await Departamento.find();
            } else if (ubigeo.length === 2) {
                ubigeoDb = await Provincia.find({ department_id: ubigeo });
            } else if (ubigeo.length === 4) {
                ubigeoDb = await Distrito.find({ province_id: ubigeo });
            } else {
                return res.json({
                    message: "El codigo de ubigeo no es valido",
                });
            }

            res.json(ubigeoDb);
        } catch (error) {}
    }
);

export default router;
