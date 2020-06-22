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

const groupPermissions = require("./schema/group-permissions");

exports.up = async function(db) {
  await dbUtils.createTable(db, groupPermissions);

  groupPermissions.insert(db, constants.employee_group_id, constants.tickets_display_all_permission_id);
  groupPermissions.insert(db, constants.employee_group_id, constants.organizations_display_all_permission_id);
  groupPermissions.insert(db, constants.manager_group_id, constants.tickets_display_all_permission_id);
  groupPermissions.insert(db, constants.manager_group_id, constants.organizations_display_all_permission_id);
  groupPermissions.insert(db, constants.manager_group_id, constants.organizations_create_permission_id);
};

exports.down = function(db, callback) {
  dbUtils.dropTable(db, groupPermissions.name, callback);
};

exports._meta = {
  version: 1
};
