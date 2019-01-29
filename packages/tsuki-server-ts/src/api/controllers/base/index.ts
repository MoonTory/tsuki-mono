import { Router } from 'express'

export abstract class BaseController {
  path: string;
  router: Router;

  protected abstract initializeRoutes(): void;
}