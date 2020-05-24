import dotenv from "dotenv";
import { Configuration } from "./configuration.model";

dotenv.config();

export const SYSTEM_UUID = "069e6090-6cc7-4e19-b809-b25b7f4069af";

export function getConfiguration(): Configuration {
  return {
    server: {
      port: parseInt(process.env.PORT as string)
    },
    database: {
      url: process.env.DATABASE_URL as string,
      ssl: process.env.DATABASE_SSL !== "false",
      maxConnection: parseInt(process.env.DATABASE_MAX_CONNECTION as string, 10)
    },
    authentication: {
      authenticatorId: process.env.AUTHENTICATION_AUTHENTICATOR_ID as string,
      publicKeyUrl: process.env.AUTHENTICATION_PUBLIC_KEY_URL as string,
      infoUrl: process.env.AUTHENTICATION_INFO_URL as string,
      infoApiKey: process.env.AUTHENTICATION_INFO_API_KEY as string
    }
  };
}
