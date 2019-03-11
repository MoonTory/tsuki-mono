import debug from 'debug';
import express from 'express';
import http from 'http';

export class TsukiHttp extends http.Server {
  private static _instance: TsukiHttp;
  private _port?: string | number | boolean;

  private constructor(port: string | number, express?: express.Application) {
    super(express);

    // Get port from environment and initialize TsukiServer.
    this._port = this.normalizePort(port as string | number);

    this.on('error', this.onError);
    this.on('listening', this.onListening);
  }

  /**
   * Instance getter method, pass port & express application on first initialization. Otherwise the function will either
   * throw a 'warning' for when no 'port' is provided, and defaulting to 5007; and throws an 'Fatal Error' when no
   * express application is provided.
   * @param port string | number | undefined
   * @param express express.Application | undefined
   * @returns TsukiTHttp
   */
  public static getInstance(port?: string | number, express?: express.Application): TsukiHttp {
    if (!TsukiHttp._instance) {
      if (!port) {
        const err = new Error(
          "WARNING: A 'port' property was not defined, defaulting to 5007. Please provide a 'port' on first intialization to get rid of this warning..."
        );
        process.emitWarning(err);
        port = 5007;
      } else if (!express) {
        throw new Error(
          'TsukiHttp was unable to initialize, please provide an express instance on first initialization!'
        );
      }

      TsukiHttp._instance = new TsukiHttp(port, express);
      // ... any one time initialization goes here ...
    }
    return TsukiHttp._instance;
  }

  /**
   * Returns the 'port' property of the TsukiHttp instance. This is a getter method.
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
