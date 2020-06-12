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

const organizations = require("./20200605020946-init/organizations");
const users = require("./20200605020946-init/users");
const groups = require("./20200605020946-init/groups");
const groupPermissions = require("./20200605020946-init/group-permissions");
const userAuthentications = require("./20200605020946-init/user-authentications");
const userGroups = require("./20200605020946-init/user-groups");
const permissions = require("./20200605020946-init/permissions");
const ticketStatuses = require("./20200605020946-init/ticket-statuses");
const tickets = require("./20200605020946-init/tickets");
const messages = require("./20200605020946-init/messages");
const authenticators = require("./20200605020946-init/authenticators");

exports.up = async function(db) {
  await dbUtils.createTable(db, organizations);

  await organizations.insert(db, constants.worldhoster_organization_id, "WorldHoster");
  await organizations.insert(db, constants.organization1_organization_id, "Organization1");
  await organizations.insert(db, constants.organization2_organization_id, "Organization2");

  await dbUtils.createTable(db, ticketStatuses);

  await ticketStatuses.insert(db, constants.open_status_id, "open", "Ticket available to someone pick it up");
  await ticketStatuses.insert(
    db,
    constants.in_progress_status_id,
    "in progress",
    "Ticket where someone is working on it"
  );
  await ticketStatuses.insert(db, constants.completed_status_id, "completed", "Ticket completed");

  await dbUtils.createTable(db, authenticators);
  await dbUtils.createTable(db, users);

  await users.insert(
    db,
    constants.system_user_id,
    "system",
    constants.worldhoster_organization_id,
    "system@worldhoster.live",
    null,
    null
  );
  await users.insert(
    db,
    constants.customer1_user_id,
    null,
    constants.organization1_organization_id,
    "customer1@worldhoster.live",
    null,
    null
  );
  await users.insert(
    db,
    constants.customer2_user_id,
    null,
    constants.organization2_organization_id,
    "customer2@worldhoster.live",
    null,
    null
  );
  await users.insert(
    db,
    constants.employee1_user_id,
    null,
    constants.worldhoster_organization_id,
    "employee1@worldhoster.live",
    null,
    null
  );
  await users.insert(
    db,
    constants.manager1_user_id,
    null,
    constants.worldhoster_organization_id,
    "manager1@worldhoster.live",
    null,
    null
  );

  await dbUtils.createTable(db, tickets);
  await dbUtils.createTable(db, messages);
  await dbUtils.createTable(db, groups);

  groups.insert(
    db,
    constants.customer_group_id,
    "customer",
    "A person that may represent an organization that require attention to an issue."
  );
  groups.insert(
    db,
    constants.employee_group_id,
    "employee",
    "A person that work for World Hoster or a partner that is trying to resolve the customer ticket."
  );
  groups.insert(
    db,
    constants.manager_group_id,
    "Manager",
    "A person that manage the employee and validate the quality of the ticket process."
  );

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

  await dbUtils.createTable(db, groupPermissions);
  await dbUtils.createTable(db, userGroups);
  await dbUtils.createTable(db, userAuthentications);
};

exports.down = function(db, callback) {
  dbUtils.dropTable(db, messages.name, callback);
  dbUtils.dropTable(db, tickets.name, callback);
  dbUtils.dropTable(db, ticketStatuses.name, callback);
  dbUtils.dropTable(db, userAuthentications.name, callback);
  dbUtils.dropTable(db, userGroups.name, callback);
  dbUtils.dropTable(db, groupPermissions.name, callback);
  dbUtils.dropTable(db, groups.name, callback);
  dbUtils.dropTable(db, permissions.name, callback);
  dbUtils.dropTable(db, users.name, callback);
  dbUtils.dropTable(db, organizations.name, callback);
  dbUtils.dropTable(db, authenticators.name, callback);
};

exports._meta = {
  version: 1
};
