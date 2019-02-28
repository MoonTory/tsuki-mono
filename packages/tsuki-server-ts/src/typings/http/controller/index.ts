import { Router } from 'express';

export abstract class IController {
  protected path: string;
  public router: Router;

  constructor(path: string) {
    this.path = '/' + path;
    this.router = Router();
  }
}
