// config/database.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('database_name', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql' // ou 'postgres', 'sqlite', 'mariadb' selon ta base de données
});

module.exports = sequelize;
