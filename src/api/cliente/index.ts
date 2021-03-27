export default (app) => {
  app.get(`/cliente`, require('./clienteListAll').default);
  app.get(
    `/cliente/:id`,
    require('./clienteListId').default,
  );
  app.delete(
    `/cliente/:id`,
    require('./clienteDeleteId').default,
  );
  app.post(`/cliente`, require('./clienteCreate').default);
  app.put(
    `/cliente/:id`,
    require('./clienteUpdate').default,
  );
};
