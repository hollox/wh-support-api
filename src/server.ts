import { app } from "./app";
import { logger } from "./utils/logger";

const port = process.env.PORT;

app.listen(port, () => logger.info(`launched on ${port}`));
