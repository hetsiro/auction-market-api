// models/Product.js
const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    title: { type: String, required: true },
    description: String,
    category: String,
    price: { type: Number, required: true },
    rating: { type: Number, default: 0 },
    brand: String,
    images: [{ type: String }], // ⬅️ mejor que Array, define el tipo
    thumbnail: String
}, {
    timestamps: true // ⬅️ añade createdAt y updatedAt automáticamente
});

module.exports = mongoose.model('Product', ProductSchema, 'products'); // <-- tercer argumento fuerza la colección real 