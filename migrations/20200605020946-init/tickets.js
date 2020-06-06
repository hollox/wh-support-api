const dbUtils = require("../utils/db");

module.exports.name = "tickets";
module.exports.fields = {
  ticket_id: {
    type: "uuid",
    notNull: true,
    primaryKey: true,
    default: "public.uuid_generate_v4()"
  },
  author_user_id: {
    type: "uuid",
    notNull: true,
    foreignKey: dbUtils.createForeignKey("tickets", "author_user_id", "users", "user_id")
  },
  status_id: {
    type: "uuid",
    notNull: true,
    foreignKey: dbUtils.createForeignKey("tickets", "status_id", "ticket_statuses", "status_id")
  },
  title: {
    type: "varchar(250)",
    notNull: true
  },
  content: {
    type: "text",
    notNull: true
  },
  ...dbUtils.creationMetaFields,
  ...dbUtils.modificationMetaFields
};
