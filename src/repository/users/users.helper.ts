import { User } from "../../entities/users.models";
import { UserRecord } from "./users.models";

export function convertRecordsToModels(records: UserRecord[]): User[] {
  return records.map(convertRecordToModel);
}

export function convertRecordToModel(record: UserRecord): User {
  return {
    userId: record.user_id,
    organizationId: record.organization_id,
    email: record.email,
    firstname: record.firstname,
    lastname: record.lastname,
    permissions: []
  };
}
