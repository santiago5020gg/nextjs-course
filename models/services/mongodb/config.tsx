const { MongoClient } = require("mongodb");
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url =
  "mongodb+srv://santiago5020gg:Objetivo2@cluster0.meegw4e.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(url);

async function connectMongoDb() {
  // Use connect method to connect to the server
  await client.connect();
  console.log("Connected successfully to server");
  // Database Name
  const dbName = "dbhbo";
  const db = client.db(dbName);
  return db;
}

// connectMongoDb()
//   .then(console.log)
//   .catch(console.error)
//   .finally(() => client.close());

export default connectMongoDb;
