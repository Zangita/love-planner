const app = require('./app');

const PORT = process.env.PORT;

if (!PORT) {
    throw new Error('PORT environment variable is not defined');
}

app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Love Planner backend running on port ${PORT}`);
});

const { checkAndSendReminders } = require('./services/reminderService');

setInterval(() => {
    checkAndSendReminders();
}, 60 * 1000);