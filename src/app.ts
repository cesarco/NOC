import { envs } from "./config/plugins/envs.plugin";
import { MongoDatabase } from "./data/mongo";
import { LogModel } from "./data/mongo/models/log.model";
import { ServerApp } from "./presentation/server";

(async () => {
  main();
})();

async function main() {
  await MongoDatabase.connect({
    mongoUrl: envs.MONGO_URL,
    dbName: envs.MONGO_DB_NAME,
  });

  // crear un  coleccion = tables, documento = registro
  const newLog = await LogModel.create({
    message: "Test message desde Mongo",
    origin: "App.ts",
    level: "low",
  });

  await newLog.save();
  console.log(newLog);

  ServerApp.start();
}
