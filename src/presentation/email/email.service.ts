import nodemailer from "nodemailer";
import { envs } from "../../config/plugins/envs.plugin";
import { LogRepository } from "../../domain/repository/log.repositoty";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

interface SendMailOptions {
  to: string | string[];
  subject: string;
  htmlBody: string;
  attachments: Attachment[];
}

interface Attachment {
  filename: string;
  path: string;
}

export class EmailService {
  private transporter = nodemailer.createTransport({
    service: envs.MAILER_SERVICE,
    auth: {
      user: envs.MAILER_EMAIL,
      pass: envs.MAILER_SECRET_KEY,
    },
  });

  constructor(
    private readonly logRepository: LogRepository
  ){}

  async sendEmail(options: SendMailOptions): Promise<boolean> {
    const { to, subject, htmlBody, attachments } = options;

    try {
      const sentInformation = await this.transporter.sendMail({
        to,
        from: envs.MAILER_EMAIL,
        subject,
        html: htmlBody,
        attachments,
      });

      const log = new LogEntity({
        level: LogSeverityLevel.low,
        message: 'Email sent successfully',
        origin: 'email.service.ts'
      });
      this.logRepository.SaveLog(log);
      return true;
    } catch (error) {
        const log = new LogEntity({
        level: LogSeverityLevel.high,
        message: 'Error sending email',
        origin: 'email.service.ts'
      });
      this.logRepository.SaveLog(log);
      return false;
    }
  }

  async sendEmailWithFileSystemLogs(to: string | string[]) {
    const subject = "Logs del servidor";
    const htmlBody = `
        <h1>${subject}</h1>
        <p>Adjunto los logs del servidor.</p>
        <ul>
            <li>Log de alta: </li>
            <li>Log de media: </li>
            <li>Log de baja: </li>
        </ul>
        `;

    const attachments: Attachment[] = [
      {
        filename: "logs-low.log",
        path: "./logs/logs-low.log",
      },
      {
        filename: "logs-medium.log",
        path: "./logs/logs-medium.log",
      },
      {
        filename: "logs-high.log",
        path: "./logs/logs-high.log",
      },
    ];
    return this.sendEmail({
      to,
      subject,
      htmlBody,
      attachments,
    });
  }
}
