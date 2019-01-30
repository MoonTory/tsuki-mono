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
      this.router.get(this.path, async (req: Request, res: Response, next: NextFunction) => {
        const newUser = new UserModel({
          method: 'local',
          username: 'admin',
          email: 'gustavoqnt40@gmail.com',
          password: 'admin'
        });
        await newUser.save();

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