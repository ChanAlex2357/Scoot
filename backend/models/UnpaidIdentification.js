const sequelize = require('../config/database'); // Configuration Sequelize
const { QueryTypes } = require('sequelize');

const UnpaidIdentification = {
  /**
   * Récupère les identifications qui n'ont pas effectué de paiement pour une année donnée.
   * 
   * @param {number} year - Année pour laquelle vérifier les paiements.
   * @returns {Promise<Array<Object>>} - Liste des identifications sans paiement.
   */
  async getUnpaidIdentifications(year = new Date().getFullYear()) {
    const query = `
      SELECT 
          i.idIdentification, 
          i.nom, 
          c.nomCategorie, 
          c.montantAPayer
      FROM 
          Identification AS i
      INNER JOIN 
          Categorie AS c ON i.idCategorie = c.idCategorie
      WHERE 
          i.idIdentification NOT IN (
              SELECT 
                  p.idIdentification
              FROM 
                  Payement AS p
              WHERE 
                  YEAR(p.DatePayement) = :year
          );
    `;

    try {
      const results = await sequelize.query(query, {
        type: QueryTypes.SELECT,
        replacements: { year }, // Paramètre pour l'année
      });

      return results; // Retourne la liste des résultats
    } catch (error) {
      console.error('Erreur lors de l’exécution de la requête UnpaidIdentification:', error);
      throw error;
    }
  },
};

module.exports = UnpaidIdentification;
