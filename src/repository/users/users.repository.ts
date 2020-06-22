import { executeQuery } from "../postgresql";
import { User } from "../../entities/users.models";
import { UserRecord } from "./users.models";
import { convertRecordsToModels, convertRecordToModel } from "./users.helper";
import { QueryConfig } from "pg";
import { SYSTEM_UUID } from "../../configuration/configuration.service";

export async function getByOrganizationId(organizationId: string): Promise<User[]> {
  const query = {
    text: `
SELECT
    users.user_id,
    users.organization_id,
    users.email,
    users.firstname,
    users.lastname
FROM users
WHERE users.organization_id = $1
AND users.code IS DISTINCT FROM 'system'`,
    values: [organizationId]
  };
  const { rows } = await executeQuery<UserRecord>(query);
  return convertRecordsToModels(rows);
}

export async function getByAuthenticationId(authenticationId: string, authenticatorId: string): Promise<User | null> {
  const query = {
    text: `
SELECT
    users.user_id,
    users.organization_id,
    users.email,
    users.firstname,
    users.lastname
FROM users
LEFT JOIN user_authentications
ON users.user_id = user_authentications.user_id
AND user_authentications.authenticator_id = $2
WHERE user_authentications.authentication_id = $1`,
    values: [authenticationId, authenticatorId]
  };

  const { rows } = await executeQuery<UserRecord>(query);

  if (rows.length > 0) {
    return convertRecordToModel(rows[0]);
  } else {
    return null;
  }
}

export async function save(user: User): Promise<User> {
  const getQuery = user.userId ? update : insert;
  const query = getQuery(user);
  const { rows } = await executeQuery<UserRecord>(query);
  return convertRecordToModel(rows[0]);
}

function insert(user: User): QueryConfig {
  return {
    text: `
INSERT INTO users
(
  organization_id,
  email,
  firstname,
  lastname,
  
  creation_user_id,
  creation_date,
  modification_user_id,
  modification_date
) VALUES (
  $1,
  $2,
  $3,
  $4,
  
  $5,
  now(),
  $5,
  now())
RETURNING
  user_id,
  organization_id,
  email,
  firstname,
  lastname`,
    values: [user.organizationId, user.email, user.firstname, user.lastname, SYSTEM_UUID]
  };
}

function update(user: User): QueryConfig {
  return {
    text: `
UPDATE users SET
  email = $2,
  firstname = $3,
  lastname = $4,
  
  modification_user_id = $5,
  modification_date = now()
WHERE user_id = $1
AND code <> 'system'
RETURNING
  user_id,
  organization_id,
  email,
  firstname,
  lastname`,
    values: [user.userId, user.email, user.firstname, user.lastname, SYSTEM_UUID]
  };
}
