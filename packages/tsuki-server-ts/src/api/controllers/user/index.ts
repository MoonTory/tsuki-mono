import { Router, Request, Response, NextFunction } from 'express';

import { BaseController } from '../../controllers/base';

class UserController extends BaseController {
  public path: string;
  public router: Router;

  constructor() {
    super();
    this.path = '/user';
    this.router = Router();

    this.initializeRoutes();
  }

  protected initializeRoutes() {
    this.router.get(this.path, (req: Request, res: Response, next: NextFunction) => {
      res.status(200).json({
        payload: {
          message: `handling ${req.method} to ${req.baseUrl + this.path}`
        }
      });
    });
  }
}

export default new UserController();