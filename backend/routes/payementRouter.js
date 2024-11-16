// routes/payementRouter.js
const express = require('express');
const router = express.Router();
const payementModel = require('../models/Payement');


// POST Route to create a new payment
router.post('/', async (req, res, next) => {
  const { IdIdentification, Montant, datePayement } = req.body;
  
  // Data validation (example)
  if (!IdIdentification || !Montant || !datePayement) {
    return res.status(400).json({ message: 'Missing required fields' });
  }
  
  try {
    // Processing data and logging it
    console.log("Données reçues :", {
      IdIdentification: String(IdIdentification),
      Montant: String(Montant),
      datePayement: String(datePayement)
    });

    // Assuming payementModel has a method to save the payment data
    const newPayement = await payementModel.createPayement({
      NULL,
      datePayement,
      Montant,
      IdIdentification
    });
    
    res.status(201).json({
      message: 'Données reçues BACKEND',
      data: newPayement
    });
  } catch(error) {
    res.status(400).json({
      error: error
    });
  }; 
});
// GET Route to fetch all payments
router.get('/', async (req, res, next) => {
  try {
    const payements = await payementModel.getAllPayements();
    res.json(payements);
  }  catch(error) {
    res.status(400).json({
      error: error
    });
  }; 
});

module.exports = router;
