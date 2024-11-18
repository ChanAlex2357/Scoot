// models/Identification.js
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');
const Categorie = require('./Categorie');

class Identification extends Model {}

Identification.init({
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
  sequelize,
  modelName: 'Identification',
  tableName: 'Identification',
  timestamps: false
});
// Functions to manipulate data
Identification.createIdentification = async (data) => {
  return await Identification.create(data);
};

Identification.getAllIdentifications = async () => {
  return await Identification.findAll();
};

Identification.getIdentificationById = async (id) => {
  return await Identification.findByPk(id);
};

Identification.updateIdentification = async (id, data) => {
  return await Identification.update(data, { where: { IdIdentification: id } });
};

Identification.deleteIdentification = async (id) => {
  return await Identification.destroy({ where: { IdIdentification: id } });
};

module.exports = Identification;
