// middlewares/auth.js
const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authorization header missing or invalid' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.SECRET_JWT_SEED);
    req.userId = decoded.userId; // 👈 aquí queda el ID del usuario logueado
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};