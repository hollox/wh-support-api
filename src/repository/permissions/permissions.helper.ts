import { PermissionRecord } from "./permissions.models";
import { Permission } from "../../entities/permissions.models";

export function convertRecordsToModels(records: PermissionRecord[]): Permission[] {
  return records.map(convertRecordToModel);
}

export function convertRecordToModel(record: PermissionRecord): Permission {
  return {
    permissionId: record.permission_id,
    code: record.code
  };
}
