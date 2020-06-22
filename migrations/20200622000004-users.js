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

  await insert(
    db,
    constants.system_user_id,
    "system",
    constants.worldhoster_organization_id,
    "system@worldhoster.live",
    null,
    null
  );
  await insert(
    db,
    constants.customer1_user_id,
    null,
    constants.organization1_organization_id,
    "customer1@worldhoster.live",
    null,
    null
  );
  await insert(
    db,
    constants.customer2_user_id,
    null,
    constants.organization2_organization_id,
    "customer2@worldhoster.live",
    null,
    null
  );
  await insert(
    db,
    constants.employee1_user_id,
    null,
    constants.worldhoster_organization_id,
    "employee1@worldhoster.live",
    null,
    null
  );
  await insert(
    db,
    constants.manager1_user_id,
    null,
    constants.worldhoster_organization_id,
    "manager1@worldhoster.live",
    null,
    null
  );
};

exports.down = function(db, callback) {
  dbUtils.dropTable(db, table.name, callback);
};

exports._meta = {
  version: 1
};

const table = {
  name: "users",
  fields: {
    user_id: {
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
    organization_id: {
      type: "uuid",
      notNull: false
    },
    email: {
      type: "varchar(250)",
      notNull: false
    },
    firstname: {
      type: "varchar(250)",
      notNull: false
    },
    lastname: {
      type: "varchar(250)",
      notNull: false
    },
    ...dbUtils.creationMetaFields,
    ...dbUtils.modificationMetaFields
  }
};

function insert(db, userId, code, organizationId, email, firstname, lastname) {
  return db.insert(
    table.name,
    [
      "user_id",
      "code",
      "organization_id",
      "email",
      "firstname",
      "lastname",

      "creation_date",
      "creation_user_id",
      "modification_date",
      "modification_user_id"
    ],
    [
      userId,
      code,
      organizationId,
      email,
      firstname,
      lastname,
      constants.now,
      constants.system_user_id,
      constants.now,
      constants.system_user_id
    ]
  );
}
