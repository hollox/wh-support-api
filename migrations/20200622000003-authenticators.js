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

const authenticators = require("./schema/authenticators");

exports.up = async function(db) {
  await dbUtils.createTable(db, authenticators);

  authenticators.insert(db, constants.auth0_authenticator_id, "auth0");
};

exports.down = function(db, callback) {
  dbUtils.dropTable(db, authenticators.name, callback);
};

exports._meta = {
  version: 1
};
