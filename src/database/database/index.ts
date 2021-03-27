import mongoose from 'mongoose';

function bancoDados() {
  mongoose.connect(
    'mongodb+srv://open:123456789open@open.jo5wc.mongodb.net/qualicorp?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    },
  );
}

export default bancoDados;
