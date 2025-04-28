const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Espera 'Bearer <token>'

    if (!token) return res.status(401).json({ message: 'Token não fornecido.' });

    jwt.verify(token, process.env.SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: 'Token inválido ou expirado.' });

        req.user = user; // Salva o usuário na requisição
        next();
    });
}

function authorizeRoles(...allowedRoles) {
    return (req, res, next) => {
        const { tipo_usuario } = req.user;

        if (!allowedRoles.includes(tipo_usuario)) {
            return res.status(403).json({ message: 'Acesso não autorizado.' });
        }

        next();
    };
}

module.exports = { authenticateToken, authorizeRoles };
