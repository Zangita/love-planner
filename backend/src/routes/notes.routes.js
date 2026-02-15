const express = require('express');
const router = express.Router();
const NoteModel = require('../models/NoteModel');

// 📥 Obtener todas las notas
router.get('/', (req, res) => {
    NoteModel.getAll((err, notes) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error fetching notes' });
        }

        res.json(notes);
    });
});

// 📝 Crear una nota
router.post('/', (req, res) => {
    const { author, content } = req.body;

    if (!author || !content) {
        return res.status(400).json({ error: 'Missing fields' });
    }

    NoteModel.create({ author, content }, (err, note) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error creating note' });
        }

        res.status(201).json(note);
    });
});

module.exports = router;