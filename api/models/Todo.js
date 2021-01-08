const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Todo = mongoose.model('Todo', new Schema({
    title: String,
    desc: String,
    user_id: { type: Schema.Types.ObjectId, ref: 'User' },

}));

module.exports = Todo;

