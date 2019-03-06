import { IConfig } from '../config';
import { TsukiDB } from '../../infra/db';

export interface IAppData {
  config: IConfig;
  database: TsukiDB.MongoDB;
}
