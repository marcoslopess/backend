export default (app) => {
  app.post(
    `/usuario/create`,
    require('./usuarioCreate').default,
  );
  app.post(
    `/usuario/login`,
    require('./usuarioLogin').default,
  );
};
