const { Sequelize } = require('sequelize');

// Налаштування SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite', // файл бази створиться автоматично
  logging: false
});

module.exports = sequelize;