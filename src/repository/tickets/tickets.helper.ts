import { Ticket } from "../../entities/tickets.models";
import { TicketRecord } from "./tickets.models";

export function convertRecordsToModels(records: TicketRecord[]): Ticket[] {
  return records.map(convertRecordToModel);
}

export function convertRecordToModel(record: TicketRecord): Ticket {
  return {
    ticketId: record.ticket_id,
    statusId: record.status_id,
    authorUserId: record.author_user_id,
    title: record.title,
    content: record.content,
    messages: []
  };
}
