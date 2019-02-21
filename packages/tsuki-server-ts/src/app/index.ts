/**
 * Node_Module dependencies.
 */
import express, { Application, urlencoded, json } from 'express';
import compression from 'compression';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';

/**
 * Local_Module dependencies.
 */
import importControllers from '../infra/utils/importControllers';
import connectMongo from '../infra/db/mongo/connectMongo';
import { NODE_ENV } from '../config';

/**
 * Configs.
 */

class TsukiServer {
  public Express: Application;

  constructor() {
    this.Express = express();

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

    await connectMongo();
    this.initControllers(await importControllers(['root', 'user', 'auth']));
  }

  private initControllers(controllers: any[]) {
    controllers.forEach((el: any) => {
      // I can also use this time to inject depencies to the controllers
      // el is the index for the "controllers" array.
      this.Express.use(el.controller.router);
    });
  }
}

export default new TsukiServer().Express;
