/**
 * Node_Module dependencies.
 */
import express, { urlencoded, json } from 'express';
import compression from 'compression';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { TsukiHttp } from './server';
import { TsukiAPI } from './api';
import { IConfig, IAppData } from '../../typings';

export class TsukiServer {
  private static _instance: TsukiServer;
  private _http: TsukiHttp;
  private _api: TsukiAPI;
  private _express: express.Application;
  private _config: IConfig;

  private constructor({ config, database }: IAppData) {
    this._config = config;
    this._express = express();

    if (this._config.APP_PORT) { this._express.set('port', this._config.APP_PORT); }
    
    this._http = TsukiHttp.getInstance(this._config.APP_PORT, this._express);
    this._api = TsukiAPI.getInstance(database);
  }

  public static getInstance(appData: IAppData): TsukiServer {
    if (!TsukiServer._instance) {
      TsukiServer._instance = new TsukiServer(appData);
      // ... any one time initialization goes here ...
    }
    return TsukiServer._instance;
  }

  private async listen() {
    await this._http.listen(this._http.port(), () =>
      console.log(`Server start @ http://localhost:${this._http.port()} ...`)
    );
  }

  public async init() {
    this._express.use(helmet());
    this._express.use(cors());
    this._express.use(compression());
    this._express.use(json());
    this._express.use(urlencoded({ extended: false }));
    this._express.use(cookieParser());
    this._express.use(morgan(this._config.NODE_ENV));

    this._express.use(this._api.router);

    await this.listen();
  }
}
