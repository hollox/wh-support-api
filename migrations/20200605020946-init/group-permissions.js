const dbUtils = require("../utils/db");

module.exports.name = "group_permissions";
module.exports.fields = {
  row_id: {
    type: "uuid",
    notNull: true,
    primaryKey: true,
    default: "public.uuid_generate_v4()ala"
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
  }
};
module.exports.uniqueTupples = [["group_id", "permission_id"]];
