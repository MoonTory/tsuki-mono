import { Router, Request, Response, NextFunction } from 'express';

import { IController } from '../../../domain/controller';

class RootController implements IController {
  public path: string;
  public router: Router;

  constructor() {
    this.path = '/';
    this.router = Router();

    this.initializeRoutes();
    console.log(this.path + ' Initialized successfully...');
  }

  public initializeRoutes() {
    this.router.get(this.path, (req: Request, res: Response, next: NextFunction) => {
      res.status(200).json({
        payload: {
          message: `RootController handling ${req.method} to ${req.baseUrl + this.path}`
        }
      });
    });
  }
}
export const controller = new RootController();
