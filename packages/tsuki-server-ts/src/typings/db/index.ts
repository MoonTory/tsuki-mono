import { TsukiDB } from '../../infra/db';

export interface IDatabase {
  database: TsukiDB.MongoDB;
}
