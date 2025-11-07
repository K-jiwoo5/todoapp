const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all todos
router.get('/', (req, res) => {
    db.query('SELECT * FROM todos', (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

// Add a todo
router.post('/', (req, res) => {
    const { task } = req.body;
    db.query('INSERT INTO todos (task) VALUES (?)', [task], (err, results) => {
        if (err) return res.status(500).send(err);
        res.json({ id: results.insertId, task });
    });
});

// Update a todo
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { task } = req.body;
    db.query('UPDATE todos SET task = ? WHERE id = ?', [task, id], (err) => {
        if (err) return res.status(500).send(err);
        res.json({ id, task });
    });
});

// Delete a todo
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM todos WHERE id = ?', [id], (err) => {
        if (err) return res.status(500).send(err);
        res.json({ message: 'Deleted successfully' });
    });
});

module.exports = router;
