const express = require('express');
const userRoutes = require('./UserRoutes');
const pontoRoutes = require('./PointRecordRoutes');

const router = express.Router();

// Definindo as rotas para usuários
router.use('/usuarios', userRoutes);

// Definindo as rotas para registros de ponto
router.use('/registros-ponto', pontoRoutes);

module.exports = router;
