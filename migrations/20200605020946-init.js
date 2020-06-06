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
const authenticators = require("./20200605020946-init/authenticators");

exports.up = async function(db) {
  await dbUtils.createTable(db, organizations);

  await organizations.insert(db, constants.worldhoster_organization_id, "WorldHoster");
  await organizations.insert(db, constants.organization1_organization_id, "Organization1");
  await organizations.insert(db, constants.organization2_organization_id, "Organization2");

  await dbUtils.createTable(db, authenticators);
  await dbUtils.createTable(db, users);
  await dbUtils.createTable(db, groups);
  await dbUtils.createTable(db, permissions);
  await dbUtils.createTable(db, groupPermissions);
  await dbUtils.createTable(db, userGroups);
  await dbUtils.createTable(db, userAuthentications);
};

exports.down = function(db, callback) {
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
