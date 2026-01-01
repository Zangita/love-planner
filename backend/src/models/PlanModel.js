const db = require('../database/db');

class PlanModel {
    static create(plan, callback) {
        const { title, type, date, time, location, notes } = plan;

        const sql = `
      INSERT INTO plans (title, type, date, time, location, notes)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

        db.run(sql, [title, type, date, time, location, notes], function(err) {
            if (err) {
                callback(err);
            } else {
                callback(null, {
                    id: this.lastID,
                    title,
                    type,
                    date,
                    time,
                    location,
                    notes
                });
            }
        });
    }

    static getAll(callback) {
        const sql = `SELECT * FROM plans ORDER BY date, time`;

        db.all(sql, [], (err, rows) => {
            if (err) {
                callback(err);
            } else {
                callback(null, rows);
            }
        });
    }

    static update(id, plan, callback) {
        const { title, type, date, time, location, notes } = plan;

        const sql = `
    UPDATE plans
    SET title = ?, type = ?, date = ?, time = ?, location = ?, notes = ?
    WHERE id = ?
  `;

        db.run(
            sql, [title, type, date, time, location, notes, id],
            function(err) {
                if (err) {
                    callback(err);
                } else {
                    callback(null, { updated: this.changes });
                }
            }
        );
    }

    static delete(id, callback) {
        const sql = `DELETE FROM plans WHERE id = ?`;

        db.run(sql, [id], function(err) {
            if (err) {
                callback(err);
            } else {
                callback(null, { deleted: this.changes });
            }
        });
    }
}

module.exports = PlanModel;