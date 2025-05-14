const db = require('../config/database');

class SupervisionRepository {
    // Verifica se o supervisor tem permissão para acessar o colaborador
    static async isSupervisor(supervisor_id, colaborador_id) {
        const result = await db.query(
            'SELECT 1 FROM supervisoes WHERE supervisor_id = $1 AND colaborador_id = $2',
            [supervisor_id, colaborador_id]
        );
        return result.rows.length > 0; // Retorna true se o supervisor for responsável pelo colaborador
    }
}

module.exports = SupervisionRepository;
