const db = require('../database/db');

class NoteModel {
    static create(note, callback) {
        const { author, content } = note;

        const sql = `
      INSERT INTO notes (author, content)
      VALUES (?, ?)
    `;

        db.run(sql, [author, content], function(err) {
            if (err) {
                callback(err);
            } else {
                callback(null, {
                    id: this.lastID,
                    author,
                    content
                });
            }
        });
    }

    static getAll(callback) {
        const sql = `
      SELECT * FROM notes
      ORDER BY created_at DESC
    `;

        db.all(sql, [], (err, rows) => {
            if (err) {
                callback(err);
            } else {
                callback(null, rows);
            }
        });
    }
}

module.exports = NoteModel;