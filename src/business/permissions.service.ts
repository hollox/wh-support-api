import * as permissionsRepository from "../repository/permissions/permissions.repository";
import { Permission } from "../entities/permissions.models";

export async function getByUserId(userId: string): Promise<Permission[]> {
  return permissionsRepository.getByUserId(userId);
}
