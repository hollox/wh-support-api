import dotenv from "dotenv";
import { Configuration } from "./configuration.model";

dotenv.config();

export function getConfiguration(): Configuration {
  return {
    port: parseInt(process.env.PORT as string)
  };
}
