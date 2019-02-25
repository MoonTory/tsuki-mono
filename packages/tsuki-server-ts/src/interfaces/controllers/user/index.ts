import { Router, Request, Response, NextFunction } from 'express';

import { IController } from '../../../domain/controller';
// import { UserModel } from '../../../../infra/db/models/user';

class UserController implements IController {
  public path: string;
  public router: Router;

  constructor() {
    this.path = '/user';
    this.router = Router();

    this.initializeRoutes();
    console.log(this.path + ' Initialized successfully...');
  }

  public async initializeRoutes() {
    this.router.get(this.path, async (req: Request, res: Response, next: NextFunction) => {
      res.status(200).json({
        payload: {
          message: `UserController handling ${req.method} to ${req.baseUrl + this.path}`
        }
      });
    });
  }
}
export const controller = new UserController();
