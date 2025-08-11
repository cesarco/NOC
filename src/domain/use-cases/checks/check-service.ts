import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repositoty";

interface CheckServiceUseCase {
  execute(url: string): Promise<boolean>;
}

type successCallback = () => void | undefined;
type ErrorCallback = (error: string) => void;

export class CheckService implements CheckServiceUseCase {
  constructor(
    private readonly logRepository: LogRepository,
    private readonly successCallback: successCallback,
    private readonly errorCallback: ErrorCallback
  ) {}

  public async execute(url: string): Promise<boolean> {
    try {
      const req = await fetch(url);
      if (!req.ok) {
        throw new Error(`Failed to fetch ${url}: ${req.statusText}`);
      }
      const log = new LogEntity({
        message: `${url} is ok`,
        level: LogSeverityLevel.low,
        origin: 'check-service.ts'
      });
      this.logRepository.SaveLog(log);
      this.successCallback();
      return true;
    } catch (error) {
      const errorMessage = `${url} is not ok. ${error}`;
      const log = new LogEntity({
        message: errorMessage,
        level: LogSeverityLevel.high,
        origin: 'check-service.ts'
      });
      this.logRepository.SaveLog(log);
      this.errorCallback(errorMessage);
      return false;
    }
  }
}
