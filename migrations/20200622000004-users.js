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

const users = require("./schema/users");

exports.up = async function(db) {
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
};

exports.down = function(db, callback) {
  dbUtils.dropTable(db, users.name, callback);
};

exports._meta = {
  version: 1
};
