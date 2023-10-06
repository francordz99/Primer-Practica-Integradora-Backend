const express = require('express');
const router = express.Router();
const cartManager = require('../../dao/mongodb/cartManager');

// Ruta para crear un carrito
router.post('/', async (req, res) => {
    try {
        const { id, products } = req.body;
        const newCart = await cartManager.addCart(id, products);
        res.status(201).json(newCart);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Ruta para obtener un carrito por ID
router.get('/:cartId', async (req, res) => {
    try {
        const cartId = req.params.cartId;
        const cart = await cartManager.getCartById(cartId);
        res.status(200).json(cart);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

// Ruta para agregar un producto a un carrito
router.put('/:cartId/add-product', async (req, res) => {
    try {
        const cartId = req.params.cartId;
        const product = req.body.product;
        const updatedCart = await cartManager.addProductToCart(cartId, product);
        res.status(200).json(updatedCart);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
