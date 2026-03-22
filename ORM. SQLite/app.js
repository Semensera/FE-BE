require('dotenv').config();
const express = require('express');
const sequelize = require('./config/database');
const User = require('./models/User');

const app = express();
app.use(express.json()); // для читання JSON тіла запиту

const PORT = process.env.PORT || 3111;

// 1. Отримання всіх користувачів (GET)
app.get('/users', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 2. Створення користувача (POST)
app.post('/users', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newUser = await User.create({ name, email, password });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Синхронізація з базою та запуск сервера
async function startServer() {
  try {
    // Перевірка підключення та створення таблиць
    await sequelize.authenticate();
    await sequelize.sync(); // sync({ alter: true }) якщо треба оновити структуру
    console.log('Database connected successfully.');

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

startServer();