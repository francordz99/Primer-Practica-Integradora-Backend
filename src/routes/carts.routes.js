const express = require('express');
const router = express.Router();
const CartManager = require('../../dao/mongodb/cartManager');

router.post('/', async (req, res) => {
    try {
        const cartId = CartManager.generateUniqueCartId();

        const newCart = {
            id: cartId,
            products: []
        };

        await CartManager.addCartToStorage(newCart);

        res.status(201).json({ message: 'Carrito creado con éxito.', cart: newCart });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear el carrito.' });
    }
});

router.get('/:cid', async (req, res) => {
    try {
        const { cid } = req.params;
        const cart = await CartManager.getCartById(cid);

        if (!cart) {
            return res.status(404).json({ error: 'Carrito no encontrado o inexistente.' });
        }

        res.json(cart.products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los productos del carrito.' });
    }
});

router.post('/:cid/product/:pid', async (req, res) => {
    try {
        const { cid, pid } = req.params;

        await CartManager.addProductToCart(cid, pid);

        // io.emit('updateCarts');

        res.json({ message: 'Producto agregado al carrito con éxito.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al agregar el producto al carrito.' });
    }
});

module.exports = router;
