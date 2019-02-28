import { readdirSync, statSync } from 'fs';
import { join } from 'path';

// Helper function to get directory names from a specified path
// @params -> pathName: string
// Provide a pathName in string format to the directory in which you want to parse the folders of.

export const parseDirFolderNames = (pathName: string): string[] =>
  readdirSync(pathName).filter((dirName: string) => statSync(join(pathName, dirName)).isDirectory());
