// routes/tasks.js

const express = require('express');
const router = express.Router();
const Task = require('../models/taskModel');

// GET all tasks
router.get('/', (req, res, next) => {
    Task.find()
        .then(tasks => {
            res.json(tasks);
        })
        .catch(next); // Pass errors to the next middleware
});

// GET a task by ID
router.get('/:id', (req, res, next) => {
    Task.findById(req.params.id)
        .then(task => {
            if (!task) {
                const error = new Error('Task not found');
                error.status = 404;
                throw error;
            }
            res.json(task);
        })
        .catch(next); // Pass errors to the next middleware
});

// POST create a new task
router.post('/', (req, res, next) => {
    const { title, description, status, dueDate } = req.body;

    const newTask = new Task({
        title,
        description,
        status,
        dueDate
    });

    newTask.save()
        .then(task => {
            res.status(201).json(task);
        })
        .catch(next); // Pass errors to the next middleware
});

// PUT update a task by ID
router.put('/:id', (req, res, next) => {
    const { title, description, status, dueDate } = req.body;

    Task.findByIdAndUpdate(req.params.id, { title, description, status, dueDate }, { new: true })
        .then(task => {
            if (!task) {
                const error = new Error('Task not found');
                error.status = 404;
                throw error;
            }
            res.json(task);
        })
        .catch(next); // Pass errors to the next middleware
});

// DELETE a task by ID
router.delete('/:id', (req, res, next) => {
    Task.findByIdAndDelete(req.params.id)
        .then(task => {
            if (!task) {
                const error = new Error('Task not found');
                error.status = 404;
                throw error;
            }
            res.json({ message: 'Task deleted successfully' });
        })
        .catch(next); // Pass errors to the next middleware
});

module.exports = router;
