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
