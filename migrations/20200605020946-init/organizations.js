const constants = require("./constants");

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
  creation_date: {
    type: "varchar(250)",
    notNull: true,
    default: "now()"
  },
  creation_user_id: {
    type: "uuid",
    notNull: true
  },
  modification_date: {
    type: "varchar(250)",
    notNull: true,
    default: "now()"
  },
  modification_user_id: {
    type: "uuid",
    notNull: true
  }
};
module.exports.insert = function(db, organizationId, name) {
  return db.insert(
    "organizations",
    ["organization_id", "name", "creation_date", "creation_user_id", "modification_date", "modification_user_id"],
    [organizationId, name, constants.now, constants.system_user_id, constants.now, constants.system_user_id]
  );
};
