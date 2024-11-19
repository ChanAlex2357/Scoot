// config/database.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('scoot', 'postgres', 'itu16', {
  host: 'localhost',
  dialect: 'postgres' // ou 'postgres', 'sqlite', 'mariadb' selon ta base de données
});

module.exports = sequelize;
