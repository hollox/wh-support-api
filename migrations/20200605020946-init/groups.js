const constants = require("../utils/constants");
const dbUtils = require("../utils/db");

module.exports.name = "groups";
module.exports.fields = {
  group_id: {
    type: "uuid",
    notNull: true,
    primaryKey: true,
    default: "public.uuid_generate_v4()"
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
};
module.exports.insert = function(db, groupId, name, description) {
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
};
