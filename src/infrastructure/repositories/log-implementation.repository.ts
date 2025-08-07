import { LogRepository } from "../../domain/repository/log.repositoty"; // Adjust the path as needed
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity"; // Adjust the path if needed
import { LogDataSource } from "../../domain/datasources/log.datasource";

export class LogImplementationRepository implements LogRepository {
  // private logDataSource: LogDataSource;
  constructor(private readonly logDataSource: LogDataSource) {}

  async SaveLog(log: LogEntity): Promise<void> {
    return this.logDataSource.SaveLog(log);
  }

  async GetLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    return this.logDataSource.GetLogs(severityLevel);
  }
}
