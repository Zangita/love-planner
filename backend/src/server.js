const app = require('./app');

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`💖 Love Planner backend running on http://localhost:${PORT}`);
});

const { checkAndSendReminders } = require('./services/reminderService');

setInterval(() => {
    checkAndSendReminders();
}, 60 * 1000);