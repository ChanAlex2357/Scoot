const express = require('express');
const payementRouter = require('./routes/payementRouter');
const app = express();

/// Traiter les requetes json
app.use(express.json());

/// Autoriser les appels de toutes origines
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});


/// Utiliser le payement router pour les requetes du scoot-api/payements
app.use('/scoot-api/payements',payementRouter);
module.exports = app;