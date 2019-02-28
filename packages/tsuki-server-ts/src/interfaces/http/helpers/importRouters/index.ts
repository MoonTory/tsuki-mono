import path from 'path';

import { IRouter } from '../../../../typings/http/router';
import { parseDirFolderNames } from '../parseDirFolderNames';

export const importRouters = async (): Promise<IRouter[]> => {
  try {
    const modules: string[] = await parseDirFolderNames('src/interfaces/http/routers/');

    const routers: IRouter[] = [];

    modules.forEach(routerURI => {
      let dirPath: string = 'src/interfaces/http/routers/' + routerURI;
      let routerPath: string = path.resolve(dirPath);
      let Router = require(routerPath);
      let router = new Router.default(routerURI);
      routers.push(router);
    });

    return routers;
  } catch (error) {
    throw error;
  }
};
