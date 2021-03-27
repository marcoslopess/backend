import mongoose from 'mongoose';

const clienteSchema = new mongoose.Schema({
  nome: String,
  email: String,
  senha: String,
  dateCreate: { type: Date },
  dateUpdate: { type: Date },
});

let Cliente = mongoose.model('Cliente', clienteSchema);

export default Cliente;
