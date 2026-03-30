require('dotenv').config();
const express = require('express');
const sequelize = require('./config/database');
const User = require('./models/User');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3111;

// Маршрути
app.get('/users', async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

app.post('/users', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// Запуск із очікуванням бази даних
async function start() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log('Connected to MySQL via Sequelize');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error('Database connection failed. Retrying in 5s...', err);
    setTimeout(start, 5000); // Перезапуск, якщо база ще не піднялася в Docker
  }
}

start();