import { connectMongo } from './mongo/connectMongo';

export namespace TsukiDB {
  export class MongoDB {
    private MONGO_URI: string;

    constructor(connectionString: string) {
      this.MONGO_URI = connectionString;
    }

    public connect = async () => {
      connectMongo(this.MONGO_URI);
    };

    public print = () => {
      console.log('Databse print function!');
    };
  }
}
