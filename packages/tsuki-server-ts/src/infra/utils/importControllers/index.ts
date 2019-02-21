import path from 'path';
import { BaseController } from '../../../domain/controller';

export default async function createControllerRoutes(modules: string[]): Promise<BaseController[]> {
  try {
    const controllers: BaseController[] = [];

    modules.forEach(controllerUri => {
      let controllerPath = path.resolve('src/interfaces/controllers/', controllerUri);
      let controller: BaseController = require(controllerPath);

      controllers.push(controller);
    });

    return controllers;
  } catch (error) {
    throw error;
  }
}
