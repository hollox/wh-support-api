import { Organization } from "./organizations.models";
import * as repository from "./organizations.repository";

export async function getAll(): Promise<Organization[]> {
  return repository.getOrganizations();
}

export async function getById(
  organizationId: string
): Promise<Organization | null> {
  return repository.getOrganizationById(organizationId);
}

export async function save(organization: Organization): Promise<Organization> {
  return repository.saveOrganization(organization);
}
