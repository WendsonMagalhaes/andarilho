const express = require('express');
const UserController = require('../controllers/UserController');
const { authenticateToken, authorizeRoles } = require('../middlewares/authMiddleware');

const router = express.Router();

// Rotas públicas
router.post('/usuarios', UserController.register);
router.post('/login', UserController.login);

// Rotas protegidas
router.get('/usuarios', authenticateToken, authorizeRoles('admin', 'supervisor'), UserController.list);
router.patch('/usuarios/:id/nome', authenticateToken, authorizeRoles('admin', 'supervisor'), UserController.changeName);
router.patch('/usuarios/:id/senha', authenticateToken, UserController.changePassword); // O próprio usuário pode trocar a senha
router.patch('/usuarios/:id/tipo', authenticateToken, authorizeRoles('admin'), UserController.changeUserType);
router.delete('/usuarios/:id', authenticateToken, authorizeRoles('admin'), UserController.delete);

module.exports = router;
