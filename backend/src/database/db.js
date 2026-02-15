const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'love_planner.db');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('❌ Error connecting to SQLite', err);
    } else {
        console.log('💾 SQLite database connected');
    }
});

db.serialize(() => {
    // Tabla base (NO se modifica si ya existe)
    db.run(`
    CREATE TABLE IF NOT EXISTS plans (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      type TEXT NOT NULL,
      date TEXT NOT NULL,
      time TEXT NOT NULL,
      location TEXT,
      notes TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);

    // 🔔 Nuevas columnas para recordatorios (seguras)
    db.run(`ALTER TABLE plans ADD COLUMN remind_at TEXT`, () => {});
    db.run(`ALTER TABLE plans ADD COLUMN reminder_sent INTEGER DEFAULT 0`, () => {});

    // 📝 Tabla de notas románticas
    db.run(`
      CREATE TABLE IF NOT EXISTS notes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        author TEXT NOT NULL,
        content TEXT NOT NULL,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP
      )
    `);
});

module.exports = db;