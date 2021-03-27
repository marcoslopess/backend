export default class ApiResponseHandler {
  static async success(req, res, payload) {
    console.log('');
    console.log('Requisição finalizada!');
    console.log('');
    if (payload !== undefined) {
      res.status(200).send(payload);
    } else {
      res.sendStatus(200);
    }
  }

  static async error(req, res, error) {
    console.log('Requisição finalizada!');
    if (
      error &&
      [400, 401, 403, 404].includes(error.code)
    ) {
      console.error(error);
      res.status(error.code).send(error.message);
    } else {
      console.error(error);
      res.status(500).send(error.message);
    }
  }
}
