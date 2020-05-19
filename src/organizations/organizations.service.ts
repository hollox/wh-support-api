import { Organization } from "./organizations.models";
import * as repository from "./organizations.repository";

export async function getOrganizations(): Promise<Organization[]> {
  return repository.getOrganizations();
}

export async function getOrganizationById(
  organizationId: string
): Promise<Organization | null> {
  return repository.getOrganizationById(organizationId);
}

export async function saveOrganization(
  organization: Organization
): Promise<Organization> {
  return repository.saveOrganization(organization);
}
