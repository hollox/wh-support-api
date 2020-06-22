import { Message } from "../../entities/messages.models";
import { MessageJson } from "./messages.models";

export function convertJsonToModel(messageJson: MessageJson): Message {
  return {
    messageId: messageJson.message_id,
    ticketId: messageJson.ticket_id,
    authorUserId: messageJson.author_user_id,
    content: messageJson.content,
    creationDate: new Date(messageJson.creation_date)
  };
}

export function convertModelsToJson(messages: Message[]): MessageJson[] {
  return messages.map(convertModelToJson);
}

export function convertModelToJson(message: Message): MessageJson {
  return {
    message_id: message.messageId,
    ticket_id: message.ticketId,
    author_user_id: message.authorUserId,
    content: message.content,
    creation_date: message.creationDate.toISOString()
  };
}
