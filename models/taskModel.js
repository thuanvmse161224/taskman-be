const mongoose = require('mongoose');

// Define the TaskStatus enum
const TaskStatus = Object.freeze({
    TODO: 'todo',
    IN_PROGRESS: 'in-progress',
    DONE: 'done'
});

// Define the Task schema
const taskSchema = new mongoose.Schema({
    id: { type: String, default: mongoose.Types.ObjectId, unique: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, enum: Object.values(TaskStatus), required: true },
    dueDate: { type: Date }
});

// Create and export the Task model
const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
