import express from "express";
import { router } from "./router";
import * as configurationService from "../configuration/configuration.service";

export const app = express();

app.locals.configuration = configurationService.getConfiguration();

app.disable("x-powered-by");
app.use("/", router);
