const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');
const Identification = require('./Identification'); // Vérifiez le chemin si nécessaire

class Categorie extends Model {}

Categorie.init({
  idCategorie: { // Utilisation de `camelCase` pour PostgreSQL
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nomCategorie: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true // Ajout de la contrainte d'unicité si nécessaire
  },
  montantAPayer: {
    type: DataTypes.FLOAT, // PostgreSQL prend en charge FLOAT
    allowNull: false,
    defaultValue: 0 // Valeur par défaut
  }
}, {
  sequelize,
  modelName: 'Categorie',
  tableName: 'Categorie',
  timestamps: false
});

module.exports = Categorie;