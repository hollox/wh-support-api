import Joi from "@hapi/joi";

export interface Message {
  messageId: string;
  ticketId: string;
  authorUserId: string;
  content: string;
  creationDate: Date;
}

export interface MessageJson {
  message_id: string;
  ticket_id: string;
  author_user_id: string;
  content: string;
  create_date: string;
}

export interface MessageRecord {
  message_id: string;
  ticket_id: string;
  author_user_id: string;
  content: string;
  create_date: Date;
}

export const saveMessageSchema = Joi.object<MessageJson>({
  ticket_id: Joi.string().required(),
  author_user_id: Joi.string().required(),
  content: Joi.string().required()
});
