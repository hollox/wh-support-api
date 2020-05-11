import { app } from "./app";
import { logger } from "./utils/logger";
import { getConfiguration } from "./configuration/configuration.service";

const configuration = getConfiguration();

app.listen(configuration.port, () =>
  logger.info(`launched on ${configuration.port}`)
);
