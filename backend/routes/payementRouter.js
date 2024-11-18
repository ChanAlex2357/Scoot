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
    const resulat = await payementModel.createPayement({
      datePayement,
      Montant,
      IdIdentification
    });
    console.log(resulat);
    if ( resulat.success ){
      res.status(201).json({
        message: resulat.message,
        data: resulat.paye
      });
    }
    else {
      res.status(400).json(resulat);
    }
  } catch(error) {
    res.status(400).json({
      error: resulat.error
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
