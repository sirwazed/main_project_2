const express = require('express');
const router = express.Router();
const productService = require('./product.service');
const authorize = require('_helpers/authorize')
const Role = require('_helpers/role');
const { route } = require('express/lib/application');
const multer = require('multer');
const crypto = require('crypto');
const { response } = require('express');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        cb(null, crypto.randomBytes(4).toString('hex') + file.originalname);
    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(new Error('Invalid File'), false);
    }
}

const upload = multer({
    storage: storage, limits: {
        fieldSize: 1024 * 1024 * 5
    }, fileFilter: fileFilter
});

// routes
router.get('/get/:id', getAll); // 0 to get everything. 1 to get first 10.
router.post('/create', upload.single('imageUrl'), register);
router.get('/category/:id', getByCategory);
router.get('/:id', getByCode);
router.put('/:id',upload.single('imageUrl'), update);
router.delete('/:id', _delete);
// test

module.exports = router;
serverUrl = 'http://localhost:4000/';
function getAll(req, res, next) {
    productService.getAll(req)
        .then(products => {
            products.forEach(element => {

                if(element.imageUrl.includes('uploads/')){
                    element.imageUrl = serverUrl+element.imageUrl;
                }
            });
            res.send(products)
        })
        .catch(err => next(err));
}

function getByCode(req, res, next) {
    productService.getByCode(req.params.id)
        .then(product => product ? res.json(product) : res.sendStatus(404))
        .catch(err => next(err));
}

function getByCategory(req, res, next) {
    productService.getByCategory(req.params.id)
        .then(product => product ? res.json(product) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    console.log(req.body);
    productService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    productService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function register(req, res, next) {
    //console.log(req.file);
    req.body.imageUrl = 'uploads/'+req.file.filename;
    //console.log(req.body);
    res.json('success');
    productService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}