import * as messagesRepository from "../repository/messages/messages.repository";
import { Message } from "../entities/messages.models";

export async function getByTicketId(ticketId: string): Promise<Message[]> {
  return messagesRepository.getByTicketId(ticketId);
}

export async function save(message: Message): Promise<Message> {
  return messagesRepository.save(message);
}
