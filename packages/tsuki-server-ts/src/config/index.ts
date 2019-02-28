import * as env from './env';
import { IConfig } from '../typings/config';

export const config: IConfig = {
  API_VERSION: env.API_VERSION,
  APP_PORT: env.APP_PORT,
  NODE_ENV: env.NODE_ENV,
  DB_USER: env.DB_USER,
  DB_PASS: env.DB_PASS,
  DB_HOST: env.DB_HOST,
  DB_PORT: env.DB_PORT,
  DB_NAME: env.DB_NAME,
  MONGO_URI: env.MONGO_URI
};
