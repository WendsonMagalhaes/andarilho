const UserService = require('../services/UserService');

class UserController {
    static async register(req, res) {
        try {
            const { nome, email, senha, tipo_usuario } = req.body;
            const user = await UserService.register(nome, email, senha, tipo_usuario);
            res.status(201).json(user);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    static async login(req, res) {
        try {
            const { email, senha } = req.body;
            const data = await UserService.login(email, senha);
            res.json(data);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    static async list(req, res) {
        try {
            const users = await UserService.listAll();
            res.json(users);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    static async changeName(req, res) {
        try {
            const { id } = req.params;
            const { novoNome } = req.body;
            const user = await UserService.changeName(id, novoNome);
            res.json(user);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    static async changePassword(req, res) {
        try {
            const { id } = req.params;
            const { senhaAtual, novaSenha } = req.body;
            const user = await UserService.changePassword(id, senhaAtual, novaSenha);
            res.json(user);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    static async changeUserType(req, res) {
        try {
            const { id } = req.params;
            const { novoTipo } = req.body;
            const user = await UserService.changeUserType(id, novoTipo);
            res.json(user);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    static async delete(req, res) {
        try {
            const { id } = req.params;
            await UserService.deleteUser(id);
            res.status(204).send();
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}

module.exports = UserController;
