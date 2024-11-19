const { DataTypes, Model, QueryTypes } = require('sequelize');
const sequelize = require('../config/database');
const Identification = require('./Identification');
const Categorie = require('./Categorie');

class Payement extends Model {}

Payement.init({
  idPayement: { // Utilisation de camelCase pour PostgreSQL
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  datePayement: {
    type: DataTypes.DATEONLY, // DATEONLY pour éviter le stockage inutile de l'heure
    allowNull: false
  },
  Montant: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  IdIdentification: { // camelCase pour la clé étrangère
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

// Vérification de l'identification
async function validateIdentification(IdIdentification) {
  console.log("ID :: "+IdIdentification);
  const identification = await Identification.findByPk(IdIdentification);
  if (!identification) {
    throw new Error('Identification inexistante.');
  }
  return identification;
}

// Vérification du Montant
async function validateMontant(Montant, IdIdentification) {
  const identification = await validateIdentification(IdIdentification);
  const categorie = await Categorie.findByPk(identification.idCategorie);

  if (!categorie) {
    throw new Error(`Aucune catégorie trouvée pour l'identification ID : ${IdIdentification}`);
  }

  if (Montant !== categorie.MontantAPayer) {
    throw new Error(
      `Montant invalide. Montant attendu : ${categorie.MontantAPayer}, Montant fourni : ${Montant}`
    );
  }
}

// Vérification de la date de paiement
async function validateDatePayement(datePayement, IdIdentification) {
  const year = new Date(datePayement).getFullYear();

  const paiementExistant = await Payement.findOne({
    where: {
      IdIdentification,
      datePayement: sequelize.where(
        sequelize.fn('YEAR', sequelize.col('datePayement')),
        year
      )
    }
  });

  if (paiementExistant) {
    throw new Error('Un paiement pour cette année existe déjà.');
  }
}

// Création d'un paiement
Payement.createPayement = async (data) => {
  const { datePayement, Montant, IdIdentification } = data;

  try {
    await validateIdentification(IdIdentification);
    await validateMontant(Montant, IdIdentification);
    await validateDatePayement(datePayement, IdIdentification);

    const paiement = await Payement.create({
      datePayement,
      Montant,
      IdIdentification
    });

    console.log('Paiement inséré avec succès:', paiement);
    return { success: true, message: 'Paiement inséré avec succès.', paiement };
  } catch (error) {
    console.error('Erreur lors de l’insertion du paiement:', error.message);
    return { success: false, message: error.message, error };
  }
};

// Récupération de tous les paiements
Payement.getAllPayements = async () => {
  return await Payement.findAll({
    include: {
      model: Identification,
      as: 'identification', // Alias défini dans la relation
      attributes: ['nom', 'idCategorie']
    }
  });
};

// Récupération d'un paiement par ID
Payement.getPayementById = async (id) => {
  return await Payement.findByPk(id, {
    include: {
      model: Identification,
      as: 'identification',
      attributes: ['nom', 'idCategorie']
    }
  });
};

// Mise à jour d'un paiement
Payement.updatePayement = async (id, data) => {
  return await Payement.update(data, { where: { idPayement: id } });
};

// Suppression d'un paiement
Payement.deletePayement = async (id) => {
  return await Payement.destroy({ where: { idPayement: id } });
};

// Relations
Payement.belongsTo(Identification, {
  foreignKey: 'IdIdentification',
  as: 'identification'
});

module.exports = Payement;
