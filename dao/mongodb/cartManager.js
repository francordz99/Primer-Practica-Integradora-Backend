const CartModel = require('../models/cartModel');

const CartManager = {
    addCart: async (id, products) => {
        try {
            const cart = new CartModel({ id, products });
            await cart.save();
            return cart;
        } catch (error) {
            throw new Error('Error adding cart: ' + error.message);
        }
    },

    getCartById: async (cartId) => {
        try {
            const cart = await CartModel.findById(cartId);
            if (!cart) {
                throw new Error('Cart not found.');
            }
            return cart;
        } catch (error) {
            throw new Error('Error getting cart by ID: ' + error.message);
        }
    },

    addProductToCart: async (cartId, product) => {
        try {
            const cart = await CartModel.findById(cartId);
            if (!cart) {
                throw new Error('Cart not found.');
            }

            cart.products.push(product);
            await cart.save();
            return cart;
        } catch (error) {
            throw new Error('Error adding product to cart: ' + error.message);
        }
    }
};

module.exports = CartManager;
