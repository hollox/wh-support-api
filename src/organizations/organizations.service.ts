import { Organization } from "./organizations.models";
import * as repository from "./organizations.repository";
import * as usersService from "../users/users.service";

export async function getAll(): Promise<Organization[]> {
  return repository.getOrganizations();
}

export async function getById(
  organizationId: string
): Promise<Organization | null> {
  return repository.getOrganizationById(organizationId);
}

export async function save(organization: Organization): Promise<Organization> {
  const savedOrganization = await repository.saveOrganization(organization);
  if (organization.organizationId) {
    savedOrganization.users = await usersService.getByOrganizationId(
      organization.organizationId
    );
  } else {
    savedOrganization.users = [];
  }
  return savedOrganization;
}
