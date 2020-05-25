import { Permission, PermissionRecord } from "./permissions.models";

export function convertRowsToModels(rows: PermissionRecord[]): Permission[] {
  return rows.map(convertRowToModel);
}

export function convertRowToModel(row: PermissionRecord): Permission {
  return {
    permissionId: row.permission_id,
    code: row.code
  };
}
