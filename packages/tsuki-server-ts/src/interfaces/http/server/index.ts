import debug from 'debug';
import { Application as ExpressApplication } from 'express';
import { Server as httpServer } from 'http';

export class TsukiHttp extends httpServer {
  private static _instance: TsukiHttp;
  private _port?: string | number | boolean;

  private constructor(port: string | number, express?: ExpressApplication) {
    super(express);

    /**
     * Get port from environment and initialize TsukiServer.
     */
    this._port = this.normalizePort(port);

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
   * Getter function for the port property.
   * @param void
   * @returns string | number | boolean | undefined
   */
  public port(): string | number | boolean | undefined {
    return this._port;
  }

  /**
   * Event listener for HTTP server "error" event.
   */
  private onError(error: NodeJS.ErrnoException): void {
    if (error.syscall !== 'listen') {
      throw error;
    }
    const bind = typeof this._port === 'string' ? 'Pipe ' + this._port : 'Port ' + this._port;
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
