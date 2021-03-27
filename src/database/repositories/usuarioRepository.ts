import Usuario from '../models/usuario';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
require('dotenv').config();

class UsuarioRepository {
  static async create(data, res) {
    let existe = await Usuario.exists({
      email: data.email,
    });
    if (existe === true) {
      return { message: 'Usuario já existe' };
    } else {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(data.senha, salt);
      const date = Date.now();
      const usuario = await new Usuario({
        idUsuario: new mongoose.Types.ObjectId(),
        email: data.email,
        nome: data.nome,
        senha: hash,
        dateCreate: date.toString(),
      });
      let retorno;
      await usuario
        .save()
        .then(async (result) => {
          let resultado = {
            id: result.id,
            email: result.email,
            nome: result.nome,
            dateCreate: result.dateCreate,
          };
          retorno = {
            message: 'Usuario criado com sucesso!',
            resultado,
          };
        })
        .catch((err) => {
          throw new Error(err);
        });

      return retorno;
    }
  }

  static async login(data, res) {
    let resposta;
    let usuario = await Usuario.findOne({})
      .where({ email: data.email })
      .then(async (res) => {
        const passwordsMatch = await bcrypt.compareSync(
          data.senha,
          res.senha,
        );
        if (passwordsMatch === false) {
          resposta = {
            message: 'Usuario ou senha invalidos!',
          };
        } else {
          let id = res.id;
          let token = await jwt.sign(
            { id },
            process.env.SECRET,
            {
              expiresIn: 86400, // expires in 5min
            },
          );
          res.token = token;

          let resultado = {
            id: res.id,
            email: res.email,
            nome: res.nome,
            dateCreate: res.dateCreate,
          };
          await res.save().then(async (res) => {
            resposta = {
              auth: true,
              token: token,
              resultado,
            };
          });
        }
      });

    return resposta;
  }
}

export default UsuarioRepository;
