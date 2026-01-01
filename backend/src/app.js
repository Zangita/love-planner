const express = require('express');
const cors = require('cors');

const healthRoutes = require('./routes/health.routes');
const plansRoutes = require('./routes/plans.routes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// ✅ ROOT endpoint (OBLIGATORIO para Railway)
app.get('/', (req, res) => {
    res.status(200).send('💖 Love Planner backend is running');
});

// Routes
app.use('/health', healthRoutes);
app.use('/plans', plansRoutes);

module.exports = app;