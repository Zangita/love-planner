const express = require('express');
const cors = require('cors');

const healthRoutes = require('./routes/health.routes');
const plansRoutes = require('./routes/plans.routes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// ✅ ROOT ROUTE (IMPORTANTE)
app.get('/', (req, res) => {
    res.json({
        status: 'ok',
        service: 'love-planner-backend',
        time: new Date().toISOString()
    });
});

// Routes
app.use('/health', healthRoutes);
app.use('/plans', plansRoutes);

module.exports = app;