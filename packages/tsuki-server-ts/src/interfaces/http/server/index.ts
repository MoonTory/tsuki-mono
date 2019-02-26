import debug from 'debug';
import { Application as ExpressApplication } from 'express';
import { Server as httpServer } from 'http';

export class TsukiHttp extends httpServer {
  private static _instance: TsukiHttp;
  public port?: string | number | boolean;

  private constructor(port: string | number, express?: ExpressApplication) {
    super(express);

    /**
     * Get port from environment and initialize TsukiServer.
     */
    this.port = this.normalizePort(port);

    this.on('error', this.onError);
    this.on('listening', this.onListening);
  }

  public static getInstance(port: string | number, express?: ExpressApplication): TsukiHttp {
    if (!TsukiHttp._instance) {
      TsukiHttp._instance = new TsukiHttp(port, express);
      // ... any one time initialization goes here ...
    }
    return TsukiHttp._instance;
  }

  /**
   * Event listener for HTTP server "error" event.
   */

  private onError(error: NodeJS.ErrnoException): void {
    if (error.syscall !== 'listen') {
      throw error;
    }
    const bind = typeof this.port === 'string' ? 'Pipe ' + this.port : 'Port ' + this.port;
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

  private onListening(): void {
    const addr = this.address();
    const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
    debug(`Listening on ${bind}`);
  }

  /**
   * Normalize a port into a number, string, or false.
   */

  private normalizePort(val: number | string): number | string | boolean {
    const port: number = typeof val === 'string' ? parseInt(val, 10) : val;
    if (isNaN(port)) {
      return val;
    } else if (port >= 0) {
      return port;
    } else {
      return false;
    }
  }
}
