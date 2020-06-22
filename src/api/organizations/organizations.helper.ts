import { Organization } from "../../entities/organizations.models";
import { OrganizationJson } from "./organizations.models";
import * as usersHelper from "../users/users.helper";

export function convertJsonToModel(organizationJson: OrganizationJson): Organization {
  return {
    organizationId: organizationJson.organization_id,
    name: organizationJson.name,
    users: usersHelper.convertJsonToModels(organizationJson.users)
  };
}

export function convertModelsToJson(organizations: Organization[]): OrganizationJson[] {
  return organizations.map(convertModelToJson);
}

export function convertModelToJson(organization: Organization): OrganizationJson {
  return {
    organization_id: organization.organizationId,
    name: organization.name,
    users: usersHelper.convertModelsToJson(organization.users)
  };
}
