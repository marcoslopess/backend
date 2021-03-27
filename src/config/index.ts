import jwt from 'jsonwebtoken';
import Usuario from '../database/models/usuario';
require('dotenv').config();

async function verifyJWT(req, res, next) {
  const token = req.headers.authorization.split(
    'Bearer ',
  )[1];

  if (!token)
    return res.status(401).json({
      auth: false,
      message: 'Nenhum token fornecido.',
    });

  await jwt.verify(
    token,
    process.env.SECRET,
    async (err, decoded) => {
      if (err)
        return res.status(500).json({
          auth: false,
          message: 'Falha ao autenticar o token.',
        });
    },
  );
}

export default verifyJWT;
