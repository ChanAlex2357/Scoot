const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');
const Categorie = require('./Categorie');

class Identification extends Model {}

Identification.init({
  idIdentification: { // PostgreSQL préfère les noms en camelCase ou snake_case sans majuscules mixtes
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nom: {
    type: DataTypes.STRING,
    allowNull: false
  },
  idCategorie: { // Renommé pour correspondre à PostgreSQL
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Categorie,
      key: 'idCategorie' // Correspond à la clé primaire du modèle "Categorie"
    }
  }
}, {
  sequelize,
  modelName: 'Identification',
  tableName: 'Identification',
  timestamps: false
});

// Fonctions pour manipuler les données
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
  return await Identification.update(data, { where: { idIdentification: id } });
};

Identification.deleteIdentification = async (id) => {
  return await Identification.destroy({ where: { idIdentification: id } });
};

module.exports = Identification;
