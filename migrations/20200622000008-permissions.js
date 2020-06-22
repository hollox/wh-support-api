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

  insert(
    db,
    constants.tickets_display_all_permission_id,
    "tickets-display-all",
    "display all tickets",
    "Able to read all tickets from any organization"
  );
  insert(
    db,
    constants.tickets_display_permission_id,
    "tickets-display",
    "display tickets related to user organization",
    "Able to read all tickets from assigned organization"
  );
  insert(
    db,
    constants.tickets_create_permission_id,
    "tickets-create",
    "Create a ticket",
    "Able to create a ticket assigned to his organization"
  );
  insert(
    db,
    constants.organizations_display_all_permission_id,
    "organizations-display-all",
    "Display all organizations",
    "Able to read all tickets from any organization"
  );
  insert(
    db,
    constants.organizations_create_permission_id,
    "organizations-create",
    "Create an organization",
    "Able to create an organization"
  );
};

exports.down = function(db, callback) {
  dbUtils.dropTable(db, table.name, callback);
};

exports._meta = {
  version: 1
};

const table = {
  name: "permissions",
  fields: {
    permission_id: {
      type: "uuid",
      notNull: true,
      primaryKey: true,
      defaultValue: {
        prep: "public.uuid_generate_v4()"
      }
    },
    code: {
      type: "varchar(25)",
      notNull: false
    },
    name: {
      type: "varchar(250)",
      notNull: false
    },
    description: {
      type: "text",
      notNull: false
    },
    ...dbUtils.creationMetaFields,
    ...dbUtils.modificationMetaFields
  }
};
function insert(db, permissionId, code, name, description) {
  return db.insert(
    "permissions",
    [
      "permission_id",
      "code",
      "name",
      "description",

      "creation_date",
      "creation_user_id",
      "modification_date",
      "modification_user_id"
    ],
    [
      permissionId,
      code,
      name,
      description,
      constants.now,
      constants.system_user_id,
      constants.now,
      constants.system_user_id
    ]
  );
}
