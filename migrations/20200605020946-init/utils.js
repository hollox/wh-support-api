module.exports = {
  createTable: function(db, name, fields) {
    console.log(`creating table ${name}`);
    return db.createTable(name, fields);
  },
  dropTable: function(db, name, callback) {
    console.log(`dropping table ${name}`);
    db.dropTable(name, callback);
  }
};
