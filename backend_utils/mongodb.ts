import { MongoClient } from "mongodb";

const uri = "mongodb://localhost:27017";

export default async () => {
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    await client.connect();
    const db = client.db("testdb");
    const table = db.collection("users");

    return table;
};
