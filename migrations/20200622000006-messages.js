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

exports.up = async function(db) {
  await dbUtils.createTable(db, table);
};

exports.down = function(db, callback) {
  dbUtils.dropTable(db, table.name, callback);
};

exports._meta = {
  version: 1
};

const table = {
  name: "messages",
  fields: {
    message_id: {
      type: "uuid",
      notNull: true,
      primaryKey: true,
      defaultValue: {
        prep: "public.uuid_generate_v4()"
      }
    },
    ticket_id: {
      type: "uuid",
      notNull: true,
      foreignKey: dbUtils.createForeignKey("messages", "ticket_id", "tickets", "ticket_id")
    },
    author_user_id: {
      type: "uuid",
      notNull: true,
      foreignKey: dbUtils.createForeignKey("messages", "author_user_id", "users", "user_id")
    },
    content: {
      type: "text",
      notNull: true
    },
    ...dbUtils.creationMetaFields,
    ...dbUtils.modificationMetaFields
  }
};
