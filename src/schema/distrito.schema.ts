import { Schema, model } from "mongoose";

interface DistritoSchema {
    id: string;
    name: string;
    province_id: string;
    department_id: string;
}

const distritoSchema = new Schema<DistritoSchema>({
    id: String,
    name: String,
    province_id: String,
    department_id: String,
});

export const Distrito = model("distrito", distritoSchema);
