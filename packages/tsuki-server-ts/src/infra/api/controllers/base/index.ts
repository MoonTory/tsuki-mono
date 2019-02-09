import { Router } from 'express'

export abstract class BaseController {
  path: string;
  router: Router;

  public abstract initializeRoutes(): void;
}