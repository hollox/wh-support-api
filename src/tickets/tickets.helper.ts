import { Ticket, TicketRecord } from "./tickets.models";

export function convertRowsToModels(rows: TicketRecord[]): Ticket[] {
  return rows.map(convertRowToModel);
}

export function convertRowToModel(row: TicketRecord): Ticket {
  return {
    ticketId: row.ticket_id,
    authorUserId: row.author_user_id,
    title: row.title,
    content: row.content
  };
}
