import { Router, Request, Response, NextFunction } from 'express';

import { IController } from '../../../domain/controller';

class AuthController implements IController {
  public path: string;
  public router: Router;

  constructor() {
    this.path = '/auth';
    this.router = Router();

    this.initializeRoutes();
    console.log(this.path + ' Initialized successfully...');
  }

  public initializeRoutes() {
    this.router.post(`/register`, (req: Request, res: Response, next: NextFunction) => {
      res.status(200).json({
        payload: {
          message: `AuthController handling ${req.method} to ${req.baseUrl + this.path}`
        }
      });
    });
  }
}
export const controller = new AuthController();
