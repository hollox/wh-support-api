import * as permissionsRepository from "./permissions.repository";
import { Permission } from "./permissions.models";

export async function getByUserId(userId: string): Promise<Permission[]> {
  return permissionsRepository.getByUserId(userId);
}
