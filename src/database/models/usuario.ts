import mongoose from 'mongoose';

const usuarioSchema = new mongoose.Schema({
  nome: String,
  email: String,
  senha: String,
  token: String,
  dateCreate: { type: Date },
});

let Usuario = mongoose.model('Usuario', usuarioSchema);

export default Usuario;
