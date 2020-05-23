import express from "express";
import { router } from "./router";
import * as configurationService from "./configuration/configuration.service";

export const app = express();

const configuration = configurationService.getConfiguration();

app.locals.set("configuration", configuration);

app.disable("x-powered-by");
app.use("/", router);
