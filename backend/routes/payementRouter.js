// routes/payementRouter.js
const express = require('express');
const router = express.Router();

router.post('/', (req,res,next) => {
  // Récupération des données depuis le corps de la requête
  const { IdIdentification, Montant, datePayement } = req.body;
  // Vérification et traitement des données reçues
  console.log("Données reçues :", {
    IdIdentification: String(IdIdentification),
    Montant: String(Montant),
    datePayement: String(datePayement)
  });
  // Répondre avec un message de confirmation
  res.status(201).json(
    { 
      message: 'Données reçues BACKEND',
      data: {
        IdIdentification,
        Montant, 
        datePayement 
      } 
    });
});

module.exports = router;
