import ApiResponseHandler from '../apiResponse';
import UsuarioService from '../../services/usuarioService';

export default async (req, res, next) => {
  let antes = Date.now();
  try {
    console.log('Iniciando requisição de login!');
    const payload = await new UsuarioService().login(
      req.body,
      res,
    );

    await ApiResponseHandler.success(req, res, payload);
  } catch (error) {
    await ApiResponseHandler.error(req, res, error);
  }
  let duracao = Date.now() - antes;
  console.log('A requisição demorou ' + duracao + 'ms');
  console.log('');
};
