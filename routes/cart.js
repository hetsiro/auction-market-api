// routes/cart.js
const express = require('express');
const router = express.Router();
const { postUpdateCart, getCart } = require('../controllers/cartController');
const { verifyToken } = require('../middlewares/auth');

// /api/cart/...
router.post('/update-cart', verifyToken, postUpdateCart);
router.get('/get-cart', verifyToken, getCart);

module.exports = router;