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
    status_id,
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
  ticket_id,
  status_id,
  author_user_id,
  title,
  content`,
    values: [ticket.authorUserId, ticket.title, ticket.content, SYSTEM_UUID]
  };
}

function update(ticket: Ticket): QueryConfig {
  return {
    text: `
UPDATE tickets SET
  status_id = $2,
  author_user_id = $3,
  title = $4,
  content = $5,
  
  modification_user_id = $6,
  modification_date = now()
WHERE ticket_id = $1
RETURNING
  ticket_id,
  status_id,
  author_user_id,
  title,
  content`,
    values: [
      ticket.ticketId,
      ticket.statusId,
      ticket.authorUserId,
      ticket.title,
      ticket.content,
      SYSTEM_UUID
    ]
  };
}

export async function setStatus(
  ticketId: string,
  statusId: string
): Promise<void> {
  const query = {
    text: `
UPDATE tickets SET
  status_id = $2,
  
  modification_user_id = $3,
  modification_date = now()
WHERE ticket_id = $1`,
    values: [ticketId, statusId, SYSTEM_UUID]
  };
  return executeQuery(query).then(undefined);
}
