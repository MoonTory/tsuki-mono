/**
 * Local Module dependencies.
 */
import { TsukiApplication } from '../app';
import * as config from '../config';

const main = async (): Promise<void> => {
  /**
   * Get port from environment and initialize TsukiServer.
   */
  const port = normalizePort(config.APP_PORT);
  const app = new TsukiApplication(config, port);

  /**
   * Listen on http.
   */
  await app.listen();

  /**
   * Normalize a port into a number, string, or false.
   */

  function normalizePort(val: number | string): number | string | boolean {
    const port: number = typeof val === 'string' ? parseInt(val, 10) : val;
    if (isNaN(port)) {
      return val;
    } else if (port >= 0) {
      return port;
    } else {
      return false;
    }
  }
};

main();
