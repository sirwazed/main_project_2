﻿const express = require('express');
const router = express.Router();
const userService = require('./user.service');
const authorize = require('_helpers/authorize')
const Role = require('_helpers/role');
const { route } = require('express/lib/application');

// routes
router.post('/authenticate', authenticate);     // public route
router.get('/', getAll); // admin only authorize(Role.Admin)
router.post('/register',register);
//router.get('/current',authorize(),getCurrent);
//router.get('/:id', authorize(), getById);       // all authenticated users
//router.put('/:id',authorize(),update);
//router.delete('/:id',authorize(), _delete);
module.exports = router;

function authenticate(req, res, next) {
    userService.authenticate(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    userService.getAll()
        .then(users => res.json(users))
        .catch(err => next(err));
}

function getById(req, res, next) {
    const currentUser = req.user;
    const id = req.params.id;
    //console.log(`id is ${id}, currentUser.sub is ${currentUser.sub},,,, role ${currentUser.role}`)

    // only allow admins to access other user records
    if (id !== currentUser.sub && currentUser.role !== Role.Admin) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    userService.getById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function getCurrent(req, res, next) {
    userService.getById(req.user.sub)
        .then(user => {user ? res.json(user) : res.sendStatus(404);})
        .catch(err => next(err));
}

function update(req, res, next) {
    const currentUser = req.user;
    const id = req.params.id;
    //console.log(`id is ${id}, currentUser.sub is ${currentUser.sub},,,, role ${currentUser.role}`)

    // No one has access other user records

    if (id !== currentUser.sub) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    userService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    const currentUser = req.user;
    const id = req.params.id;
    //console.log(`id is ${id}, currentUser.sub is ${currentUser.sub},,,, role ${currentUser.role}`)

    // No one has access other user records

    if (id !== currentUser.sub) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    userService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function register(req, res, next) {
    userService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}