const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  resetToken: String,
  resetTokenExpire: Date,
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cart'
  }
});

module.exports = mongoose.model('User', UserSchema);