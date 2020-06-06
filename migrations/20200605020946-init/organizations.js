const constants = require("../utils/constants");
const dbUtils = require("../utils/db");

module.exports.name = "organizations";
module.exports.fields = {
  organization_id: {
    type: "uuid",
    notNull: true,
    primaryKey: true,
    default: "public.uuid_generate_v4()"
  },
  name: {
    type: "varchar(250)",
    notNull: true
  },
  ...dbUtils.creationMetaFields,
  ...dbUtils.modificationMetaFields
};
module.exports.insert = function(db, organizationId, name) {
  return db.insert(
    "organizations",
    ["organization_id", "name", "creation_date", "creation_user_id", "modification_date", "modification_user_id"],
    [organizationId, name, constants.now, constants.system_user_id, constants.now, constants.system_user_id]
  );
};
