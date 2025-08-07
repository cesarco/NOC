import { LogEntity, LogSeverityLevel } from "../entities/log.entity";

export abstract class LogDataSource {
    abstract SaveLog(log: LogEntity): Promise<void>;
    abstract GetLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]>;
}