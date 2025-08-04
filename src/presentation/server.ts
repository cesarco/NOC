import { CheckService } from "../domain/use-cases/checks/check-service";
import { CronService } from "./cron/cron-service";

export class ServerApp {
  public static start() {
    console.log("Server is starting...");
    CronService.createJob("*/5 * * * * *", () => {
      const url = "https://google.com";
      new CheckService(
        () => {
          console.log(`Successfully checked ${url}`);
        },
        (error) => {
          console.error("Error callback:", error);
        }
      ).execute(url);
      //new CheckService().execute("http://localhost:3000/");
    });
  }
}
