const app = require('./app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Love Planner backend running on port ${PORT}`);
});

// Cron / reminders
const { checkAndSendReminders } = require('./services/reminderService');

setInterval(() => {
    checkAndSendReminders();
}, 60 * 1000);