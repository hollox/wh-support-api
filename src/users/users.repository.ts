import { executeQuery } from "../utils/postgresql";
import { convertRowsToModels } from "./users.helper";
import { User, UserRecord } from "./users.models";
import { convertRowToModel } from "./users.helper";
import { QueryConfig } from "pg";
import { SYSTEM_UUID } from "../configuration/configuration.service";

export async function getByOrganizationId(userId: string): Promise<User[]> {
  const query = {
    text: `
SELECT user_id, firstname, lastname FROM users WHERE user_id = $1`,
    values: [userId]
  };

  const { rows } = await executeQuery<UserRecord>(query);
  return convertRowsToModels(rows);
}

export async function save(user: User): Promise<User> {
  const getQuery = user.userId ? update : insert;
  const query = getQuery(user);
  const { rows } = await executeQuery<UserRecord>(query);
  return convertRowToModel(rows[0]);
}

function insert(user: User): QueryConfig {
  return {
    text: `
INSERT INTO users
(
  name,
  creation_user_id,
  creation_date,
  modification_user_id,
  modification_date
) VALUES (
  $1,
  $2,
  now(),
  $2,
  now())
RETURNING
  organization_id,
  name`,
    values: [user.firstname, SYSTEM_UUID]
  };
}

function update(user: User): QueryConfig {
  return {
    text: `
UPDATE users SET
  name = $2,
  modification_user_id = $3,
  modification_date = now()
WHERE organization_id = $1
RETURNING
  organization_id,
  name`,
    values: [user.firstname, SYSTEM_UUID]
  };
}
