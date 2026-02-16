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

// ✏️ Editar nota
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { content } = req.body;

    if (!content) {
        return res.status(400).json({ error: 'Content required' });
    }

    NoteModel.update(id, content, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error updating note' });
        }

        if (result.updated === 0) {
            return res.status(404).json({ error: 'Note not found' });
        }

        res.json({ success: true });
    });
});

// 🗑 Eliminar nota
router.delete('/:id', (req, res) => {
    const { id } = req.params;

    NoteModel.delete(id, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error deleting note' });
        }

        if (result.deleted === 0) {
            return res.status(404).json({ error: 'Note not found' });
        }

        res.json({ success: true });
    });
});

module.exports = router;