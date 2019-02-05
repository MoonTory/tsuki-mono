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
import importControllers from '../infra/api/utils/importControllers';
import connectMongo from '../infra/db/mongo/connectMongo';

/**
 * Configs.
 */
import { API_VERSION } from '../config';

class TsukiServer {

  public Express: Application;

  constructor() {
    this.Express = express();

    this.config();
  };

  private async config() {
    console.log('Configuring Express...');
    this.Express.use(helmet());
    this.Express.use(cors());
    this.Express.use(compression());
    this.Express.use(json());
    this.Express.use(urlencoded({ extended: false }));
    this.Express.use(cookieParser());
    this.Express.use(morgan('dev'));

    await connectMongo();
    this.initControllers(await importControllers(['root', 'user']));
  };

  private initControllers(controllers: any[]) {
    console.log('Initialinzing Controllers...');
    controllers.forEach((el: any) => { // el is for Element of the "controllers" array.
      console.log(`Initializing ${el.controller.path} route controller...`);
      this.Express.use(`/api/v${API_VERSION}`, el.controller.router);
    });
  };

}

export default new TsukiServer().Express;
