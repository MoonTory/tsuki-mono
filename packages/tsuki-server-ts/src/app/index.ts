/**
 * Node_Module dependencies.
 */
import express, { Application as ExpressApplication, urlencoded, json } from 'express';
import compression from 'compression';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';

/**
 * Local_Module dependencies.
 */
import { connectMongo } from '../infra/db/mongo/connectMongo';
import { NODE_ENV, MONGO_URI } from '../config';
import { TsukiHTTP } from '../interfaces/http';
import { TsukiAPI } from '../interfaces/api';

/**
 * Configs.
 */

export class TsukiServer {
  private port?: string | number | boolean = 5005;
  private Express: ExpressApplication;
  private api: TsukiAPI = TsukiAPI.getInstance();

  constructor(port?: string | number | boolean) {
    this.port = port;
    this.Express = express();

    if (port) {
      this.Express.set('port', port);
    }

    this.config();
  }

  private async config() {
    this.Express.use(helmet());
    this.Express.use(cors());
    this.Express.use(compression());
    this.Express.use(json());
    this.Express.use(urlencoded({ extended: false }));
    this.Express.use(cookieParser());
    this.Express.use(morgan(NODE_ENV));

    await connectMongo(MONGO_URI);

    this.Express.use(this.api.router);
  }

  public async listen(): Promise<void> {
    const http = TsukiHTTP.getInstance(this.port, this.Express);
    await http.listen(this.port, () => console.log(`Server started @ http://localhost:${this.port}`));
  }
}
