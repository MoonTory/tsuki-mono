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
import importControllers from '../infra/utils/importControllers';
import connectMongo from '../infra/db/mongo/connectMongo';
import { NODE_ENV } from '../config';
import { IController } from '../domain/controller';
import { TsukiHTTP } from '../interfaces/http';

/**
 * Configs.
 */

export class TsukiServer {
  private port?: string | number | boolean = 5005;
  public Express: ExpressApplication;

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

    await connectMongo();
    this.initControllers(await importControllers(['root', 'user', 'auth']));
  }

  private initControllers(controllers: IController[]) {
    controllers.forEach((el: any) => {
      // I can also use this time to inject other depencies to the controllers
      // el is the index for the "controllers" array.
      this.Express.use(el.controller.router);
    });
  }

  public async listen(): Promise<void> {
    const http = TsukiHTTP.getInstance(this.port, this.Express);
    await http.listen(this.port, () => console.log(`Server started @ http://localhost:${this.port}`));
  }
}
