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

  insert(db, constants.customer_group_id, constants.customer1_user_id);
  insert(db, constants.customer_group_id, constants.customer2_user_id);
  insert(db, constants.employee_group_id, constants.employee1_user_id);
  insert(db, constants.manager_group_id, constants.manager1_user_id);
};

exports.down = function(db, callback) {
  dbUtils.dropTable(db, table.name, callback);
};

exports._meta = {
  version: 1
};

const table = {
  name: "user_groups",
  fields: {
    row_id: {
      type: "uuid",
      notNull: true,
      primaryKey: true,
      defaultValue: {
        prep: "public.uuid_generate_v4()"
      }
    },
    group_id: {
      type: "uuid",
      notNull: true,
      foreignKey: dbUtils.createForeignKey("user_groups", "group_id", "groups", "group_id")
    },
    user_id: {
      type: "uuid",
      notNull: true,
      foreignKey: dbUtils.createForeignKey("user_groups", "user_id", "users", "user_id")
    },
    ...dbUtils.creationMetaFields
  },
  uniqueTupples: [["group_id", "user_id"]]
};

function insert(db, groupId, userId) {
  return db.insert(
    "user_groups",
    ["group_id", "user_id", "creation_date", "creation_user_id"],
    [groupId, userId, constants.now, constants.system_user_id]
  );
}
