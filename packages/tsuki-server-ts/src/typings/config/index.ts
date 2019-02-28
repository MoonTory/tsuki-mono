export interface IConfig {
  API_VERSION: string | number;
  APP_PORT: string | number;
  NODE_ENV: string;
  DB_USER?: string;
  DB_PASS?: string;
  DB_HOST?: string;
  DB_PORT?: string;
  DB_NAME?: string;
  MONGO_URI: string;
}
