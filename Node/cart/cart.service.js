const config = require('config.json');
const jwt = require('jsonwebtoken');
const Role = require('_helpers/role');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const res = require('express/lib/response');
const Cart = db.Cart;
const User = db.User;

module.exports = {
    create,
    getAll,
    getByUsername,
    _delete,
    deleteAll
};

async function _delete(id, userId) {
    //console.log('_delete');
    let user = await User.findById(userId);
    let product = await Cart.find({productShortCode:id,username: user.username});
    //console.log(product);
    let res = await Cart.findByIdAndRemove(product[0]._id);
    //console.log(`res = ${res}`);
    return res;
}

async function deleteAll(userId) {
    //console.log('_delete');
    let user = await User.findById(userId);
    let res = await Cart.remove({username: user.username});
    return res;
}

async function create(userParam) {
    //console.log(userParam);
    const product = await Cart.find({username: userParam.username, productShortCode: userParam.productShortCode});
    if(product.length){
        console.log('yes');
        return cart = await Cart.findOneAndUpdate({username: userParam.username, productShortCode: userParam.productShortCode},{quantity: product[0].quantity+userParam.quantity});
        // cart = await Cart.find({username: userParam.username, productShortCode: userParam.productShortCode});
        // console.log(cart);
        
    }
    else{
        const cart = new Cart(userParam);
        console.log(cart);
        return await cart.save();
    }
    // const cart = new Cart(userParam);
    // await cart.save();
}

async function getAll() {
    return await Cart.find();
}

async function getByUsername(id) {
    //console.log(id);
    return await Cart.find({username:id});
}