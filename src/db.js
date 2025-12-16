const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./database.db");

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS reports (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      ngo_id TEXT,
      month TEXT,
      people_helped INTEGER,
      events_conducted INTEGER,
      funds_utilized INTEGER,
      UNIQUE(ngo_id, month)
    )
  `);
});

module.exports = db;
