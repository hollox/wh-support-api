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
    constants.customer_group_id,
    "customer",
    "A person that may represent an organization that require attention to an issue."
  );
  insert(
    db,
    constants.employee_group_id,
    "employee",
    "A person that work for World Hoster or a partner that is trying to resolve the customer ticket."
  );
  insert(
    db,
    constants.manager_group_id,
    "Manager",
    "A person that manage the employee and validate the quality of the ticket process."
  );
};

exports.down = function(db, callback) {
  dbUtils.dropTable(db, table.name, callback);
};

exports._meta = {
  version: 1
};

const table = {
  name: "groups",
  fields: {
    group_id: {
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
    description: {
      type: "text",
      notNull: false
    },
    ...dbUtils.creationMetaFields,
    ...dbUtils.modificationMetaFields
  }
};
function insert(db, groupId, name, description) {
  return db.insert(
    "groups",
    [
      "group_id",
      "name",
      "description",

      "creation_date",
      "creation_user_id",
      "modification_date",
      "modification_user_id"
    ],
    [groupId, name, description, constants.now, constants.system_user_id, constants.now, constants.system_user_id]
  );
}
