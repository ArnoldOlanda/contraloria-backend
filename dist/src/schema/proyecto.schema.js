"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Proyecto = void 0;
const mongoose_1 = require("mongoose");
const proyectoSchema = new mongoose_1.Schema({
    cui: { type: String },
    name: { type: String },
    entidad: { type: String },
    comments: [
        {
            author: { type: String },
            comment: { type: String },
            createdAt: { type: Date, default: Date.now() },
        },
    ],
    photos: [{ type: String }],
    distrito: { type: String },
    provincia: { type: String },
    departamento: { type: String },
    MONTO_VIABLE: { type: Number },
    COSTO_ACTUALIZADO: { type: Number },
    DEFASE_MONTO: { type: Number },
    estado: { type: String },
    avance_fisico_real_soles: { type: Number, default: 0 },
    avance_inversion_soles: { type: Number, default: 0 },
    desfase_avance_fis_fin: { type: Number, default: 0 },
    ejec_fis_real_inicio: { type: Date },
    ejec_fis_real_final: { type: Date },
    ano_ejecucion: { type: Number },
    ubigeo: { type: Number, default: 0 },
    latitud: { type: String, default: "0" },
    longitud: { type: String, default: "0" },
    location: {
        type: {
            type: String,
        },
        coordinates: [],
    },
});
proyectoSchema.index({ location: "2dsphere" });
exports.Proyecto = (0, mongoose_1.model)("Proyecto", proyectoSchema);
