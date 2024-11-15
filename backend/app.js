const express = require('express');
const bodyParser = require('body-parser');
const payementRouter = require('./routes/payementRouter');
const app = express();

/// Autoriser les appels de toutes origines
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

/// Traiter les requetes json
app.use(express.json());
app.use(bodyParser.json());

/// Utiliser le payement router pour les requetes du scoot-api/payements
app.post('/scoot-api/payements',payementRouter);


module.exports = app;