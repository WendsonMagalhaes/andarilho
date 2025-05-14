const db = require('../config/database');

class PointRecordRepository {
    static async create(usuario_id, tipo_marcacao, data_hora, latitude, longitude, endereco) {
        const result = await db.query(
            'INSERT INTO registros_ponto (usuario_id, tipo_marcacao, data_hora, latitude, longitude, endereco) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [usuario_id, tipo_marcacao, data_hora, latitude, longitude, endereco]
        );
        return result.rows[0];
    }

    static async findByUserId(usuario_id) {
        const result = await db.query(
            'SELECT * FROM registros_ponto WHERE usuario_id = $1 ORDER BY data_hora DESC',
            [usuario_id]
        );
        return result.rows;
    }

    static async findById(id) {
        const result = await db.query(
            'SELECT * FROM registros_ponto WHERE id = $1',
            [id]
        );
        return result.rows[0];
    }

    static async update(id, tipo_marcacao, data_hora, latitude, longitude, endereco) {
        const result = await db.query(
            'UPDATE registros_ponto SET tipo_marcacao = $1, data_hora = $2, latitude = $3, longitude = $4, endereco = $5 WHERE id = $6 RETURNING *',
            [tipo_marcacao, data_hora, latitude, longitude, endereco, id]
        );
        return result.rows[0];
    }

    static async delete(id) {
        await db.query('DELETE FROM registros_ponto WHERE id = $1', [id]);
    }
    static async findByUserIdAndDate(usuario_id, data) {
        const result = await db.query(
            `SELECT * FROM registros_ponto 
             WHERE usuario_id = $1 AND data_hora::date = $2
             ORDER BY data_hora ASC`,
            [usuario_id, data]
        );
        return result.rows;
    }

}

module.exports = PointRecordRepository;
