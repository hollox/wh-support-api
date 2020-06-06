const dbUtils = require("../utils/db");

module.exports.name = "messages";
module.exports.fields = {
  message_id: {
    type: "uuid",
    notNull: true,
    primaryKey: true,
    default: "public.uuid_generate_v4()"
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
  }
};
