import { Router, Request, Response, NextFunction } from 'express';

import { BaseController } from '../base';
// import { UserModel } from '../../../../infra/db/models/user';


class UserController extends BaseController {
  public path: string;
  public router: Router;

  constructor() {
    super();
    this.path = '/user';
    this.router = Router();

    this.initializeRoutes();
  }

  protected async initializeRoutes() {

    this.router.get(this.path, async (req: Request, res: Response, next: NextFunction) => {
      
    res.status(200).json({
        payload: {
          message: `handling ${req.method} to ${req.baseUrl + this.path}`
        }
      });
    });
  }
}
export const controller = new UserController();
