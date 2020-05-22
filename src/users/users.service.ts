import { User } from "./users.models";
import * as usersRepository from "./users.repository";

export async function getByOrganizationId(
  organizationId: string
): Promise<User[]> {
  return usersRepository.getByOrganizationId(organizationId);
}

export async function save(user: User): Promise<User> {
  return usersRepository.save(user);
}
