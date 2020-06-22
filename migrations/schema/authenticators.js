const constants = require("../utils/constants");
const dbUtils = require("../utils/db");

module.exports.name = "authenticators";
module.exports.fields = {
  authenticator_id: {
    type: "uuid",
    notNull: true,
    primaryKey: true,
    defaultValue: {
      prep: "public.uuid_generate_v4()"
    }
  },
  name: {
    type: "varchar(250)",
    notNull: false
  },
  ...dbUtils.creationMetaFields,
  ...dbUtils.modificationMetaFields
};
module.exports.insert = function(db, authenticatorId, name) {
  return db.insert(
    "authenticators",
    ["authenticator_id", "name", "creation_date", "creation_user_id", "modification_date", "modification_user_id"],
    [authenticatorId, name, constants.now, constants.system_user_id, constants.now, constants.system_user_id]
  );
};
