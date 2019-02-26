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
import { TsukiServer } from '../interfaces/http';
import { TsukiAPI } from '../interfaces/http/api';

/**
 * Configs.
 */

export class TsukiApplication {
  private port?: string | number | boolean = 5005;
  private express: ExpressApplication;
  private api: TsukiAPI = TsukiAPI.getInstance();
  private config: any;

  constructor(config: any, port?: string | number | boolean) {
    this.config = config;
    this.port = port;
    this.express = express();

    if (port) {
      this.express.set('port', port);
    }

    this.init();
  }

  private async init() {
    this.express.use(helmet());
    this.express.use(cors());
    this.express.use(compression());
    this.express.use(json());
    this.express.use(urlencoded({ extended: false }));
    this.express.use(cookieParser());
    this.express.use(morgan(this.config.NODE_ENV));

    await connectMongo(this.config.MONGO_URI);

    this.express.use(this.api.router);
  }

  public async listen(): Promise<void> {
    const http = TsukiServer.getInstance(this.port, this.express);
    await http.listen(this.port, () => console.log(`Server started @ http://localhost:${this.port}`));
  }
}
