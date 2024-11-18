const sequelize = require('../config/database'); // Assurez-vous que ce fichier pointe correctement vers votre configuration Sequelize
const { QueryTypes } = require('sequelize');

const PayementSummary = {
  /**
   * Récupère les montants estimé, récolté et à récolter pour une année spécifique.
   * Si aucune année n'est fournie, utilise l'année actuelle par défaut.
   * 
   * @param {number} year - L'année pour laquelle récupérer les données (facultatif).
   * @returns {Promise<Object>} - Objet contenant les montants calculés.
   */
  async getSummary(year = new Date().getFullYear()) {
    const query = `
      SELECT 
          SUM(iden.montantAPayer) AS montantEstime,
          COALESCE(SUM(p.Montant), 0) AS montantRecolte,
          (SUM(iden.montantAPayer) - COALESCE(SUM(p.Montant), 0)) AS montantARecolter
      FROM 
          identification_cpl AS iden
      LEFT JOIN 
          Payement AS p
          ON iden.idIdentification = p.idIdentification
      WHERE 
          YEAR(p.DatePayement) = :year -- Limiter les paiements à l'année spécifiée
          OR p.DatePayement IS NULL;
    `;
    
    try {
      const result = await sequelize.query(query, {
        type: QueryTypes.SELECT,
        replacements: { year }, // Injection du paramètre d'année
      });

      // Retourne le premier élément (unique résultat attendu)
      return result[0];
    } catch (error) {
      console.error('Erreur lors de l’exécution de la requête PayementSummary:', error);
      throw error;
    }
  },
};

module.exports = PayementSummary;
