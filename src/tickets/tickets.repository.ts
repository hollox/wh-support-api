import { Ticket } from "./tickets.models";
import { executeQuery } from "../utils/postgresql";
import { TicketRecord } from "./tickets.models";
import { convertRowsToModels } from "./tickets.helper";

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
