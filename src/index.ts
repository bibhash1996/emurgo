require('dotenv').config();

import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import './utils/response/customSuccess';
import { errorHandler } from './middleWare/errorHandler';
import mw from './middleWare/util';
import routes from './routes';
import Logger, { ExpressLogger } from "./logger";
import { initialise } from './init';

export const app = express();

app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(mw.assignRequestId);
app.use(ExpressLogger);

app.use('/api', routes);

app.use(errorHandler);

initialise()
    .then((v) => {
        app.listen(8080, '0.0.0.0', 511, () => {
            Logger.info(`Server running on port 8080`);
        });
    })
    .catch((err) => {
        Logger.error(err);
    });
