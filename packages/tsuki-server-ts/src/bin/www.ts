/**
 * Local Module dependencies.
 */
import { TsukiServer } from '../app';
import { APP_PORT } from '../config';

const main = async (): Promise<void> => {
  /**
   * Get port from environment and store in Express.
   */
  const port = normalizePort(APP_PORT);
  const app = new TsukiServer(port);

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
