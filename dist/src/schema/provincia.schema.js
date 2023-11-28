"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Provincia = void 0;
const mongoose_1 = require("mongoose");
const provinciaSchema = new mongoose_1.Schema({
    id: String,
    name: String,
    department_id: String,
});
exports.Provincia = (0, mongoose_1.model)("provincia", provinciaSchema);
