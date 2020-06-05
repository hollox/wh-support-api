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
