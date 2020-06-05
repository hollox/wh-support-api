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
    type: "varchar(25)",
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
