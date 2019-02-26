/**
 * Node_Module dependencies.
 */
import express, { Application as ExpressApplication, urlencoded, json } from 'express';
import compression from 'compression';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { TsukiHttp } from './server';
import { TsukiAPI } from './api';

export class TsukiServer {
  private static _instance: TsukiServer;
  private http: TsukiHttp;
  private api: TsukiAPI;
  private express: ExpressApplication;
  private config: any;

  private constructor(config: any) {
    this.config = config;
    this.express = express();

    if (this.config.APP_PORT) {
      this.express.set('port', this.config.APP_PORT);
    }

    this.http = TsukiHttp.getInstance(this.config.APP_PORT, this.express);
    this.api = TsukiAPI.getInstance();

    this.init();
  }

  public static getInstance(config: any): TsukiServer {
    if (!TsukiServer._instance) {
      TsukiServer._instance = new TsukiServer(config);
      // ... any one time initialization goes here ...
    }
    return TsukiServer._instance;
  }

  public async listen() {
    await this.http.listen(this.http.port, () => console.log(`Server start @ http://localhost:${this.http.port} ...`));
  }

  private init() {
    this.express.use(helmet());
    this.express.use(cors());
    this.express.use(compression());
    this.express.use(json());
    this.express.use(urlencoded({ extended: false }));
    this.express.use(cookieParser());
    this.express.use(morgan(this.config.NODE_ENV));

    this.express.use(this.api.router);
  }
}
