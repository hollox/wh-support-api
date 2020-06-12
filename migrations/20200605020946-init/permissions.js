const constants = require("../utils/constants");
const dbUtils = require("../utils/db");

module.exports.name = "permissions";
module.exports.fields = {
  permission_id: {
    type: "uuid",
    notNull: true,
    primaryKey: true,
    default: "public.uuid_generate_v4()"
  },
  code: {
    type: "varchar(25)",
    notNull: false
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
module.exports.insert = function(db, permissionId, code, name, description) {
  return db.insert(
    "permissions",
    [
      "permission_id",
      "code",
      "name",
      "description",

      "creation_date",
      "creation_user_id",
      "modification_date",
      "modification_user_id"
    ],
    [
      permissionId,
      code,
      name,
      description,
      constants.now,
      constants.system_user_id,
      constants.now,
      constants.system_user_id
    ]
  );
};
