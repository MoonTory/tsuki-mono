import { Router } from 'express';

import { IController } from '../../../typings/http/controller';
import { importAllControllers } from '../helpers/importControllers';

export class TsukiAPI {
  private static _instance: TsukiAPI;
  private readonly path: string = '/api';
  public router: Router;

  private constructor() {
    this.config();
  }

  private async config() {
    this.router = Router();

    this.initialize(await importAllControllers());
  }

  private initialize(controllers: IController[]) {
    controllers.forEach((el: IController) => {
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
