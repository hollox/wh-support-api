const dbUtils = require("../utils/db");

module.exports.name = "user_authentications";
module.exports.fields = {
  row_id: {
    type: "uuid",
    notNull: true,
    primaryKey: true,
    default: "public.uuid_generate_v4()"
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
  }
};
module.exports.uniqueTupples = [["user_id", "authentication_id", "authenticator_id"]];
