import Joi from "@hapi/joi";

export interface MessageJson {
  message_id: string;
  ticket_id: string;
  author_user_id: string;
  content: string;
  creation_date: string;
}

export const saveMessageSchema = Joi.object<MessageJson>({
  ticket_id: Joi.string().required(),
  author_user_id: Joi.string().required(),
  content: Joi.string().required()
});
