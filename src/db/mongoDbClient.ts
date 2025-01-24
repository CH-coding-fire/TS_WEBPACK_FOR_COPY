import { MongoClient, ServerApiVersion } from 'mongodb';

if (!process.env.MONGODB_USERNAME || !process.env.MONGODB_PASSWORD) {
  throw new Error('MongoDB credentials not found. Make sure dotenv is configured in your entry point.');
}

const uri = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.boo0q.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

export const mongoDbClient = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});