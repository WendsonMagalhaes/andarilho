const PointRecordRepository = require('../repositories/PointRecordRepository');

class PointRecordService {
    static async create(usuario_id, tipo_marcacao, data_hora, latitude, longitude, endereco) {
        const ponto = await PointRecordRepository.create(usuario_id, tipo_marcacao, data_hora, latitude, longitude, endereco);
        return ponto;
    }

    static async listByUserId(usuario_id) {
        const pontos = await PointRecordRepository.findByUserId(usuario_id);
        return pontos;
    }

    static async getById(id) {
        const ponto = await PointRecordRepository.findById(id);
        return ponto;
    }

    static async update(id, tipo_marcacao, data_hora, latitude, longitude, endereco) {
        const ponto = await PointRecordRepository.update(id, tipo_marcacao, data_hora, latitude, longitude, endereco);
        return ponto;
    }

    static async delete(id) {
        await PointRecordRepository.delete(id);
    }

    static async getRecordsByUserIdAndDate(usuario_id, data) {
        try {
            return await PointRecordRepository.findByUserIdAndDate(usuario_id, data);
        } catch (error) {
            throw new Error('Erro ao buscar registros por data: ' + error.message);
        }
    }
}

module.exports = PointRecordService;
