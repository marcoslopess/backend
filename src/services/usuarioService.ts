import UsuarioRepository from '../database/repositories/usuarioRepository';

export default class UsuarioService {
  async create(data, res) {
    try {
      const record = await UsuarioRepository.create(
        data,
        res,
      );
      return record;
    } catch (error) {
      throw error;
    }
  }

  async login(data, res) {
    try {
      const record = await UsuarioRepository.login(
        data,
        res,
      );
      return record;
    } catch (error) {
      throw error;
    }
  }
}
