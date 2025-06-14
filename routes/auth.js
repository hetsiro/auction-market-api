// routes/auth.js
const express = require('express');
const router = express.Router();
const { postRegister, postLogin, postRecoveryRequest, verifyToken, postResetPassword } = require('../controllers/userController');

// /api/auth/...
router.post('/register', postRegister);
router.post('/login', postLogin);
router.post('/recovery-request', postRecoveryRequest);
router.get('/verify-token', verifyToken);
router.post('/reset-password/:token', postResetPassword);

module.exports = router;