import { Ticket } from "./tickets.models";
import { executeQuery } from "../utils/postgresql";
import { TicketRecord } from "./tickets.models";
import { convertRowsToModels, convertRowToModel } from "./tickets.helper";
import { QueryConfig } from "pg";
import { SYSTEM_UUID } from "../configuration/configuration.service";

export async function getAll(): Promise<Ticket[]> {
  const query = {
    text: `
SELECT
    ticket_id,
    author_user_id,
    title,
    content
FROM tickets`
  };

  const { rows } = await executeQuery<TicketRecord>(query);
  return convertRowsToModels(rows);
}

export async function getByOrganizationId(
  organizationId: string
): Promise<Ticket[]> {
  const query = {
    text: `
SELECT
    ticket_id,
    author_user_id,
    title,
    content
FROM tickets
INNER JOIN users
ON users.user_id = tickets.author_user_id
WHERE users.organization_id = $1`,
    values: [organizationId]
  };

  const { rows } = await executeQuery<TicketRecord>(query);
  return convertRowsToModels(rows);
}

export async function getById(ticketId: string): Promise<Ticket | null> {
  const query = {
    text: `
SELECT
    ticket_id,
    author_user_id,
    title,
    content
FROM tickets
WHERE tickets.ticket_id = $1`,
    values: [ticketId]
  };

  const { rows } = await executeQuery<TicketRecord>(query);
  if (rows.length > 0) {
    return convertRowToModel(rows[0]);
  } else {
    return null;
  }
}

export async function save(ticket: Ticket): Promise<Ticket> {
  const getQuery = ticket.ticketId ? update : insert;
  const query = getQuery(ticket);
  const { rows } = await executeQuery<TicketRecord>(query);
  return convertRowToModel(rows[0]);
}

function insert(ticket: Ticket): QueryConfig {
  return {
    text: `
INSERT INTO tickets
(
  author_user_id,
  title,
  content,
  
  creation_user_id,
  creation_date,
  modification_user_id,
  modification_date
) VALUES (
  $1,
  $2,
  $3,
  
  $4,
  now(),
  $4,
  now())
RETURNING
  author_user_id,
  title,
  content`,
    values: [ticket.authorUserId, ticket.title, ticket.content, SYSTEM_UUID]
  };
}

function update(ticket: Ticket): QueryConfig {
  return {
    text: `
UPDATE ticket SET
  author_user_id = $2,
  title = $3,
  content = $4,
  
  modification_user_id = $5,
  modification_date = now()
WHERE ticket_id = $1
RETURNING
  ticket_id,
  author_user_id,
  title,
  content`,
    values: [
      ticket.ticketId,
      ticket.authorUserId,
      ticket.title,
      ticket.content,
      SYSTEM_UUID
    ]
  };
}
