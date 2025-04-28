const db = require('../config/database');

class UserRepository {
    static async create(nome, email, senha, tipo_usuario) {
        const result = await db.query(
            'INSERT INTO usuarios (nome, email, senha, tipo_usuario) VALUES ($1, $2, $3, $4) RETURNING *',
            [nome, email, senha, tipo_usuario]
        );
        return result.rows[0];
    }

    static async findByEmail(email) {
        const result = await db.query(
            'SELECT * FROM usuarios WHERE email = $1',
            [email]
        );
        return result.rows[0];
    }

    static async findById(id) {
        const result = await db.query(
            'SELECT * FROM usuarios WHERE id = $1',
            [id]
        );
        return result.rows[0];
    }

    static async findAll() {
        const result = await db.query('SELECT id, nome, email, tipo_usuario, criado_em FROM usuarios');
        return result.rows;
    }

    static async updateName(id, novoNome) {
        const result = await db.query(
            'UPDATE usuarios SET nome = $1 WHERE id = $2 RETURNING *',
            [novoNome, id]
        );
        return result.rows[0];
    }

    static async updatePassword(id, novaSenha) {
        const result = await db.query(
            'UPDATE usuarios SET senha = $1 WHERE id = $2 RETURNING *',
            [novaSenha, id]
        );
        return result.rows[0];
    }

    static async updateUserType(id, novoTipo) {
        const result = await db.query(
            'UPDATE usuarios SET tipo_usuario = $1 WHERE id = $2 RETURNING *',
            [novoTipo, id]
        );
        return result.rows[0];
    }

    static async delete(id) {
        await db.query('DELETE FROM usuarios WHERE id = $1', [id]);
    }
}

module.exports = UserRepository;
