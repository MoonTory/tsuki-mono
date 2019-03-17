import path from 'path';

import { IController } from '../../../../typings';
import { parseDirFolderNames } from '../parseDirFolderNames';

export const importAllControllers = async (): Promise<IController[]> => {
  try {
    const modules: string[] = await parseDirFolderNames('src/interfaces/http/controllers/');

    const payload: IController[] = [];

    modules.forEach(controllerURI => {
      let dirPath: string = 'src/interfaces/http/controllers/' + controllerURI;
      let resolvedPath: string = path.resolve(dirPath);
      let module = require(resolvedPath);
      let controller = new module.default(controllerURI);
      payload.push(controller);
    });

    return payload;
  } catch (error) {
    throw error;
  }
};

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
