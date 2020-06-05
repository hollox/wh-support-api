module.exports = {
  createTable: function(db, table) {
    console.log(`creating table ${table.name}`);
    return db.createTable(table.name, table.fields);
  },
  dropTable: function(db, name, callback) {
    console.log(`dropping table ${name}`);
    db.dropTable(name, callback);
  }
};
