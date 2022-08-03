import chalk from 'chalk';
import {AsyncLocalStorage} from 'async_hooks';
export const traceIdAsyncStorage = new AsyncLocalStorage<string>();

enum LoggerLevelEnum {
  trace,
  debug,
  info,
  warn,
  error,
}

/**
 * @description 统一在日志中添加traceId
 * @author huk10
 * @date 2020/12/18
 */
class Logger {
  private levelMapString = new Map<LoggerLevelEnum, string>([
    [LoggerLevelEnum.error, 'ERROR'],
    [LoggerLevelEnum.warn, 'WARN'],
    [LoggerLevelEnum.info, 'INFO'],
    [LoggerLevelEnum.debug, 'DEBUG'],
    [LoggerLevelEnum.trace, 'TRACE'],
  ]);

  constructor(private module: string, private level: LoggerLevelEnum = LoggerLevelEnum.trace) {}

  private write(level: LoggerLevelEnum, msg: string, args: any[]) {
    // 这个try catch 要不要去掉(性能)
    try {
      // 如果传递进来一个不可序列化到json的对象会报错
      const traceId = traceIdAsyncStorage.getStore();
      let str = chalk.blue(this.levelMapString.get(level));
      str += ' ' + chalk.yellow('【' + this.module + '】');
      if (traceId !== undefined) {
        str += ' ' + chalk.green('traceId: ' + traceId);
      }
      str += ' ' + chalk.magenta(msg);
      if (this.level <= level || process.env.YUNKE_ENV !== 'local') {
        const methods = level === LoggerLevelEnum.error ? 'error' : 'info';
        console[methods](str, ...args);
      }
    } catch (err) {
      console.error('输出日志异常: %s', err.stack);
    }
  }

  withModule(module: string, level?: LoggerLevelEnum): Omit<Logger, 'withModule'> {
    return new Logger(module, level ?? this.level);
  }

  getLogger(module: string, level?: LoggerLevelEnum): Omit<Logger, 'getLogger'> {
    return new Logger(module, level ?? this.level);
  }

  info(msg: string, ...args: any[]) {
    this.write(LoggerLevelEnum.info, msg, args);
  }

  debug(msg: string, ...args: any[]) {
    this.write(LoggerLevelEnum.debug, msg, args);
  }

  warn(msg: string, ...args: any[]) {
    this.write(LoggerLevelEnum.warn, msg, args);
  }
  trace(msg: string, ...args: any[]) {
    this.write(LoggerLevelEnum.trace, msg, args);
  }

  error(msg: string, ...args: any[]) {
    this.write(LoggerLevelEnum.error, msg, args);
  }
}

export const logger = new Logger('root');
