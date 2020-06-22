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

const ticketStatuses = require("./schema/ticket-statuses");

exports.up = async function(db) {
  await dbUtils.createTable(db, ticketStatuses);

  await ticketStatuses.insert(db, constants.open_status_id, "open", "Ticket available to someone pick it up");
  await ticketStatuses.insert(
    db,
    constants.in_progress_status_id,
    "in progress",
    "Ticket where someone is working on it"
  );
  await ticketStatuses.insert(db, constants.completed_status_id, "completed", "Ticket completed");
};

exports.down = function(db, callback) {
  dbUtils.dropTable(db, ticketStatuses.name, callback);
};

exports._meta = {
  version: 1
};
