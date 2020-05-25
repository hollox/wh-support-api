import { Organization } from "./organizations.models";
import * as repository from "./organizations.repository";
import * as usersService from "../users/users.service";

export async function getAll(): Promise<Organization[]> {
  return repository.getAll();
}

export async function getById(
  organizationId: string
): Promise<Organization | null> {
  const organization = await repository.getById(organizationId);
  if (organization) {
    organization.users = await usersService.getByOrganizationId(organizationId);
  }
  return organization;
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
