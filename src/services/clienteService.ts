import ClienteRepository from '../database/repositories/clienteRepository';

export default class ClienteService {
  async findAll() {
    return ClienteRepository.findAll();
  }

  async findId(id) {
    return ClienteRepository.findId(id);
  }

  async deleteById(id) {
    return ClienteRepository.delete(id);
  }

  async create(data, res) {
    try {
      const record = await ClienteRepository.create(
        data,
        res,
      );
      return record;
    } catch (error) {
      throw error;
    }
  }

  async update(id, data, res) {
    try {
      const record = await ClienteRepository.update(
        id,
        data,
        res,
      );
      return record;
    } catch (error) {
      throw error;
    }
  }
}
