const express = require('express');
const router = express.Router();
const PlanModel = require('../models/PlanModel');

router.post('/', (req, res) => {
    const { title, type, date, time, location, notes } = req.body;

    // Validación mínima
    if (!title || !type || !date || !time) {
        return res.status(400).json({
            error: 'Missing required fields'
        });
    }

    PlanModel.create({ title, type, date, time, location, notes },
        (err, plan) => {
            if (err) {
                console.error(err);
                return res.status(500).json({
                    error: 'Error creating plan'
                });
            }

            res.status(201).json(plan);
        }
    );
});

router.get('/', (req, res) => {
    PlanModel.getAll((err, plans) => {
        if (err) {
            console.error(err);
            return res.status(500).json({
                error: 'Error fetching plans'
            });
        }

        res.json(plans);
    });
});

// Editar un plan
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { title, type, date, time, location, notes } = req.body;

    if (!title || !type || !date || !time) {
        return res.status(400).json({
            error: 'Missing required fields'
        });
    }

    PlanModel.update(
        id, { title, type, date, time, location, notes },
        (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({
                    error: 'Error updating plan'
                });
            }

            if (result.updated === 0) {
                return res.status(404).json({
                    error: 'Plan not found'
                });
            }

            res.json({ success: true });
        }
    );
});

// Eliminar un plan
router.delete('/:id', (req, res) => {
    const { id } = req.params;

    PlanModel.delete(id, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({
                error: 'Error deleting plan'
            });
        }

        if (result.deleted === 0) {
            return res.status(404).json({
                error: 'Plan not found'
            });
        }

        res.json({ success: true });
    });
});

module.exports = router;