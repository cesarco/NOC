import { CheckService } from "../domain/use-cases/checks/check-service";
import { LogImplementationRepository } from "../infrastructure/repositories/log-implementation.repository";
import { CronService } from "./cron/cron-service";
import { FileSystemDataSource } from '../infrastructure/datasources/file-system.datasource';
import { EmailService } from "./email/email.service";

const fileSystemLogRepository = new LogImplementationRepository(
  new FileSystemDataSource(),
);

export class ServerApp {
  public static start() {
    console.log("Server is starting...");
    // nodemailer 
    const emailService = new EmailService();
    emailService.sendEmailWithFileSystemLogs('devcesarco@outlook.es');

    // CronService.createJob("*/5 * * * * *", () => {
    //   const url = "https://google.com";
    //   new CheckService(
    //     fileSystemLogRepository,
    //     () => {
    //       console.log(`Successfully checked ${url}`);
    //     },
    //     (error) => {
    //       console.error("Error callback:", error);
    //     }
    //   ).execute(url);
    //   //new CheckService().execute("http://localhost:3000/");
    // });
  }
}
