import { Router, Request, Response, NextFunction } from 'express';

import { IRouter } from '../../../domain/router';
// import { IController } from '../../../domain/controller';
// import { importRouters } from '../../../infra/utils/importRouters';

export default class AuthRouter implements IRouter {
  private path: string;
  // private controllers: IController[];
  public router: Router;

  constructor(path: string) {
    this.path = '/' + path;
    this.router = Router();

    this.config();
  }

  private async config() {
    // this.controllers = await importRouters();

    // console.log('this.controllers', this.controllers);

    this.router.get(this.path, (req: Request, res: Response, next: NextFunction) => {
      res.status(200).json({
        message: 'Initialized Successfully!'
      });
    });
  }
}
