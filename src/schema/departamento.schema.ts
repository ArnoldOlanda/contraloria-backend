import { Schema, model } from "mongoose";

interface DepartamentoSchema {
    id: string;
    name: string;
}

const departamentoSchema = new Schema<DepartamentoSchema>({
    id: String,
    name: String,
});

export const Departamento = model("departamento", departamentoSchema);
