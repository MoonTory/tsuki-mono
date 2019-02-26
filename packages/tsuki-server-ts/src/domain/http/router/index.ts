import { Router } from 'express';
import { IController } from '../controller';

export interface IRouter {
  path: string;
  router: Router;
  controllers: IController[];
}
