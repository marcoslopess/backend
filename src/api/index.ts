import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import bancoDados from '../database/database';
const app = express();

bancoDados();

app.use(cors({ origin: true }));

app.use(helmet());

app.use(
  bodyParser.json({
    limit: '50mb',
    extended: true,
    verify: function (req, res, buf) {
      const url = (<any>req).originalUrl;
    },
  }),
);

const routes = express.Router();

require('./usuario').default(routes);
require('./cliente').default(routes);

app.use('/api', routes);

export default app;
