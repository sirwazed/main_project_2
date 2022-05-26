const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    productName: { type: String, required: true, minlength: 3, unique: true },
    productShortCode: { type: String, required: true, minlength: 3, maxlength: 50, unique: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    description: {type: String, minlength: 3, maxlength: 250},
    imageUrl: { type: String},
    isBestAchived: {type: Boolean},
    CreatedDate: {type: Date, required: true, max: Date.now(), default: Date.now()},
    origin: {type:String, required: true}
});

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
});

module.exports = mongoose.model('Product', schema);