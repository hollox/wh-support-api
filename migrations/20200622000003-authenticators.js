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

exports.up = async function(db) {
  await dbUtils.createTable(db, table);

  insert(db, constants.auth0_authenticator_id, "auth0");
};

exports.down = function(db, callback) {
  dbUtils.dropTable(db, table.name, callback);
};

exports._meta = {
  version: 1
};

const table = {
  name: "authenticators",
  fields: {
    authenticator_id: {
      type: "uuid",
      notNull: true,
      primaryKey: true,
      defaultValue: {
        prep: "public.uuid_generate_v4()"
      }
    },
    name: {
      type: "varchar(250)",
      notNull: false
    },
    ...dbUtils.creationMetaFields,
    ...dbUtils.modificationMetaFields
  }
};
function insert(db, authenticatorId, name) {
  return db.insert(
    "authenticators",
    ["authenticator_id", "name", "creation_date", "creation_user_id", "modification_date", "modification_user_id"],
    [authenticatorId, name, constants.now, constants.system_user_id, constants.now, constants.system_user_id]
  );
}
