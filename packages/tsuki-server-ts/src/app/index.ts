/**
 * Local_Module dependencies.
 */
import { connectMongo } from '../infra/db/mongo/connectMongo';
import { TsukiServer } from '../interfaces/http';

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
    await http.listen();
  }
}
