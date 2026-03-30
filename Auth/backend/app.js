require('dotenv').config();
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sequelize = require('./config/database');
const User = require('./models/User');
const authMiddleware = require('./middleware/auth');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3111;

// --- ПУБЛІЧНІ МАРШРУТИ ---

// Реєстрація (Крок 8)
app.post('/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Хешуємо пароль
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    res.status(201).json({ message: "User registered", id: user.id });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// Логін (Крок 9)
app.post('/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Шукаємо користувача
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ error: "User not found" });

    // Перевіряємо пароль
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Wrong password" });

    // Створюємо JWT токен
    const token = jwt.sign(
      { id: user.id, email: user.email }, 
      process.env.JWT_SECRET, 
      { expiresIn: '1h' }
    );

    res.json({ message: "Login successful", token });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// --- ЗАХИЩЕНІ МАРШРУТИ ---

// Отримання профілю (Крок 10)
app.get('/auth/me', authMiddleware, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ['password'] } // Не повертаємо пароль
    });
    res.json(user);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Запуск
async function start() {
  try {
    await sequelize.sync();
    app.listen(PORT, () => console.log(`Auth Server running on port ${PORT}`));
  } catch (err) {
    console.error(err);
  }
}
start();