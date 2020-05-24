import { Pool, QueryConfig, QueryResult } from "pg";
import { logger } from "./logger";
import { getConfiguration } from "../configuration/configuration.service";

const configurations = getConfiguration();

export const pool = new Pool({
  connectionString: configurations.database.url,
  ssl: configurations.database.ssl,
  max: configurations.database.maxConnection
});

export type QueryExecutor = (q: QueryConfig) => Promise<QueryResult>;

export function executeQuery<T>(q: QueryConfig): Promise<QueryResult<T>> {
  return pool.query<T>(q);
}

export async function executeQueryInTransaction<T>(
  inTransactionCallback: (queryExecutor: QueryExecutor) => Promise<T>
): Promise<T> {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    const result = await inTransactionCallback((queryConfig: QueryConfig) =>
      client.query(queryConfig)
    );
    await client.query("COMMIT");
    return result;
  } catch (error) {
    logger.error(
      "There was an error when trying to execute an SQL statement",
      error
    );
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}
