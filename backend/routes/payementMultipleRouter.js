// routes/payementRouter.js
const express = require('express');
const router = express.Router();
const payementModel = require('../models/Payement');

router.post('/', async (req, res, next) => {
  console.log("--- MULTIPLE ---");
  const payements = req.body.payements; // Récupérer un tableau de paiements depuis le corps de la requête
  if (!Array.isArray(payements) || payements.length === 0) {
    return res.status(400).json({ message: 'Aucun paiement fourni.' });
  }
  // Pour stocker les résultats d'insertion
  const results = [];
  const errors = [];
  
  for (const payement of payements) {
    const { IdIdentification, Montant, datePayement } = payement;
    
    console.log("insertion du payement");
    console.log(payement);
    console.log({ IdIdentification, Montant, datePayement });
    // Validation des données pour chaque paiement
    if (!IdIdentification || !Montant || !datePayement) {
      errors.push({
        message: 'Champs manquants',
        payement,
      });
      continue;
    }

    try {
      // Transformation de la date en format YYYY-MM-DD
      const formattedDate = new Date(datePayement).toISOString().split('T')[0];

      // Appel à la méthode pour insérer le paiement
      const result = await payementModel.createPayement({
        datePayement: formattedDate,
        Montant,
        IdIdentification,
      });

      // Gestion du résultat de l'insertion
      if (result.success) {
        results.push({
          message: result.message,
          data: result.paye,
        });
      } else {
        errors.push({
          message: result.message,
          payement,
        });
      }
    } catch (error) {
      // Capture des erreurs pendant le traitement
      errors.push({
        message: 'Erreur lors du traitement du paiement.',
        error: error.message,
        payement,
      });
    }
  }

  // Répondre avec les résultats d'insertion et les erreurs
  if (errors.length > 0) {
    return res.status(400).json({
      message: 'Certaines opérations ont échoué.',
      success: false,
      errors,
      results,
    });
  }

  // Si tout s'est bien passé
  res.status(201).json({
    message: 'Tous les paiements ont été insérés avec succès.',
    success: true,
    results,
  });
});

module.exports = router;
