import { User } from "./users.models";
import * as repository from "./users.repository";

export async function getUsersByOrganizationId(
  organizationId: string
): Promise<User[]> {
  return repository.getByOrganizationId(organizationId);
}

export async function saveUser(user: User): Promise<User> {
  return repository.save(user);
}
