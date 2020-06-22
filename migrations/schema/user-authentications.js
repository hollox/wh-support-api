const constants = require("../utils/constants");
const dbUtils = require("../utils/db");

module.exports.name = "user_authentications";
module.exports.fields = {
  row_id: {
    type: "uuid",
    notNull: true,
    primaryKey: true,
    defaultValue: {
      prep: "public.uuid_generate_v4()"
    }
  },
  user_id: {
    type: "uuid",
    notNull: true,
    foreignKey: dbUtils.createForeignKey("user_authentications", "user_id", "users", "user_id")
  },
  authentication_id: {
    type: "varchar(250)",
    notNull: true
  },
  authenticator_id: {
    type: "uuid",
    notNull: true,
    foreignKey: dbUtils.createForeignKey(
      "user_authentications",
      "authenticator_id",
      "authenticators",
      "authenticator_id"
    )
  },
  ...dbUtils.creationMetaFields
};
module.exports.uniqueTupples = [["user_id", "authentication_id", "authenticator_id"]];
module.exports.insert = function(db, userId, authenticationId, authenticatorId) {
  return db.insert(
    "user_authentications",
    ["user_id", "authentication_id", "authenticator_id", "creation_date", "creation_user_id"],
    [userId, authenticationId, authenticatorId, constants.now, constants.system_user_id]
  );
};
