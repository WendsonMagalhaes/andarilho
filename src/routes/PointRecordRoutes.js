const express = require('express');
const PointRecordController = require('../controllers/PointRecordController');
const { authenticateToken, authorizeSupervisor } = require('../middlewares/authMiddleware');

const router = express.Router();

// Rotas protegidas para registrar o ponto
router.post('/registrar-ponto', authenticateToken, PointRecordController.create);
router.get('/:usuario_id', authenticateToken, PointRecordController.listByUserId);
router.get('/id/:id', authenticateToken, PointRecordController.getById);
router.patch('/:id', authenticateToken, PointRecordController.update);
router.delete('/:id', authenticateToken, PointRecordController.delete);
router.get('/registros/:usuario_id', PointRecordController.getRecordsByDate);


// Rota para supervisores acessarem os registros de ponto dos colaboradores sob sua responsabilidade
router.get('/supervisor/:colaborador_id', authenticateToken, authorizeSupervisor, PointRecordController.listByUserId);

module.exports = router;
