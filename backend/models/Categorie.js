// models/Categorie.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Categorie = sequelize.define('Categorie', {
  IdCategorie: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nomCategorie: {
    type: DataTypes.STRING,
    allowNull: false
  },
  montantAnnuel: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
}, {
  tableName: 'Categorie',
  timestamps: false
});

module.exports = Categorie;
