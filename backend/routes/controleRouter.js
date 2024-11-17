// routes/payementRouter.js
const express = require('express');
const router = express.Router();
const PayementSummary = require('../models/PayementSummary');

// GET Route to fetch all payments
router.get('/', async (req, res, next) => {
    try {
        const year = req.query.year ? parseInt(req.query.year, 10) : undefined; // Année passée en paramètre ou année actuelle par défaut
        const summary = await PayementSummary.getSummary(year);
        su
        res.status(200).json(summary); // Retourne les montants sous forme JSON
    } catch (error) {
        console.error('Erreur lors de la récupération du résumé des paiements:', error);
        res.status(500).json({ error: 'Erreur lors de la récupération des données.' });
    }
});

module.exports = router;
