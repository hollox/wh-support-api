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

  insert(db, constants.customer1_user_id, "auth0|5ebb3139dc1d2b0c033355fe", constants.auth0_authenticator_id);
  insert(db, constants.customer2_user_id, "auth0|5ebe419ca361c20c74a951fa", constants.auth0_authenticator_id);
  insert(db, constants.employee1_user_id, "auth0|5ebb314f62bd5e0c701ac502", constants.auth0_authenticator_id);
  insert(db, constants.manager1_user_id, "auth0|5ebb3165dc1d2b0c033356bf", constants.auth0_authenticator_id);
};

exports.down = function(db, callback) {
  dbUtils.dropTable(db, table.name, callback);
};

exports._meta = {
  version: 1
};

const table = {
  name: "user_authentications",
  fields: {
    row_id: {
      type: "uuid",
      notNull: true,
      primaryKey: true,
      defaultValue: {
        prep: "public.uuid_generate_v4()"
      }
    },
    user_id: {
      type: "uuid",
      notNull: true,
      foreignKey: dbUtils.createForeignKey("user_authentications", "user_id", "users", "user_id")
    },
    authentication_id: {
      type: "varchar(250)",
      notNull: true
    },
    authenticator_id: {
      type: "uuid",
      notNull: true,
      foreignKey: dbUtils.createForeignKey(
        "user_authentications",
        "authenticator_id",
        "authenticators",
        "authenticator_id"
      )
    },
    ...dbUtils.creationMetaFields
  },
  uniqueTupples: [["user_id", "authentication_id", "authenticator_id"]]
};
function insert(db, userId, authenticationId, authenticatorId) {
  return db.insert(
    "user_authentications",
    ["user_id", "authentication_id", "authenticator_id", "creation_date", "creation_user_id"],
    [userId, authenticationId, authenticatorId, constants.now, constants.system_user_id]
  );
}
