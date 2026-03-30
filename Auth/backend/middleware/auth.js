const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  // Отримуємо токен з заголовка Authorization: Bearer <token>
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    // Перевірка токена
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Додаємо дані користувача в об'єкт запиту
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
};