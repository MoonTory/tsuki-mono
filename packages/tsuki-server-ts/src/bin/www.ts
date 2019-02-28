/**
 * Local Module dependencies.
 */
import { TsukiApplication } from '../app';
import { config } from '../config';

const main = async (): Promise<void> => {
  const app = new TsukiApplication(config);
  /**
   * Start application.
   */
  await app.start();
};

main();
