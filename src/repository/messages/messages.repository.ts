import { executeQuery } from "../../utils/postgresql";
import { convertRecordsToModels, convertRecordToModel } from "./messages.helper";
import { Message } from "../../entities/messages.models";
import { MessageRecord } from "./messages.models";
import { QueryConfig } from "pg";
import { SYSTEM_UUID } from "../../configuration/configuration.service";

export async function getByTicketId(ticketId: string): Promise<Message[]> {
  const query = {
    text: "SELECT message_id, ticket_id, author_user_id, content, creation_date FROM messages WHERE ticket_id = $1",
    values: [ticketId]
  };

  const { rows } = await executeQuery<MessageRecord>(query);
  return convertRecordsToModels(rows);
}
export async function save(message: Message): Promise<Message> {
  const getQuery = message.messageId ? update : insert;
  const query = getQuery(message);
  const { rows } = await executeQuery<MessageRecord>(query);
  return convertRecordToModel(rows[0]);
}

function insert(message: Message): QueryConfig {
  return {
    text: `
INSERT INTO messages
(
  author_user_id,
  ticket_id,
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
  message_id,
  ticket_id,
  author_user_id,
  content,
  creation_date`,
    values: [message.authorUserId, message.ticketId, message.content, SYSTEM_UUID]
  };
}

function update(message: Message): QueryConfig {
  return {
    text: `
UPDATE messages SET
  author_user_id = $2,
  ticket_id = $3,
  content = $4,
  
  modification_user_id = $5,
  modification_date = now()
WHERE message_id = $1
RETURNING
  message_id,
  ticket_id,
  author_user_id,
  content,
  creation_date`,
    values: [message.messageId, message.ticketId, message.authorUserId, message.content, SYSTEM_UUID]
  };
}
