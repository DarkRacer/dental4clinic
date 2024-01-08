import { MongoClient } from "mongodb";
const connectionString = process.env.ATLAS_URI || "27017";
const client = new MongoClient(connectionString);
let conn;
try {
  conn = await client.connect();
} catch(e) {
  console.error(e);
}
let db = conn.db("dental4clinic");
export default db;
