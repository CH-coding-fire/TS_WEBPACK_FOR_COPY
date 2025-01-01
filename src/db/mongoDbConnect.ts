import { mongoDbClient } from './mongoDbClient';

export async function connectMongoDB() {
  try {
    await mongoDbClient.connect();
    await mongoDbClient.db("admin").command({ ping: 1 });
    console.log("Successfully connected to MongoDB!");
    return mongoDbClient;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}

export async function disconnectMongoDB() {
  try {
    await mongoDbClient.close();
    console.log("Disconnected from MongoDB");
  } catch (error) {
    console.error('Error disconnecting from MongoDB:', error);
    throw error;
  }
}