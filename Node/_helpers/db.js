const config = require('config.json');
const mongoose = require('mongoose');
//const connectionOptions = { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false };
mongoose.connect(process.env.MONGODB_URI || config.connectionString, ()=>{
    console.log("Db Connected");
});
mongoose.Promise = global.Promise;

module.exports = {
    User: require('../users/user.model'),
    Product: require('../products/product.model'),
    Cart: require("../cart/cart.model")
};