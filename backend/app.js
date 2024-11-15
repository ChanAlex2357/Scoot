const express = require('express');

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});


app.post('/scoot-api/payements',(req, res, next) => {
    console.log('Operation d\'insertion de payement');
    console.log(req.body);
    res.status(201).json({
        message:"Donnee de payement"
    });
});


app.use('/scoot-api/payements',(req, res, next) => {
  console.log('Liste des payements !');
  next();
});

module.exports = app;