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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
//Config
app.set("port", process.env.PORT || 4500);
app.use(express_1.default.static("public"));
//Middlewares
app.use(express_1.default.json());
app.use((0, cors_1.default)({ origin: "*" }));
//Routes
app.use("/api/v1", routes_1.default);
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect("mongodb+srv://z4kvt4:06041998@miclusterappnode.cd40k.mongodb.net/hackathon?retryWrites=true&w=majority");
            console.log("Mongodb connect...");
            app.listen(app.get("port"), () => {
                console.log(`Server on port: ${app.get("port")}`);
            });
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.default = main;
