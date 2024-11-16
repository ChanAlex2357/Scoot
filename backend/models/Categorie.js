// models/Categorie.js
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');
const Identification = require('./Identification'); // Ensure correct path

class Categorie extends Model {}

Categorie.init({
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
  sequelize,
  modelName: 'Categorie',
  tableName: 'Categorie',
  timestamps: false
});

// Relations
// Categorie.hasMany(Identification, { foreignKey: 'IdCategorie' }); // Define the relationship

module.exports = Categorie;
