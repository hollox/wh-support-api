import { Organization, OrganizationRecord } from "./organizations.models";
import { QueryConfig } from "pg";
import { executeQuery } from "../utils/postgresql";
import { convertRowsToModels, convertRowToModel } from "./organizations.helper";
import { SYSTEM_UUID } from "../configuration/configuration.service";

export async function getOrganizations(): Promise<Organization[]> {
  const query = {
    text: "SELECT organization_id, name FROM organizations"
  };

  const { rows } = await executeQuery<OrganizationRecord>(query);
  return convertRowsToModels(rows);
}

export async function getOrganizationById(
  organizationId: string
): Promise<Organization | null> {
  const query = {
    text:
      "SELECT organization_id, name FROM organizations WHERE organization_id = $1",
    values: [organizationId]
  };

  const { rows } = await executeQuery<OrganizationRecord>(query);
  if (rows.length > 0) {
    return convertRowToModel(rows[0]);
  } else {
    return null;
  }
}

export async function saveOrganization(
  organization: Organization
): Promise<Organization> {
  const getQuery = organization.organizationId
    ? updateOrganization
    : insertOrganization;
  const query = getQuery(organization);
  await executeQuery(query);
  return {} as any;
}

function insertOrganization(organization: Organization): QueryConfig {
  return {
    text:
      "INSERT INTO organizations (name, creation_user_id, creation_date, modification_user_id, modification_date) VALUES ($1, $2, now(), $2, now()) RETURNING *",
    values: [organization.name, SYSTEM_UUID]
  };
}

function updateOrganization(organization: Organization): QueryConfig {
  return {
    text:
      "UPDATE organizations SET name = $2, modification_user_id = $3, modification_date = now() WHERE organization_id = $1 RETURNING *",
    values: [organization.organizationId, organization.name, SYSTEM_UUID]
  };
}
