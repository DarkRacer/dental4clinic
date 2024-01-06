import { MongoClient, Db } from "mongodb";
import * as dotenv from "dotenv";
dotenv.config();

const user = process.env.MONGO_USER;
const password = process.env.MONGO_PASSWORD;
const port = process.env.MONGO_PORT;
const dbName = process.env.MONGO_DB;

const url = `mongodb://${user}:${password}@localhost:${port}/`;
const client = new MongoClient(url);

export async function connect(): Promise<Db> {
    try {
        await client.connect();
        return client.db(dbName);
    } catch (e) {
        console.error("Could not connect to MongoDB", e);
        throw e;
    }
}

export async function close(): Promise<void> {
    await client.close();
}