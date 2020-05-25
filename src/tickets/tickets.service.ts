import { Ticket } from "./tickets.models";
import * as ticketsRepository from "./tickets.repository";
import { User } from "../users/users.models";

export async function getAll(authenticatedUser: User): Promise<Ticket[]> {
  if (
    authenticatedUser.permissions.some(
      permission => permission.code === "access-all"
    )
  ) {
    return ticketsRepository.getAll();
  } else {
    return ticketsRepository.getByOrganizationId(
      authenticatedUser.organizationId
    );
  }
}
