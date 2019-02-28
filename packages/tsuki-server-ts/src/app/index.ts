/**
 * Local_Module dependencies.
 */
import { TsukiServer } from '../interfaces/http';
import { TsukiDB } from '../infra/db';
import { IConfig } from '../typings/config';
import { IAppData } from '../typings/app';

// I have refactored this class, and basically stripped it down of most of it's obligations, I am still thinking of how
// to better structure it, maybe thinking about (Domain Driven Design), just a consideration

export class TsukiApplication {
  private data: IAppData;

  constructor(config: IConfig) {
    this.data = {
      config: config,
      database: new TsukiDB.MongoDB(config.MONGO_URI)
    };

    this.init();
  }

  private async init() {
    await this.data.database.connect();
  }

  public async start() {
    const http = TsukiServer.getInstance(this.data);
    await http.init();
  }
}
