// routes/payementRouter.js
const express = require('express');
const router = express.Router();
const PayementSummary = require('../models/PayementSummary');
const UnpaidIdentification = require('../models/UnpaidIdentification');

// GET Route to fetch all payments
router.get('/', async (req, res, next) => {
    try {
        const year = req.query.year ? parseInt(req.query.year, 10) : new Date().getFullYear(); // Année passée en paramètre ou année actuelle par défaut
        
        // Récupérer le résumé des paiements
        const summary = await PayementSummary.getSummary(year);
        // Récupérer les identifications impayées
        const unpaidDetails = await UnpaidIdentification.getUnpaidIdentifications(year);

        // Inclure les détails des impayés dans la réponse JSON
        const response = {
            summary,
            unpaidDetails,
        };

        console.log (summary);

        res.status(200).json(response); // Retourne les montants et les détails sous forme JSON
    } catch (error) {
        console.error('Erreur lors de la récupération des données de paiement:', error);
        res.status(500).json({ error: 'Erreur lors de la récupération des données.' });
    }
});

module.exports = router;
