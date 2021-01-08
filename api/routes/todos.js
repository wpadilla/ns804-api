import {isAuthenticated} from "../auth";

const express = require('express');

const router = express.Router();
const Todos = require('../models/Todo');

router.get('/', isAuthenticated, (req, res) => {
    Todos.find().exec().then(x => res.status(200).send(x));
});


router.get('/:id', isAuthenticated, (req, res) => {
    Todos.findById(req.params.id).exec().then(x => res.status(200).send(x));
});

router.post('/', isAuthenticated, (req, res) => {
    Todos.create(req.body).then(x => res.status(201).send(x));
});

router.put('/:id', isAuthenticated, (req, res) => {
    Todos.findOneAndUpdate(req.params.id, req.body).then(x => res.status(204).send('Success!'));
});

router.delete('/:id', isAuthenticated, (req, res) => {
    Todos.findOneAndDelete(req.params.id, req.body).then(x => res.status(204).send('Success!'));
});
module.exports = router;
