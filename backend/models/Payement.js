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


Payement.createPayement = async (data) => {
  const { datePayement, montant, IdIdentification } = data;

  try {
    // Requête brute pour insérer un paiement
    const query = `
      INSERT INTO Payement (datePayement, montant, IdIdentification)
      VALUES (:datePayement, :montant, :IdIdentification)
    `;
    await sequelize.query(query, {
      type: QueryTypes.INSERT,
      replacements: {
        datePayement,
        montant,
        IdIdentification
      }
    });

    console.log('Paiement inséré avec succès:', data);
    return { success: true, message: 'Paiement inséré avec succès' };
  } catch (error) {
    console.error('Erreur lors de l’insertion du paiement:', error);
    return { success: false, message: 'Erreur lors de l’insertion du paiement', error };
  }
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
