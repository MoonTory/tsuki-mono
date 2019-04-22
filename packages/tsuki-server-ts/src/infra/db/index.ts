import { connectMongo } from './mongo/connectMongo';

export namespace TsukiDB {
  export class MongoDB {
    private _mongoUri: string;

    constructor(connectionString: string) {
      this._mongoUri = connectionString;
    }

    public connect = async (): Promise<void> => {
      await connectMongo(this._mongoUri);
    };

    public print = (): void => {
      console.log('Databse print function!');
    };
  }
}
