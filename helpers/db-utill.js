import { MongoClient } from "mongodb";

export async function connectDB(){
    const client = await MongoClient.connect('mongodb+srv://event-db:BxaqJll2yZuP3NgG@mymongo.tg4fxzb.mongodb.net/events')
   return client;
}

export async function insertDocument(client, collection, document){
    const db = client.db();

    await db.collection(collection).insertOne(document)
    client.close();
}
export async function readDocument(client, collection, filter={}){
    const db = client.db();
    const data = await db.collection(collection).find(filter).sort({_id:-1}).toArray();
    
    client.close();
    return data;
}