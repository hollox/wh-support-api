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

const groups = require("./schema/groups");

exports.up = async function(db) {
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
};

exports.down = function(db, callback) {
  dbUtils.dropTable(db, groups.name, callback);
};

exports._meta = {
  version: 1
};
