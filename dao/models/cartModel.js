const mongoose = require('mongoose');

const { Schema } = mongoose;
const cartsCollection = "carts";

const cartSchema = new Schema({
    id: String,
    products: [{
        product: { type: Schema.Types.ObjectId, ref: 'Product' },
        quantity: Number
    }]
});

const CartModel = mongoose.model(cartsCollection, cartSchema);

module.exports = CartModel;