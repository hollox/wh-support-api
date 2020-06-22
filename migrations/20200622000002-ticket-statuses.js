"use strict";

let dbm;
let type;
let seed;

/**
 * We receive the dbmigrate dependency from dbmigrate initially.
 * This enables us to not have to rely on NODE_PATH.
 */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

const constants = require("./utils/constants");
const dbUtils = require("./utils/db");

exports.up = async function(db) {
  await dbUtils.createTable(db, table);

  await insert(db, constants.open_status_id, "open", "Ticket available to someone pick it up");
  await insert(db, constants.in_progress_status_id, "in progress", "Ticket where someone is working on it");
  await insert(db, constants.completed_status_id, "completed", "Ticket completed");
};

exports.down = function(db, callback) {
  dbUtils.dropTable(db, table.name, callback);
};

exports._meta = {
  version: 1
};

const table = {
  name: "ticket_statuses",
  fields: {
    status_id: {
      type: "uuid",
      notNull: true,
      primaryKey: true,
      defaultValue: {
        prep: "public.uuid_generate_v4()"
      }
    },
    name: {
      type: "varchar(250)",
      notNull: false
    },
    description: {
      type: "text",
      notNull: false
    },
    ...dbUtils.creationMetaFields,
    ...dbUtils.modificationMetaFields
  }
};
function insert(db, statusId, name, description) {
  return db.insert(
    table.name,
    [
      "status_id",
      "name",
      "description",

      "creation_date",
      "creation_user_id",
      "modification_date",
      "modification_user_id"
    ],
    [statusId, name, description, constants.now, constants.system_user_id, constants.now, constants.system_user_id]
  );
}
