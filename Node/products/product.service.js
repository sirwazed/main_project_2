const config = require('config.json');
const jwt = require('jsonwebtoken');
const Role = require('_helpers/role');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const Product = db.Product;

module.exports = {
    getAll,
    getByCategory,
    getByCode,
    create,
    update,
    delete: _delete
};

serverUrl = 'http://localhost:4000/';

async function getAll(req) {
    if(req.params.id == 0){
        return await Product.find();
    }
    else{
        console.log("yes");
        let num = parseInt(req.params.id);
        return await Product.find().skip((num-1)*10).limit(10);
    }
}

async function getByCode(id) {
    //console.log(id);
    return await Product.find({productShortCode:id});
}

async function getByCategory(id) {
    //console.log(id);
    return await Product.find({category: id});
}


async function create(userParam) {
    // validate
    if (await Product.findOne({ productShortCode: userParam.productShortCode })) {
        throw 'productShortCode "' + userParam.productShortCode + '" is already taken';
    }

    const product = new Product(userParam);

    await product.save();
}

async function update(id, userParam) {
    const product = await Product.findById(id);
    Object.assign(product, userParam);
    //console.log(product);
    await product.save();
}

async function _delete(id) {
    await Product.findByIdAndRemove(id);
}