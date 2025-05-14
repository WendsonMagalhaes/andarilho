const PointRecordService = require('../services/PointRecordService');

class PointRecordController {
    static async create(req, res) {
        try {
            const { usuario_id, tipo_marcacao, data_hora, latitude, longitude, endereco } = req.body;
            const ponto = await PointRecordService.create(usuario_id, tipo_marcacao, data_hora, latitude, longitude, endereco);
            res.status(201).json(ponto);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    static async listByUserId(req, res) {
        try {
            const { usuario_id } = req.params;
            const pontos = await PointRecordService.listByUserId(usuario_id);
            res.json(pontos);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    static async getById(req, res) {
        try {
            const { id } = req.params;
            const ponto = await PointRecordService.getById(id);
            res.json(ponto);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    static async update(req, res) {
        try {
            const { id } = req.params;
            const { tipo_marcacao, data_hora, latitude, longitude, endereco } = req.body;
            const ponto = await PointRecordService.update(id, tipo_marcacao, data_hora, latitude, longitude, endereco);
            res.json(ponto);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    static async delete(req, res) {
        try {
            const { id } = req.params;
            await PointRecordService.delete(id);
            res.status(204).send();
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    static async getRecordsByDate(req, res) {
        const { usuario_id } = req.params;
        const { data } = req.query; // exemplo: /registros/5?data=2025-04-29

        if (!data) {
            return res.status(400).json({ error: 'A data deve ser informada no formato YYYY-MM-DD.' });
        }

        // Verificar se a data é válida
        const date = new Date(data);
        if (isNaN(date.getTime())) {
            return res.status(400).json({ error: 'Data inválida. Por favor, informe uma data no formato YYYY-MM-DD.' });
        }

        try {
            const registros = await PointRecordService.getRecordsByUserIdAndDate(usuario_id, data);

            // Se não houver registros, retorna array vazio
            if (!registros || registros.length === 0) {
                return res.status(200).json([]);
            }

            return res.status(200).json(registros);
        } catch (error) {
            return res.status(500).json({ error: `Erro ao buscar registros por data: ${error.message}` });
        }
    }


}

module.exports = PointRecordController;
