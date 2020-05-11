import { routerV1 } from "./routers/router-v1";

export const router = Router();

router.use(cors());
router.use(parser.json());

router.use("/v1", routerV1);
