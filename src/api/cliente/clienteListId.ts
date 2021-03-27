import ApiResponseHandler from '../apiResponse';
import ClienteService from '../../services/clienteService';
import verifyJWT from '../../config';

export default async (req, res, next) => {
  let antes = Date.now();
  try {
    verifyJWT(req, res, next);
    console.log('Iniciando requisição de listagem por id!');
    const payload = await new ClienteService().findId(
      req.params.id,
    );
    await ApiResponseHandler.success(req, res, payload);
  } catch (error) {
    await ApiResponseHandler.error(req, res, error);
  }

  let duracao = Date.now() - antes;
  console.log('A requisição demorou ' + duracao + 'ms');
  console.log('');
};
