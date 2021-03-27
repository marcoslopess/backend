import Cliente from '../models/cliente';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

class ClienteRepository {
  static async create(data, res) {
    let existe = await Cliente.exists({
      email: data.email,
    });
    if (existe === true) {
      return { message: 'Cliente já existe' };
    } else {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(data.senha, salt);
      const date = Date.now();
      const cliente = await new Cliente({
        idCliente: new mongoose.Types.ObjectId(),
        email: data.email,
        nome: data.nome,
        senha: hash,
        dateCreate: date.toString(),
      });
      let retorno;
      await cliente
        .save()
        .then(async (result) => {
          let resultado = {
            id: result.id,
            email: result.email,
            nome: result.nome,
            dateCreate: result.dateCreate,
          };
          retorno = {
            message: 'Cliente criado com sucesso!',
            resultado,
          };
        })
        .catch((err) => {
          throw new Error(err);
        });

      return retorno;
    }
  }

  static async update(id, data, res) {
    let retorno;
    if (data.senha !== undefined && data.senha !== '') {
      const salt = bcrypt.genSaltSync(10);
      data.senha = bcrypt.hashSync(data.senha, salt);
    }
    data.dateUpdate = Date.now();
    await Cliente.findOneAndUpdate(id, data, { new: true })
      .exec()
      .then(async (doc) => {
        let resultado = {
          id: doc.id,
          email: doc.email,
          nome: doc.nome,
          dateCreate: doc.dateCreate,
          dateUpdate: doc.dateUpdate,
        };
        retorno = {
          message: 'Cliente atualizado com sucesso!',
          resultado,
        };
      })
      .catch((err) => {
        throw new Error(err);
      });

    return retorno;
  }

  static async delete(id) {
    console.log(id);

    let retorno;
    await Cliente.deleteOne({ id: id })
      .exec()
      .then((doc) => {
        retorno = {
          message: 'Cliente deletado com sucesso!',
        };
      })
      .catch((err) => {
        throw new Error(err);
      });

    return retorno;
  }

  static async findId(id) {
    let cliente;
    await Cliente.findById(id)
      .exec()
      .then(async (result) => {
        cliente = await result;
      })
      .catch((err) => {
        throw new Error(err);
      });

    return cliente;
  }

  static async findAll() {
    let cliente;
    await Cliente.find({})
      .exec()
      .then(async (result) => {
        cliente = await result;
      })
      .catch((err) => {
        throw new Error(err);
      });

    return cliente;
  }
}

export default ClienteRepository;
