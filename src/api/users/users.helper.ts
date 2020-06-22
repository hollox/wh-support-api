import { User } from "../../entities/users.models";
import { UserJson } from "./users.models";

export function convertJsonToModels(usersJson: UserJson[]): User[] {
  if (!usersJson) {
    return [];
  }
  return usersJson.map(convertJsonToModel);
}

export function convertJsonToModel(userJson: UserJson): User {
  return {
    userId: userJson.user_id,
    organizationId: userJson.organization_id,
    email: userJson.email,
    firstname: userJson.firstname,
    lastname: userJson.lastname,
    permissions: []
  };
}

export function convertModelsToJson(users: User[]): UserJson[] {
  return users.map(convertModelToJson);
}

export function convertModelToJson(user: User): UserJson {
  return {
    user_id: user.userId,
    organization_id: user.organizationId,
    email: user.email,
    firstname: user.firstname,
    lastname: user.lastname
  };
}
