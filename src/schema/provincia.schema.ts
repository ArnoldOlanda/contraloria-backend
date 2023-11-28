import { Schema, model } from "mongoose";

interface ProvinciaSchema {
    id: string;
    name: string;
    department_id: string;
}

const provinciaSchema = new Schema<ProvinciaSchema>({
    id: String,
    name: String,
    department_id: String,
});

export const Provincia = model("provincia", provinciaSchema);
