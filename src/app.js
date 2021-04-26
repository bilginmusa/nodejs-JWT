import "dotenv/config";
import "./clients/db";
import express from "express";
import cors from "cors";
import routes from "./routes";
import { notFound, generalError } from "./middlewares/errorHandle";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

app.use(notFound());
app.use(generalError());

app.listen(4000, () => console.log("Server is up !!"));
