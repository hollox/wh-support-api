const constants = require("../utils/constants");
const dbUtils = require("../utils/db");

module.exports.name = "users";
module.exports.fields = {
  user_id: {
    type: "uuid",
    notNull: true,
    primaryKey: true,
    default: "public.uuid_generate_v4()"
  },
  code: {
    type: "varchar(25)",
    notNull: false
  },
  organization_id: {
    type: "uuid",
    notNull: false
  },
  email: {
    type: "varchar(250)",
    notNull: false
  },
  firstname: {
    type: "varchar(250)",
    notNull: false
  },
  lastname: {
    type: "varchar(250)",
    notNull: false
  },
  ...dbUtils.creationMetaFields,
  ...dbUtils.modificationMetaFields
};
module.exports.insert = function(db, userId, code, organizationId, email, firstname, lastname) {
  return db.insert(
    "users",
    [
      "user_id",
      "code",
      "organization_id",
      "email",
      "firstname",
      "lastname",

      "creation_date",
      "creation_user_id",
      "modification_date",
      "modification_user_id"
    ],
    [
      userId,
      code,
      organizationId,
      email,
      firstname,
      lastname,
      constants.now,
      constants.system_user_id,
      constants.now,
      constants.system_user_id
    ]
  );
};
