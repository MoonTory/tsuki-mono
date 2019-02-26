import { Router } from 'express';

import { importRouters } from '../../infra/utils/importRouters';
import { IRouter } from '../../domain/router';

export class TsukiAPI {
  private static _instance: TsukiAPI;
  private path: string;
  public router: Router;

  private constructor() {
    this.config();
  }

  private async config(): Promise<void> {
    this.path = '/api';
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
      // ... any one time initialization goes here ...
    }
    return TsukiAPI._instance;
  }
}
