const jwt = require('jsonwebtoken');
const SupervisaoRepository = require('../repositories/SupervisionRepository'); // Repositório para a verificação de supervisão

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

// Função para autorizar supervisores
function authorizeSupervisor(req, res, next) {
    const { tipo_usuario, id: supervisorId } = req.user;
    const { colaborador_id } = req.params; // O ID do colaborador que o supervisor está tentando acessar

    // Verifica se o usuário é um supervisor
    if (tipo_usuario !== 'supervisor') {
        return res.status(403).json({ message: 'Acesso negado. Somente supervisores podem acessar esta funcionalidade.' });
    }

    // Verifica se o supervisor tem permissão para acessar o colaborador
    SupervisaoRepository.isSupervisor(supervisorId, colaborador_id)
        .then(isSupervisor => {
            if (!isSupervisor) {
                return res.status(403).json({ message: 'Você não tem permissão para acessar este colaborador.' });
            }
            next(); // Caso tenha permissão, continua a execução
        })
        .catch(error => res.status(500).json({ message: error.message }));
}

module.exports = { authenticateToken, authorizeRoles, authorizeSupervisor };
