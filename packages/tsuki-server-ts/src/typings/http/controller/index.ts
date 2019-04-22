import { Router } from 'express';

export abstract class IController {
  protected _path: string;
  public router: Router;

  constructor(path: string) {
    this._path = '/' + path;
    this.router = Router();
  }
}
