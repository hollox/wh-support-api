import cors from "cors";
import { Router } from "express";
import { routerV1 } from "./api/routers/router-v1";
import parser from "body-parser";

export const router = Router();

router.use(cors());
router.use(parser.json());

router.use("/v1", routerV1);
