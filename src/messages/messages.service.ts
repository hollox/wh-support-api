import * as messagesRepository from "../messages/messages.repository";
import { Message } from "./messages.models";

export async function getByTicketId(ticketId: string): Promise<Message[]> {
  return messagesRepository.getByTicketId(ticketId);
}