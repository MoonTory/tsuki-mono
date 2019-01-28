import express, { Application, urlencoded, json } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';

class TsukiServer {

  public Express: Application;

  constructor() {
    this.Express = express();

    this.config();
    this.initControllers();
  };

  private config(): void {
    console.log('Configuring Express...');
    this.Express.use(helmet());
    this.Express.use(cors());
    this.Express.use(json());
    this.Express.use(urlencoded({ extended: false }));
    this.Express.use(cookieParser());
    this.Express.use(morgan('dev'));
  };

  private initControllers(): void {
    console.log('Initialinzing Controllers...');
  };

}

export default new TsukiServer().Express;
