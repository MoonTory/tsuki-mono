import { readdirSync, statSync } from 'fs';
import { join } from 'path';

/**
 * Helper function to get directory names from a specified path, provide a pathName in string format relative to the
 * working directory, to the directory in which you want to parse the folders of.
 * @param pathName: string
 * @returns string[]
 */
export const parseDirFolderNames = (pathName: string): string[] =>
  readdirSync(pathName).filter((dirName: string) => statSync(join(pathName, dirName)).isDirectory());
