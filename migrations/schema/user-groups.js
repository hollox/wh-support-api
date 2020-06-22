const constants = require("../utils/constants");
const dbUtils = require("../utils/db");

module.exports.name = "user_groups";
module.exports.fields = {
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
module.exports.insert = function(db, groupId, userId) {
  return db.insert(
    "user_groups",
    ["group_id", "user_id", "creation_date", "creation_user_id"],
    [groupId, userId, constants.now, constants.system_user_id]
  );
};
