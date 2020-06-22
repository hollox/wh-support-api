import { Message } from "../../entities/messages.models";
import { MessageRecord } from "./messages.models";

export function convertRecordsToModels(records: MessageRecord[]): Message[] {
  return records.map(convertRecordToModel);
}

export function convertRecordToModel(record: MessageRecord): Message {
  return {
    messageId: record.message_id,
    ticketId: record.ticket_id,
    authorUserId: record.author_user_id,
    content: record.content,
    creationDate: record.creation_date
  };
}
