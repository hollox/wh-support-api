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

const permissions = require("./schema/permissions");

exports.up = async function(db) {
  await dbUtils.createTable(db, permissions);

  permissions.insert(
    db,
    constants.tickets_display_all_permission_id,
    "tickets-display-all",
    "display all tickets",
    "Able to read all tickets from any organization"
  );
  permissions.insert(
    db,
    constants.tickets_display_permission_id,
    "tickets-display",
    "display tickets related to user organization",
    "Able to read all tickets from assigned organization"
  );
  permissions.insert(
    db,
    constants.tickets_create_permission_id,
    "tickets-create",
    "Create a ticket",
    "Able to create a ticket assigned to his organization"
  );
  permissions.insert(
    db,
    constants.organizations_display_all_permission_id,
    "organizations-display-all",
    "Display all organizations",
    "Able to read all tickets from any organization"
  );
  permissions.insert(
    db,
    constants.organizations_create_permission_id,
    "organizations-create",
    "Create an organization",
    "Able to create an organization"
  );
};

exports.down = function(db, callback) {
  dbUtils.dropTable(db, permissions.name, callback);
};

exports._meta = {
  version: 1
};
