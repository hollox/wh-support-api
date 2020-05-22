import { User, UserJson, UserRecord } from "./users.models";

export function convertJsonToModel(userJson: UserJson): User {
  return {
    userId: userJson.user_id,
    email: userJson.email,
    firstname: userJson.firstname,
    lastname: userJson.lastname
  };
}

export function convertModelsToJson(users: User[]): UserJson[] {
  return users.map(convertModelToJson);
}

export function convertModelToJson(user: User): UserJson {
  return {
    user_id: user.userId,
    email: user.email,
    firstname: user.firstname,
    lastname: user.lastname
  };
}

export function convertRowsToModels(rows: UserRecord[]): User[] {
  return rows.map(convertRowToModel);
}

export function convertRowToModel(row: UserRecord): User {
  return {
    userId: row.user_id,
    email: row.email,
    firstname: row.firstname,
    lastname: row.lastname
  };
}
