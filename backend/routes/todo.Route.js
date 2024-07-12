const express = require('express');
const { TodoModel } = require('../models/todo.model.js');
const {validateTodo} =require("../middleWare/validate.js")
const todoRouter = express.Router();



// Get all todo items
todoRouter.get('/', async (req, res) => {
    try {
        const data = await TodoModel.find();
        
        res.status(200).send(data);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Server error' });
    }
});

// Create a new todo item
todoRouter.post('/', validateTodo, async (req, res) => {
    const payload = req.body;
    try {
        const data = new TodoModel(payload);
        await data.save();
        res.status(201).send({ message: 'Todo item created', data });
    } catch (err) {
        console.error(err);
        res.status(400).send({ message: 'Error creating todo item' });
    }
});

// Update a todo item by ID
todoRouter.patch('/edit/:id', validateTodo, async (req, res) => {
    const newData = req.body;
    const id = req.params.id;
    
    try {
        // Check if the item exists
        const existingTodo = await TodoModel.findById(id);
        
        if (!existingTodo) {
            return res.status(404).send({ message: 'Todo item not found' });
        }
        
        // Update the item
        const updatedData = await TodoModel.findByIdAndUpdate(id, newData, { new: true });
        res.status(200).send({ message: 'Todo item updated', updatedData });
    } catch (err) {
        console.error(err);
        res.status(400).send({ message: 'Error updating todo item' });
    }
});



// Delete a todo item by ID
todoRouter.delete('/del/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const deletedData = await TodoModel.findByIdAndDelete(id);
        if (!deletedData) {
            return res.status(404).send({ message: 'Todo item not found' });
        }
        res.status(200).send({ message: 'Todo item deleted' });
    } catch (err) {
        console.error(err);
        res.status(400).send({ message: 'Error deleting todo item' });
    }
});

module.exports = { todoRouter };
