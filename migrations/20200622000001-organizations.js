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

const organizations = require("./schema/organizations");

exports.up = async function(db) {
  await dbUtils.createTable(db, organizations);

  await organizations.insert(db, constants.worldhoster_organization_id, "WorldHoster");
  await organizations.insert(db, constants.organization1_organization_id, "Organization1");
  await organizations.insert(db, constants.organization2_organization_id, "Organization2");
};

exports.down = function(db, callback) {
  dbUtils.dropTable(db, organizations.name, callback);
};

exports._meta = {
  version: 1
};
