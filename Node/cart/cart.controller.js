const express = require('express');
const router = express.Router();
const cartService = require('./cart.service');
const authorize = require('_helpers/authorize')
const Role = require('_helpers/role');
const { route } = require('express/lib/application');

// routes
router.post('/', insert);     // public route
router.get('/', getAll); // admin only
router.get('/:id',getByUsername);
//router.get('/current',authorize(),getCurrent);
//router.get('/:id', authorize(), getById);       // all authenticated users
//router.put('/:id',authorize(),update);
router.delete('/all/', authorize() ,deleteAll);
router.delete('/:id',authorize(), _delete);
module.exports = router;

function insert(req, res, next) {
    cartService.create(req.body)
        .then((data) => res.json(data))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    cartService.getAll(req.body)
        .then((data) => res.json(data))
        .catch(err => next(err));
}

function getByUsername(req, res, next) {
    console.log(req.params.id);
    cartService.getByUsername(req.params.id)
        .then((product) => product ? res.json(product) : res.sendStatus(404))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    cartService._delete(req.params.id, req.user.sub)
        .then((re) => {
            console.log(re);
            res.json(re);
        })
        .catch(err => next(err));
}

function deleteAll(req, res, next) {
    cartService.deleteAll(req.user.sub)
        .then((re) => {
            console.log(re);
            res.json(re);
        })
        .catch(err => next(err));
}

