import path from 'path';

export default async function createControllerRoutes (modules: string[]): Promise<any> {
  let controllers: any[] = [];

  modules.forEach((controllerUri) => {
    let controllerPath = path.resolve('src/api/controllers/', controllerUri);
    let Controller = require(controllerPath);

    controllers.push(Controller);
  });

  return controllers;
};