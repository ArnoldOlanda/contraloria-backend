import { Schema, model } from "mongoose";

interface Comment {
    author: string;
    comment: string;
    createdAt: Date;
}

interface ProyectoSchema {
    cui: string;
    name: string;
    entidad: string;
    comments: Comment[];
    photos: string[];
    distrito: string;
    provincia: string;
    departamento: string;
    MONTO_VIABLE: number;
    COSTO_ACTUALIZADO: number;
    DEFASE_MONTO: number;
    estado: string;
    avance_fisico_real_soles: number;
    avance_inversion_soles: number;
    desfase_avance_fis_fin: number;
    ejec_fis_real_inicio: Date;
    ejec_fis_real_final: Date;
    ano_ejecucion: number;
    ubigeo: number;
    latitud: string;
    longitud: string;
    location: {
        type: {
            type: string;
            coordinates: [number];
        };
    };
}

const proyectoSchema = new Schema<ProyectoSchema>({
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

export const Proyecto = model("Proyecto", proyectoSchema);
