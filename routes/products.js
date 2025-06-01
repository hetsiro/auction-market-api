// routes/products.js
const express = require('express');
const router = express.Router();
const { getProducts, getProductById, getTopRatedProducts, getWorstRatedProducts } = require('../controllers/productController');

// /api/products/...
router.get('/', getProducts);
router.get('/top-rated', getTopRatedProducts);
router.get('/worst-rated', getWorstRatedProducts);
router.get('/:id', getProductById);

module.exports = router;