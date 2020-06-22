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

const userGroups = require("./schema/user-groups");

exports.up = async function(db) {
  await dbUtils.createTable(db, userGroups);

  userGroups.insert(db, constants.customer_group_id, constants.customer1_user_id);
  userGroups.insert(db, constants.customer_group_id, constants.customer2_user_id);
  userGroups.insert(db, constants.employee_group_id, constants.employee1_user_id);
  userGroups.insert(db, constants.manager_group_id, constants.manager1_user_id);
};

exports.down = function(db, callback) {
  dbUtils.dropTable(db, userGroups.name, callback);
};

exports._meta = {
  version: 1
};
