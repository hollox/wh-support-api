import { Message } from "./messages.models";

export interface Ticket {
  ticketId: string;
  statusId: string;
  authorUserId: string;
  title: string;
  content: string;
  messages: Message[];
}
