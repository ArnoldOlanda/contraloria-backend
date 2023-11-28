"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Distrito = void 0;
const mongoose_1 = require("mongoose");
const distritoSchema = new mongoose_1.Schema({
    id: String,
    name: String,
    province_id: String,
    department_id: String,
});
exports.Distrito = (0, mongoose_1.model)("distrito", distritoSchema);
