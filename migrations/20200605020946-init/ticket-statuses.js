const constants = require("../utils/constants");
const dbUtils = require("../utils/db");

module.exports.name = "ticket_statuses";
module.exports.fields = {
  status_id: {
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
module.exports.insert = function(db, statusId, name, description) {
  return db.insert(
    "ticket_statuses",
    [
      "status_id",
      "name",
      "description",

      "creation_date",
      "creation_user_id",
      "modification_date",
      "modification_user_id"
    ],
    [statusId, name, description, constants.now, constants.system_user_id, constants.now, constants.system_user_id]
  );
};
