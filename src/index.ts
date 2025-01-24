import dotenv from 'dotenv';
dotenv.config();
import { main } from './main';
import { connectMongoDB } from './db/mongoDbConnect';
import { sendTg } from './service/notifications/sendTg';

const runMainRepeatedly = async (ms: string | undefined) => {

    if (!ms || isNaN(parseInt(ms))) {
      throw new Error('REPEAT_INTERVAL_MS is not set or is not a number');
    }
    try {
      await connectMongoDB(); //this is optional
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
      throw error;
    }
    console.log(`Launch successful, repeat interval: ${ms}ms`);
    try {
      setInterval(() => {
        main();
      }, parseInt(ms));
    } catch (error) {
      console.error('Error running main repeatedly:', error);
      sendTg(`${error}`);
    }

  }
  
  runMainRepeatedly(process.env.REPEAT_INTERVAL_MS);




