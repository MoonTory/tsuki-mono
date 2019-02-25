import debug from 'debug';
import { Application as ExpressApplication } from 'express';
import { Server as httpServer } from 'http';

export class TsukiHTTP extends httpServer {
  private static _instance: TsukiHTTP;
  private port?: string | number | boolean;

  private constructor(port?: string | number | boolean, express?: ExpressApplication) {
    super(express);

    this.port = port;

    this.on('error', this.onError);
    this.on('listening', this.onListening);
  }

  public static getInstance(port?: string | number | boolean, express?: ExpressApplication): TsukiHTTP {
    if (!TsukiHTTP._instance) {
      TsukiHTTP._instance = new TsukiHTTP(port, express);
      // ... any one time initialization goes here ...
    }
    return TsukiHTTP._instance;
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
}
