import { Request, Response, NextFunction } from 'express';

import { IController } from '../../../../typings';

export default class AuthController extends IController {
  constructor(path: string) {
    super(path);
    this.init();
  }

  public async init() {
    this.router.get(this.path + '/register', this.register);
    console.log(this.path + ' Initialized successfully...');
  }

  private register = async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
      debug: `This is the register route @ ${req.baseUrl + req.url}`
    });
  };
}
