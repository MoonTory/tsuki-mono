import { Router, Request, Response, NextFunction } from 'express';

import { BaseController } from '../../controllers/base';
import { UserModel } from '../../../infra/db/models/user';


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
    try {
      const newUser = new UserModel({ name: 'John Doe' });
      await newUser.save();

      this.router.get(this.path, (req: Request, res: Response, next: NextFunction) => {
        res.status(200).json({
          payload: {
            message: `handling ${req.method} to ${req.baseUrl + this.path}`,
            user: newUser
          }
        });
      });
    } catch (error) {
      throw error;
    }

  }
}

export default new UserController();