
import { LogImplementationRepository } from "../infrastructure/repositories/log-implementation.repository";
import { FileSystemDataSource } from '../infrastructure/datasources/file-system.datasource';
import { EmailService } from "./email/email.service";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";

const fileSystemLogRepository = new LogImplementationRepository(
  new FileSystemDataSource(),
);
const emailService = new EmailService();

export class ServerApp {
  public static start() {
    console.log("Server is starting...");
    // nodemailer 
      new SendEmailLogs(
        emailService,
        fileSystemLogRepository
      ).execute(
        'devcesarco@outlook.es'
      )
    // emailService.sendEmailWithFileSystemLogs('devcesarco@outlook.es');

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
