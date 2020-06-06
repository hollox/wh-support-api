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
