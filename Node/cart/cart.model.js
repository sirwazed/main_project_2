const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Role = require('_helpers/role');

const schema = new Schema({
    username: { type: String, required: true },
    productShortCode: { type: String, required: true },
    quantity: { type: Number, required: true }
});

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    // transform: function (doc, ret) {
    //     delete ret._id;
    //     delete ret.hash;
    // }
});

module.exports = mongoose.model('Cart', schema);