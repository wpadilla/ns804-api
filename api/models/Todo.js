const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Todo = mongoose.model('Todo', new Schema({
    title: String,
    desc: String,
}));

module.exports = Todo;

