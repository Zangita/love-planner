const app = require('./app');
const { checkAndSendReminders } = require('./services/reminderService');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`💖 Love Planner backend running on port ${PORT}`);
});

// Ejecutar recordatorios cada minuto
setInterval(() => {
    checkAndSendReminders();
}, 60 * 1000);