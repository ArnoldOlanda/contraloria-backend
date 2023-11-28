import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import projectsRouter from "./routes";

const app = express();

//Config
app.set("port", process.env.PORT || 4500);
app.use(express.static("public"));

//Middlewares
app.use(express.json());
app.use(cors());

//Routes
app.use("/api/v1", projectsRouter);

async function main() {
    try {
        await mongoose.connect(
            "mongodb+srv://z4kvt4:06041998@miclusterappnode.cd40k.mongodb.net/hackathon?retryWrites=true&w=majority"
        );
        console.log("Mongodb connect...");
        app.listen(app.get("port"), () => {
            console.log(`Server on port: ${app.get("port")}`);
        });
    } catch (error) {
        console.log(error);
    }
}

export default main;
