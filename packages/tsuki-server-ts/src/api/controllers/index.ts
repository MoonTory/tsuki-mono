import { Router, Request, Response, NextFunction } from 'express';

import { BaseController } from './base';

class IndexController extends BaseController {
  public path: string;
  public router: Router;

  constructor() {
    super();
    this.path = '/';
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

export default new IndexController();
