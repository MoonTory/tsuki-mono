import { Router, Request, Response, NextFunction } from 'express';

import { IRouter } from '../../../../domain/http/router';
import { IController } from '../../../../domain/http/controller';
// import { importRouters } from '../../../infra/utils/importRouters';

export default class AuthRouter implements IRouter {
  public path: string;
  public router: Router;
  public controllers: IController[];

  constructor(path: string) {
    this.path = '/' + path;
    this.router = Router();

    this.init();
  }

  private async init() {
    this.router.get(this.path, (req: Request, res: Response, next: NextFunction) => {
      res.status(200).json({
        message: 'Initialized Successfully!'
      });
    });
  }
}
