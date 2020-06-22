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

  await insert(db, constants.worldhoster_organization_id, "WorldHoster");
  await insert(db, constants.organization1_organization_id, "Organization1");
  await insert(db, constants.organization2_organization_id, "Organization2");
};

exports.down = function(db, callback) {
  dbUtils.dropTable(db, table.name, callback);
};

exports._meta = {
  version: 1
};

const table = {
  name: "organizations",
  fields: {
    organization_id: {
      type: "uuid",
      notNull: true,
      primaryKey: true,
      defaultValue: {
        prep: "public.uuid_generate_v4()"
      }
    },
    name: {
      type: "varchar(250)",
      notNull: true
    },
    ...dbUtils.creationMetaFields,
    ...dbUtils.modificationMetaFields
  }
};
function insert(db, organizationId, name) {
  return db.insert(
    table.name,
    ["organization_id", "name", "creation_date", "creation_user_id", "modification_date", "modification_user_id"],
    [organizationId, name, constants.now, constants.system_user_id, constants.now, constants.system_user_id]
  );
}
