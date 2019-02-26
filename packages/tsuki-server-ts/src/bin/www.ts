/**
 * Local Module dependencies.
 */
import { TsukiApplication } from '../app';
import * as config from '../config';

const main = async (): Promise<void> => {
  const app = new TsukiApplication(config);
  /**
   * Start application.
   */
  await app.start();
};

main();
