const express = require('express');
const UserController = require('../controllers/UserController');
const { authenticateToken, authorizeRoles } = require('../middlewares/authMiddleware');

const router = express.Router();

// Rotas públicas
router.post('/usuario', UserController.register);
router.post('/login', UserController.login);

// Rotas protegidas
router.get('/', authenticateToken, authorizeRoles('admin', 'supervisor'), UserController.list);
router.patch('/:id/nome', authenticateToken, authorizeRoles('admin', 'supervisor'), UserController.changeName);
router.patch('/:id/senha', authenticateToken, UserController.changePassword); // O próprio usuário pode trocar a senha
router.patch('/:id/tipo', authenticateToken, authorizeRoles('admin'), UserController.changeUserType);
router.delete('/:id', authenticateToken, authorizeRoles('admin'), UserController.delete);

module.exports = router;
