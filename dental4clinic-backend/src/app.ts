import express, { Express, Request, Response } from 'express';
import routes from "./routes/routes";
import * as dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import * as mongoClient from './mongo';
import { createCollectionAndInsertData } from './migration';
import { Db } from 'mongodb';

const app: Express = express();

const port = process.env.PORT || 3000;

dotenv.config();

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(routes);

async function checkMigration(db: Db) {
  const migrations = db.collection('migrations');
  const migrationDone = await migrations.findOne({ name: 'initial_migration' });
  return migrationDone;
}

async function startServer() {
  try {
    const db = await mongoClient.connect();
    console.log("Connected successfully to MongoDB");
    const isMigrated = await checkMigration(db);
    if (!isMigrated) {
      await createCollectionAndInsertData(db);
      await db.collection('migrations').insertOne({ name: 'initial_migration', date: new Date() });
    }

    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch(err) {
    console.error("Ошибка при запуске приложения:", err);
  }
}

startServer();

export default app;