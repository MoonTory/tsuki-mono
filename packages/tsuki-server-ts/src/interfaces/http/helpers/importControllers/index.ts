import path from 'path';

import { IController } from '../../../../typings/http/controller';
import { parseDirFolderNames } from '../parseDirFolderNames';

export async function importAllControllers(): Promise<IController[]> {
  try {
    const modules: string[] = await parseDirFolderNames('src/interfaces/http/routers/');

    const controllers: IController[] = [];

    modules.forEach(controllerURI => {
      let dirPath: string = 'src/interfaces/http/routers/' + controllerURI;
      let controllerPath: string = path.resolve(dirPath);
      let Controller = require(controllerPath);
      let controller = new Controller.default(controllerURI);
      controllers.push(controller);
    });

    return controllers;
  } catch (error) {
    throw error;
  }
}

export const importController = (controllerUri: string) => {
  try {
    let controllerPath = path.resolve('src/interfaces/http/controllers/', controllerUri);
    let cntrl = require(controllerPath);

    console.log('cntrl', cntrl);

    const controller = new cntrl.default(controllerUri);

    return controller;
  } catch (error) {
    throw error;
  }
};
