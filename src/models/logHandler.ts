import { HttpRegion } from './httpRegion';
import { HttpResponse } from './httpResponse';

export enum LogLevel{
  trace = 0,
  debug = 2,
  warn = 5,
  info = 10,
  error = 100,
  none = 1000,
}

export interface LogHandler {
  readonly options: {
    level?: LogLevel,
    logMethod?: (level: LogLevel, ...params: unknown[]) => void,
  }
  info(...params: unknown[]): void;
  log(...params: unknown[]): void;
  trace(...params: unknown[]): void;
  debug(...params: unknown[]): void;
  error(...params: unknown[]): void;
  warn(...params: unknown[]): void;
}

export interface ConsoleLogHandler extends LogHandler{
  logTest(result: boolean, message: string): void;
  collectMessages(): void;
  flush() : void;
}


export type RequestLogger = (response: HttpResponse, httpRegion?: HttpRegion) => void;

export function toLogLevel(level: string | undefined) : LogLevel {
  switch (level) {
    case 'trace':
      return LogLevel.trace;
    case 'debug':
      return LogLevel.debug;
    case 'warn':
      return LogLevel.warn;
    case 'error':
      return LogLevel.error;
    default:
      return LogLevel.info;
  }
}
