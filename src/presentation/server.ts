import { LogImplementationRepository } from "../infrastructure/repositories/log-implementation.repository";
import { FileSystemDataSource } from "../infrastructure/datasources/file-system.datasource";
import { EmailService } from "./email/email.service";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { CronService } from "./cron/cron-service";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { MongoLogDatasource } from "../infrastructure/datasources/mongo-log.datasource";
import { LogSeverityLevel } from "../domain/entities/log.entity";

const LogRepository = new LogImplementationRepository(
  // new FileSystemDataSource(),
  new MongoLogDatasource()
);
const emailService = new EmailService();

export class ServerApp {
  public static async start() {
    console.log("Server is starting...");
    // nodemailer
    // new SendEmailLogs(
    //   emailService,
    //   LogRepository
    // ).execute(
    //   'devcesarco@outlook.es'
    // )
    // emailService.sendEmailWithFileSystemLogs('devcesarco@outlook.es');

    // const logs = await LogRepository.GetLogs(LogSeverityLevel.low);
    // console.log(logs);

    CronService.createJob("*/5 * * * * *", () => {
      const url = "https://google.com";
      new CheckService(
        LogRepository,
        () => {
          console.log(`Successfully checked ${url}`);
        },
        (error) => {
          console.error("Error callback:", error);
        }
      ).execute(url);
    });
  }
}
