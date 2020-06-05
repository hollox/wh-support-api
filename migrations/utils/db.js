const metaFields = {
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

function createTable(db, table) {
  console.log(`creating table ${table.name}`);
  return db.createTable(table.name, { ...table.fields, ...metaFields }).then((result) => {
    if (table.uniqueTupples) {
      table.uniqueTupples.forEach((tupple) => {
        const constraintName = `${table.name}_${tupple.join("_")}_uidx`;
        console.log(`creating unique constraint ${constraintName}`);
        db.addIndex(table.name, constraintName, tupple);
      });
    }
    return result;
  });
}

function dropTable(db, name, callback) {
  console.log(`dropping table ${name}`);
  db.dropTable(name, callback);
}

function createForeignKey(tableName, fieldName, fkTableName, fkFieldName) {
  return {
    name: `${tableName}_${fieldName}_fk`,
    table: fkTableName,
    mapping: {
      [fieldName]: fkFieldName
    },
    rules: {
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT"
    }
  };
}

module.exports = {
  createTable,
  dropTable,
  createForeignKey
};
