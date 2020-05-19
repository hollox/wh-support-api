import dotenv from "dotenv";
import { Configuration } from "./configuration.model";

dotenv.config();

export const SYSTEM_UUID = "069e6090-6cc7-4e19-b809-b25b7f4069af";

export function getConfiguration(): Configuration {
  return {
    port: parseInt(process.env.PORT as string),
    databaseUrl: process.env.DATABASE_URL as string,
    databaseSsl: process.env.DATABASE_SSL !== "false",
    databaseMaxConnection: parseInt(
      process.env.DATABASE_MAX_CONNECTION as string,
      10
    )
  };
}
