"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Departamento = void 0;
const mongoose_1 = require("mongoose");
const departamentoSchema = new mongoose_1.Schema({
    id: String,
    name: String,
});
exports.Departamento = (0, mongoose_1.model)("departamento", departamentoSchema);
