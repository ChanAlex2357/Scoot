// models/Payement.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Identification = require('./Identification');

const Payement = sequelize.define('Payement', {
  IdPayement: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  datePayement: {
    type: DataTypes.DATE,
    allowNull: false
  },
  montant: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  IdIdentification: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Identification,
      key: 'IdIdentification'
    }
  }
}, {
  tableName: 'Payement',
  timestamps: false
});

Payement.belongsTo(Identification, { foreignKey: 'IdIdentification' });
module.exports = Payement;
