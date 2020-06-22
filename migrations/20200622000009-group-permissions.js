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

  insert(db, constants.employee_group_id, constants.tickets_display_all_permission_id);
  insert(db, constants.employee_group_id, constants.organizations_display_all_permission_id);
  insert(db, constants.manager_group_id, constants.tickets_display_all_permission_id);
  insert(db, constants.manager_group_id, constants.organizations_display_all_permission_id);
  insert(db, constants.manager_group_id, constants.organizations_create_permission_id);
};

exports.down = function(db, callback) {
  dbUtils.dropTable(db, table.name, callback);
};

exports._meta = {
  version: 1
};

const table = {
  name: "group_permissions",
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
      foreignKey: dbUtils.createForeignKey("group_permissions", "group_id", "groups", "group_id")
    },
    permission_id: {
      type: "uuid",
      notNull: true,
      foreignKey: dbUtils.createForeignKey("group_permissions", "permission_id", "permissions", "permission_id")
    },
    ...dbUtils.creationMetaFields
  },
  uniqueTupples: [["group_id", "permission_id"]]
};

function insert(db, groupId, permissionId) {
  return db.insert(
    "group_permissions",
    ["group_id", "permission_id", "creation_date", "creation_user_id"],
    [groupId, permissionId, constants.now, constants.system_user_id]
  );
}
