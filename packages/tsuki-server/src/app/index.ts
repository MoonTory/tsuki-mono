import { Application } from 'express';
import { Server as HttpServer } from 'http';

export class App {
  public express: Application;
  public server: HttpServer;
  public port: number;
  
  constructor(express: Application, server: HttpServer, port: number) {
    this.express = express;
    this.server = server;
    this.port = port;

    this.initMiddlewares();
    this.initControllers();
  }

  private initMiddlewares() {  }

  private initControllers() {  }
}