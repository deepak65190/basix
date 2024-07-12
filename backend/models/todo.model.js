const mongoose = require('mongoose');

const todoSchema =  mongoose.Schema({
    name: {
        type: String,
        required: true,
        
    },
    email: {
        type: String,
        required: true,
        match: [/.+\@.+\..+/, 'Please fill a valid email address']
    },
    rollNum: {
        type: Number,
        required: true,
      
    }
}, { timestamps: true });

const TodoModel = mongoose.model('Todo', todoSchema);

module.exports = { TodoModel };
