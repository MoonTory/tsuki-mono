import { IConfig } from '../config';
import { TsukiDB } from '../../infra/db';

export type IAppData = {
  config: IConfig;
  database: TsukiDB.MongoDB;
};
