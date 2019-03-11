import { Router } from 'express';

import { IController } from '../../../typings';
import { importAllControllers } from '../helpers/importControllers';
import { TsukiDB } from '../../../infra/db';

export class TsukiAPI {
  private static _instance: TsukiAPI;
  private readonly path: string = '/api';
  // private database: TsukiDB.MongoDB;
  public router: Router;

  private constructor(database: TsukiDB.MongoDB) {
    // this.database = database;

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

  public static getInstance(database: TsukiDB.MongoDB): TsukiAPI {
    if (!TsukiAPI._instance) {
      TsukiAPI._instance = new TsukiAPI(database);
    }
    return TsukiAPI._instance;
  }
}
