import { readdirSync, statSync } from 'fs';
import path, { join } from 'path';

import { IRouter } from '../../../../domain/http//router';

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

// Helper function to get directory names from a specified path
// @params -> pathName: string
// Provide a pathName in string format to the directory in which you want to parse the folders of.

const parseDirFolderNames = (pathName: string): string[] =>
  readdirSync(pathName).filter((dirName: string) => statSync(join(pathName, dirName)).isDirectory());
