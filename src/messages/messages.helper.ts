import { Message, MessageJson, MessageRecord } from "./messages.models";

export function convertJsonToModels(messagesJson: MessageJson[]): Message[] {
  return messagesJson.map(convertJsonToModel);
}

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
  console.log({ message });
  return {
    message_id: message.messageId,
    ticket_id: message.ticketId,
    author_user_id: message.authorUserId,
    content: message.content,
    creation_date: message.creationDate.toISOString()
  };
}

export function convertRowsToModels(rows: MessageRecord[]): Message[] {
  return rows.map(convertRowToModel);
}

export function convertRowToModel(row: MessageRecord): Message {
  return {
    messageId: row.message_id,
    ticketId: row.ticket_id,
    authorUserId: row.author_user_id,
    content: row.content,
    creationDate: row.creation_date
  };
}
