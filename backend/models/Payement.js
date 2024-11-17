// models/Payement.js
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');
const Identification = require('./Identification'); // Ensure correct path

class Payement extends Model {}

Payement.init({
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
  sequelize,
  modelName: 'Payement',
  tableName: 'Payement',
  timestamps: false
});


// Functions for data manipulation
Payement.createPayement = async (data) => {
  console.log(data);
  return await Payement.create(data);
};

Payement.getAllPayements = async () => {
  return await Payement.findAll();
};

Payement.getPayementById = async (id) => {
  return await Payement.findByPk(id);
};

Payement.updatePayement = async (id, data) => {
  return await Payement.update(data, { where: { IdPayement: id } });
};

Payement.deletePayement = async (id) => {
  return await Payement.destroy({ where: { IdPayement: id } });
};

module.exports = Payement;
