export interface Configuration {
  server: ServerConfiguration;
  database: DatabaseConfiguration;
  authentication: AuthenticationConfiguration;
}

interface ServerConfiguration {
  port: number;
}

interface DatabaseConfiguration {
  url: string;
  ssl: boolean;
  maxConnection: number;
}

interface AuthenticationConfiguration {
  authenticatorId: string;
  publicKeyUrl: string;
}
