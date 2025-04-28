const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserRepository = require('../repositories/UserRepository');

class UserService {
    static async register(nome, email, senha, tipo_usuario) {
        const existingUser = await UserRepository.findByEmail(email);
        if (existingUser) {
            throw new Error('Email já cadastrado.');
        }

        const hashedPassword = await bcrypt.hash(senha, 8);
        return await UserRepository.create(nome, email, hashedPassword, tipo_usuario);
    }

    static async login(email, senha) {
        const user = await UserRepository.findByEmail(email);
        if (!user) {
            throw new Error('Usuário não encontrado.');
        }

        const passwordMatch = await bcrypt.compare(senha, user.senha);
        if (!passwordMatch) {
            throw new Error('Senha incorreta.');
        }

        const token = jwt.sign(
            { id: user.id, tipo_usuario: user.tipo_usuario },
            process.env.SECRET,
            { expiresIn: '8h' }
        );

        return { token, user: { id: user.id, nome: user.nome, email: user.email, tipo_usuario: user.tipo_usuario } };
    }

    static async listAll() {
        return await UserRepository.findAll();
    }

    static async changeName(id, novoNome) {
        return await UserRepository.updateName(id, novoNome);
    }

    static async changePassword(id, senhaAtual, novaSenha) {
        const user = await UserRepository.findById(id);
        const passwordMatch = await bcrypt.compare(senhaAtual, user.senha);
        if (!passwordMatch) {
            throw new Error('Senha atual incorreta.');
        }
        const hashedNewPassword = await bcrypt.hash(novaSenha, 8);
        return await UserRepository.updatePassword(id, hashedNewPassword);
    }

    static async changeUserType(id, novoTipo) {
        const validTypes = ['admin', 'supervisor', 'colaborador'];
        if (!validTypes.includes(novoTipo)) {
            throw new Error('Tipo de usuário inválido.');
        }
        return await UserRepository.updateUserType(id, novoTipo);
    }

    static async deleteUser(id) {
        await UserRepository.delete(id);
    }
}

module.exports = UserService;
