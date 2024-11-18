// models/Payement.js
const { DataTypes, Model ,QueryTypes} = require('sequelize');
const sequelize = require('../config/database');
const Identification = require('./Identification'); // Ensure correct path
const Categorie = require('./Categorie');

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
// Fonction pour contrôler l'identification
async function controllerIdentification(idIdentification) {
    const identification = await Identification.getIdentificationById(idIdentification);
    if (!identification) {
        throw new Error('Identification inexistante.');
    }
    return identification;
}

// Fonction pour contrôler le montant
async function controllerMontant(montant, idIdentification) {
  const identification = await controllerIdentification(idIdentification);
  // Récupérer le rôle de l'identification (par exemple: Admin, Utilisateur)
  const IdCategorie = identification.IdCategorie;
  // Rechercher le montant à payer pour ce rôle dans la base de données
  const categorie = await Categorie.findOne({
     where: { IdCategorie: IdCategorie }
   });
 
   if (!categorie) {
     throw new Error(`Aucune catégorie trouvée pour le rôle : ${IdCategorie}`);
   }
 
   const montantAPayer = categorie.montantAPayer;
  // Comparer les montants
  if (montant > montantAPayer || montant < montantAPayer) {
    throw new Error('Montant non égal au montant attendu, vérifiez les données.');
  } else if (montant === montantAPayer) {
    return { valid: true, message: 'Montant valide.' };
  }
}
// Fonction pour contrôler la date de paiement
async function controllerDatePayement(datePayement, idIdentification) {
    // Extraire l'année de la date de paiement
    const year = new Date(datePayement).getFullYear();
    // Vérifier s'il y a un paiement pour cette identification et cette année
    const paiementExistant = await Payement.findOne({
        where: {
            IdIdentification: idIdentification,
            datePayement: sequelize.where(
                sequelize.fn('YEAR', sequelize.col('datePayement')),
                year
            )
        }
    });

    if (paiementExistant) {
        throw new Error('Paiement déjà effectué pour cette année.');
    }
    return { valid: true, message: 'Date de paiement valide.' };
}

Payement.createPayement = async (data) => {
  const {datePayement, Montant, IdIdentification } = data;
  console .log({datePayement, Montant, IdIdentification });
  try {
    // await controllerIdentification(IdIdentification);
    await controllerMontant(Montant, IdIdentification);
    await controllerDatePayement(datePayement, IdIdentification);
    // Formatage de la date en 'YYYY-MM-DD'
    const date = new Date(datePayement);
    console.log(date)
    const formatedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    console.log(formatedDate);
    // Requête brute pour insérer un paiement
    const query = `
      INSERT INTO Payement (datePayement, montant, IdIdentification)
      VALUES (:formatedDate, :Montant, :IdIdentification)
    `;
     const paye = await sequelize.query(query, {
      type: QueryTypes.INSERT,
      replacements: {
        formatedDate,
        Montant,
        IdIdentification
      }
    });

    console.log('Paiement inséré avec succès:', data);
    return { success: true, message: 'Paiement inséré avec succès' , paye :paye};
  } catch (error) {
    console.error('Erreur lors de l’insertion du paiement:', error.message);
    return { success: false, message:error.message, error: error };
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
