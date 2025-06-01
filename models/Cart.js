// models/Cart.js
const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [{
        product: { type: Object, required: true },
        quantity: { type: Number, required: true }
    }],
}, {
    timestamps: true // ⬅️ añade createdAt y updatedAt automáticamente
});

module.exports = mongoose.model('Cart', CartSchema, 'cart'); // <-- tercer argumento fuerza la colección real 