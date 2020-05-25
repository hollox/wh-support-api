import Joi from "@hapi/joi";
import { Message, MessageJson } from "../messages/messages.models";

export interface Ticket {
  ticketId: string;
  authorUserId: string;
  title: string;
  content: string;
  messages: Message[];
}

export interface TicketJson {
  ticket_id: string;
  author_user_id: string;
  title: string;
  content: string;
  messages: MessageJson[];
}

export interface TicketRecord {
  ticket_id: string;
  author_user_id: string;
  title: string;
  content: string;
}

export const getTicketByIdSchema = Joi.object<TicketJson>({
  ticket_id: Joi.string().required()
});

export const saveTicketSchema = Joi.object<TicketJson>({
  author_user_id: Joi.string().required(),
  title: Joi.string().required(),
  content: Joi.string().required()
});