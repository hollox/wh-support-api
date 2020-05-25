import { Ticket } from "./tickets.models";
import * as ticketsRepository from "./tickets.repository";
import { User } from "../users/users.models";
import * as messagesService from "../messages/messages.service";

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

export async function getById(ticketId: string): Promise<Ticket | null> {
  const ticket = await ticketsRepository.getById(ticketId);
  if (ticket) {
    ticket.messages = await messagesService.getByTicketId(ticketId);
  }
  return ticket;
}

export async function save(ticket: Ticket): Promise<Ticket> {
  return ticketsRepository.save(ticket);
}
