import { Router } from 'express';

import { importRouters } from '../helpers/importRouters';
import { IRouter } from '../../../typings/http/router';

export class TsukiAPI {
  private static _instance: TsukiAPI;
  private readonly path: string = '/api';
  public router: Router;

  private constructor() {
    this.config();
  }

  private async config() {
    this.router = Router();

    this.initialize(await importRouters());
  }

  private initialize(routers: IRouter[]) {
    routers.forEach((el: IRouter) => {
      this.router.use(this.path, el.router);
    });
  }

  public static getInstance(): TsukiAPI {
    if (!TsukiAPI._instance) {
      TsukiAPI._instance = new TsukiAPI();
    }
    return TsukiAPI._instance;
  }
}
