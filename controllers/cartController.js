const Cart = require('../models/Cart');



exports.postUpdateCart = async (req, res) => {
    try {

        const userId = req.userId; // ✅ llega desde el middleware
        const items = req.body;

        if (!Array.isArray(items)) {
            return res.status(400).json({ message: 'Product and quantity are required and must be valid' });
        }

        let cart = await Cart.findOne({ user: userId });
        cart.items = items

        await cart.save();
        res.status(200).json({ message: 'Cart updated', cart });

    } catch (err) {
        console.error('💥 Error en postUpdateCart:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getCart = async (req, res) => {
    try {

        const userId = req.userId; // ✅ llega desde el middleware

        const cart = await Cart.findOne({ user: userId });

        res.status(200).json({ cart });

    } catch (err) {
        console.error('💥 Error en postUpdateCart:', err);
        res.status(500).json({ message: 'Server error' });
    }
};