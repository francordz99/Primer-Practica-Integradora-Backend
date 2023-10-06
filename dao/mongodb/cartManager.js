const CartModel = require('../models/cartModel');

class CartManager {
    static generateUniqueCartId() {
        return Date.now().toString();
    }

    static async addCartToStorage(cart) {
        try {
            const newCart = new CartModel(cart);
            await newCart.save();
            return newCart;
        } catch (error) {
            console.error("Error al agregar el carrito al almacenamiento:", error);
            throw error;
        }
    }

    static async getCartById(cartId) {
        try {
            const cart = await CartModel.findOne({ id: cartId });
            return cart || null;
        } catch (error) {
            console.error("Error al obtener el carrito por ID:", error);
            throw error;
        }
    }

    static async addProductToCart(cartId, productId) {
        try {
            const cart = await CartModel.findOne({ id: cartId });

            if (!cart) {
                throw new Error('Carrito no encontrado');
            }

            const existingProduct = cart.products.find(product => product.product.toString() === productId);

            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                cart.products.push({ product: productId, quantity: 1 });
            }

            await cart.save();
            return cart;
        } catch (error) {
            console.error("Error al agregar el producto al carrito:", error);
            throw error;
        }
    }
}

module.exports = CartManager;
