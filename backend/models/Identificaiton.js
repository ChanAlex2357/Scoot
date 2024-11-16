// models/Identification.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Categorie = require('./Categorie');

const Identification = sequelize.define('Identification', {
  IdIdentification: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nom: {
    type: DataTypes.STRING,
    allowNull: false
  },
  IdCategorie: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Categorie,
      key: 'IdCategorie'
    }
  }
}, {
  tableName: 'Identification',
  timestamps: false
});

Identification.belongsTo(Categorie, { foreignKey: 'IdCategorie' });
module.exports = Identification;
