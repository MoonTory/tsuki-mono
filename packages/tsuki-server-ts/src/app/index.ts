/**
 * Local_Module dependencies.
 */
import { connectMongo } from '../infra/db/mongo/connectMongo';
import { TsukiServer } from '../interfaces/http';

// I have refactored this class, and basically stripped it down of most of it's obligations, I am still thinking of how
// to better structure it, maybe thinking about (Domain Driven Design), just a consideration

export class TsukiApplication {
  private config: any;

  constructor(config: any) {
    this.config = config;

    this.init();
  }

  private async init() {
    await connectMongo(this.config.MONGO_URI);
  }

  public async start(): Promise<void> {
    const http = TsukiServer.getInstance(this.config);
    await http.init();
  }
}
