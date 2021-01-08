import {isAuthenticated} from "../auth";

const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const Users = require('../models/Users');
const crypto = require('crypto');

const signToken = (_id) => {
    return jwt.sign({_id}, 'my-secreet', {
        expiresIn: 60 * 60 * 24 * 365,
    });
};

router.post('/register', (req, res) => {
    const {email, password} = req.body;
    crypto.randomBytes(16, (err, salt) => {
        const newSalt = salt.toString('base64');
        crypto.pbkdf2(password, newSalt, 10000, 64, 'sha1', (err, key) => {
            const encryptedPassword = key.toString('base64');
            Users.findOne({ email }).exec().then( (user) => {
                if(user) {
                   return res.status(409).send({ message: 'User already exist' });
                } else {
                    Users.create({
                        email,
                        password: encryptedPassword,
                        salt: newSalt,
                    }).then( (user) => {
                        return res.status(201).send({message: 'User created successfully', data: user });
                    })
                }
            })
        });
    });
});

router.post('/login', (req, res) => {
    const {email, password} = req.body;
    Users.findOne({email}).exec()
        .then( user => {
            if(!user) {
                return res.status(402).send({message: 'User and/or Password Incorrect'});
            }
                crypto.pbkdf2(password, user.salt, 10000, 64, 'sha1', (err, key) => {
                    const encryptedPassword = key.toString('base64');

                    if(user.password === encryptedPassword) {
                        const token = signToken(user._id);
                        return res.status(200).send({token});
                    }
                    return res.status(402).send({message: 'User and/or Password Incorrect'});
                })

        });
});

module.exports = router;
