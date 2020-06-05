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
const organizations = require("./20200605020946-init/organizations");
const users = require("./20200605020946-init/users");
const groups = require("./20200605020946-init/groups");
const dbUtils = require("./utils/db");

exports.up = async function(db) {
  await dbUtils.createTable(db, organizations.name, organizations.fields);

  await organizations.insert(db, constants.worldhoster_organization_id, "WorldHoster");
  await organizations.insert(db, constants.organization1_organization_id, "Organization1");
  await organizations.insert(db, constants.organization2_organization_id, "Organization2");

  await dbUtils.createTable(db, users.name, users.fields);
  await dbUtils.createTable(db, groups.name, groups.fields);
};

exports.down = function(db, callback) {
  dbUtils.dropTable(db, users.name, callback);
  dbUtils.dropTable(db, organizations.name, callback);
  dbUtils.dropTable(db, groups.name, callback);
};

exports._meta = {
  version: 1
};
