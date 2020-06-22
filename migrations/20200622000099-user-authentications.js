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

const userAuthentications = require("./schema/user-authentications");

exports.up = async function(db) {
  await dbUtils.createTable(db, userAuthentications);

  userAuthentications.insert(
    db,
    constants.customer1_user_id,
    "auth0|5ebb3139dc1d2b0c033355fe",
    constants.auth0_authenticator_id
  );
  userAuthentications.insert(
    db,
    constants.customer2_user_id,
    "auth0|5ebe419ca361c20c74a951fa",
    constants.auth0_authenticator_id
  );
  userAuthentications.insert(
    db,
    constants.employee1_user_id,
    "auth0|5ebb314f62bd5e0c701ac502",
    constants.auth0_authenticator_id
  );
  userAuthentications.insert(
    db,
    constants.manager1_user_id,
    "auth0|5ebb3165dc1d2b0c033356bf",
    constants.auth0_authenticator_id
  );
};

exports.down = function(db, callback) {
  dbUtils.dropTable(db, userAuthentications.name, callback);
};

exports._meta = {
  version: 1
};
