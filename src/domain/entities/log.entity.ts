export enum LogSeverityLevel {
  low = "low",
  medium = "medium",
  high = "high",
}

export interface LogEntityOptions {
  level: LogSeverityLevel;
  message: string;
  origin: string;
  createdAt?: Date;
}

export class LogEntity {
  public level: LogSeverityLevel;
  public message: string;
  public createdAt: Date;
  public origin: string;

  constructor(options: LogEntityOptions) {
    const { level, message, origin, createdAt } = options;
    this.message = message;
    this.level = level;
    this.createdAt = createdAt ? new Date(createdAt) : new Date();
    this.origin = origin;
  }

  static fromJson = (json: string): LogEntity => {
    json = ( json === '') ?  '{}' : json;
    const { message, level, createdAt, origin } = JSON.parse(json);
    if (!message || !level || !createdAt) {
      throw new Error("Invalid JSON format for LogEntity");
    }

    const log = new LogEntity({
      message,
      level,
      createdAt,
      origin,
    });
    log.createdAt = new Date(createdAt);
    return log;
  };

  static fromObject = (object: { [key: string]: any }): LogEntity => {
    const { message, level, createdAt, origin } = object;
    if (!message || !level || !createdAt) {
      throw new Error("Invalid object format for LogEntity");
    }

    return new LogEntity({
      message,
      level,
      createdAt,
      origin,
    });
  };
}
