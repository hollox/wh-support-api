module.exports.creationMetaFields = {
  creation_date: {
    type: "timestamp with time zone",
    notNull: true,
    defaultValue: {
      prep: "now()"
    }
  },
  creation_user_id: {
    type: "uuid",
    notNull: true
  }
};

module.exports.modificationMetaFields = {
  modification_date: {
    type: "timestamp with time zone",
    notNull: true,
    defaultValue: {
      prep: "now()"
    }
  },
  modification_user_id: {
    type: "uuid",
    notNull: true
  }
};

module.exports.createTable = function(db, table) {
  console.log(`creating table ${table.name}`);
  return db.createTable(table.name, table.fields).then((result) => {
    if (table.uniqueTupples) {
      table.uniqueTupples.forEach((tupple) => {
        const constraintName = `${table.name}_${tupple.join("_")}_uidx`;
        console.log(`creating unique constraint ${constraintName}`);
        db.addIndex(table.name, constraintName, tupple);
      });
    }
    return result;
  });
};

module.exports.dropTable = function(db, name, callback) {
  console.log(`dropping table ${name}`);
  db.dropTable(name, callback);
};

module.exports.createForeignKey = function(tableName, fieldName, fkTableName, fkFieldName) {
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
};
