import { Message, MessageJson } from "./messages.models";

export function convertJsonToModels(messagesJson: MessageJson[]): Message[] {
  return messagesJson.map(convertJsonToModel);
}

export function convertJsonToModel(messageJson: MessageJson): Message {
  return {
    messageId: messageJson.message_id,
    content: messageJson.content
  };
}

export function convertModelsToJson(messages: Message[]): MessageJson[] {
  return messages.map(convertModelToJson);
}

export function convertModelToJson(message: Message): MessageJson {
  return {
    message_id: message.messageId,
    content: message.content
  };
}
/*
export function convertRowsToModels(rows: UserRecord[]): User[] {
  return rows.map(convertRowToModel);
}

export function convertRowToModel(row: UserRecord): User {
  return {
    userId: row.user_id,
    organizationId: row.organization_id,
    email: row.email,
    firstname: row.firstname,
    lastname: row.lastname,
    permissions: []
  };
}
*/
