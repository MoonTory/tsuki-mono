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
import importControllers from '../api/utils/create-controllers';
import connectMongo from '../infra/db/mongo/connect-mongo';

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
    this.initControllers(await importControllers(['index', 'user']));
  };

  private initControllers(controllers: any) {
    console.log('Initialinzing Controllers...');
    controllers.forEach((controller: any) => {
      console.log(`Initializing ${controller.default.path} route controller...`);
      this.Express.use(`/api/v${API_VERSION}`, controller.default.router);
    });
  };

}

export default new TsukiServer().Express;
