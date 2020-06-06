const dbUtils = require("../utils/db");

module.exports.name = "user_groups";
module.exports.fields = {
  row_id: {
    type: "uuid",
    notNull: true,
    primaryKey: true,
    default: "public.uuid_generate_v4()"
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
};
module.exports.uniqueTupples = [["group_id", "user_id"]];
