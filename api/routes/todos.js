import {isAuthenticated} from "../auth";

const express = require('express');

const router = express.Router();
const Todos = require('../models/Todo');

router.get('/', isAuthenticated, (req, res) => {
    const { _id } = req.user;
    Todos.find({user_id: _id}).exec().then(x => res.status(200).send({ data: x }));
});


router.get('/:id', isAuthenticated, (req, res) => {
    Todos.findById(req.params.id).exec().then(x => res.status(200).send({ data: x }));
});

router.post('/', isAuthenticated, (req, res) => {
    const { _id } = req.user;
    Todos.create({...req.body, user_id: _id }).then( x => res.status(201).send({ data: x }));
});

router.put('/:id', isAuthenticated, (req, res) => {
    Todos.findOneAndUpdate(req.params.id, req.body).then(x => res.status(200).send({message: 'Success!', data: req.body }));
});

router.delete('/:id', isAuthenticated, (req, res) => {
    Todos.deleteOne({_id: req.params.id}).then(x => res.status(200).send({message: 'Success!', data: x}));
});
module.exports = router;
