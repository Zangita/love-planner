const app = require('./app');
const { checkAndSendReminders } = require('./services/reminderService');

// 🔑 Railway exige usar process.env.PORT
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`💖 Love Planner backend running on port ${PORT}`);
});

// ⏰ Revisar recordatorios cada minuto
setInterval(() => {
    checkAndSendReminders();
}, 60 * 1000);