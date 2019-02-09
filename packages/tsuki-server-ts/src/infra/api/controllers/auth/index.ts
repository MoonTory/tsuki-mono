import { Router, Request, Response, NextFunction } from 'express';

import { BaseController } from '../base';

class AuthController extends BaseController {
  public path: string;
  public router: Router;

  constructor() {
    super();
    this.path = '/auth';
    this.router = Router();

    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.router.post(`${this.path}/register`, (req: Request, res: Response, next: NextFunction) => {
      res.status(200).json({
        payload: {
          message: `RootController handling ${req.method} to ${req.baseUrl + this.path}`
        }
      });
    });
  }
}
export const controller = new AuthController();
