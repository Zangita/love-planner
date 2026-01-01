const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({
        status: 'ok',
        message: 'Love Planner backend is alive 💕'
    });
});

module.exports = router;