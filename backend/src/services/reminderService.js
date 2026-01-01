const db = require('../database/db');
const { EMAILS, REMINDER_HOURS_BEFORE } = require('../config/reminderConfig');
const { sendReminderEmail } = require('./emailService');

function checkAndSendReminders() {
    const now = new Date();
    const target = new Date(
        now.getTime() + REMINDER_HOURS_BEFORE * 60 * 60 * 1000
    );

    const targetDate = target.toISOString().slice(0, 10);

    db.all(
        `
    SELECT * FROM plans
    WHERE date = ?
      AND reminder_sent = 0
    `, [targetDate],
        async(err, plans) => {
            if (err) {
                console.error('❌ Error fetching reminders:', err.message);
                return;
            }

            for (const plan of plans) {
                let allSent = true;

                for (const email of EMAILS) {
                    try {
                        await sendReminderEmail(email, plan);
                    } catch {
                        allSent = false;
                    }
                }

                if (allSent) {
                    db.run(
                        `UPDATE plans SET reminder_sent = 1 WHERE id = ?`, [plan.id]
                    );
                    console.log(`📧 Reminder sent for "${plan.title}"`);
                } else {
                    console.warn(
                        `⚠️ Reminder NOT fully sent for "${plan.title}", will retry later`
                    );
                }
            }
        }
    );
}

module.exports = { checkAndSendReminders };