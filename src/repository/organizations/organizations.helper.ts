import { OrganizationRecord } from "./organizations.models";
import { Organization } from "../../entities/organizations.models";

export function convertRecordsToModels(records: OrganizationRecord[]): Organization[] {
  return records.map(convertRecordToModel);
}

export function convertRecordToModel(record: OrganizationRecord): Organization {
  return {
    organizationId: record.organization_id,
    name: record.name,
    users: []
  };
}
