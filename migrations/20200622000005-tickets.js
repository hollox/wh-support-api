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

const dbUtils = require("./utils/db");

const tickets = require("./schema/tickets");

exports.up = async function(db) {
  await dbUtils.createTable(db, tickets);
};

exports.down = function(db, callback) {
  dbUtils.dropTable(db, tickets.name, callback);
};

exports._meta = {
  version: 1
};
