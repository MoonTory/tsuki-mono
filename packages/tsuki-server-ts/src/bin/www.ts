#!/usr/bin/env node

/**
 * Node Module dependencies.
 */
import debug from 'debug';
import http from 'http';

/**
 * Local Module dependencies.
 */
import TsukiServer from '../app';
import { APP_PORT } from '../config';

const main = async (): Promise<void> => {
  /**
   * Get port from environment and store in Express.
   */
  const port = normalizePort(APP_PORT);
  TsukiServer.set('port', port);

  /**
   * Create HTTP server.
   */
  const httpServer = await http.createServer(TsukiServer);

  /**
   * Listen on provided port, on all network interfaces.
   */
  await httpServer.listen(port, () => console.log(`Server started @ http://localhost:${port}`));
  httpServer.on('error', onError);
  httpServer.on('listening', onListening);

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

  /**
   * Event listener for HTTP server "error" event.
   */

  function onError(error: NodeJS.ErrnoException): void {
    if (error.syscall !== 'listen') {
      throw error;
    }
    const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;
    switch (error.code) {
      case 'EACCES':
        console.error(`${bind} requires elevated privileges`);
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(`${bind} is already in use`);
        process.exit(1);
        break;
      default:
        throw error;
    }
  }

  /**
   * Event listener for HTTP server "listening" event.
   */

  function onListening(): void {
    const addr = httpServer.address();
    const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
    debug(`Listening on ${bind}`);
  }
};

main();
