import dotenv from 'dotenv';
import { main } from './main';
dotenv.config();


const runMainRepeatedly = (ms: string | undefined) => {
    if (!ms || isNaN(parseInt(ms))) {
      throw new Error('REPEAT_INTERVAL_MS is not set or is not a number');
    }
    console.log(`Launch successful, repeat interval: ${ms}ms`);
    try {
      setInterval(() => {
        main();
      }, parseInt(ms));
    } catch (error) {
      console.error('Error running main repeatedly:', error);
    }
  }
  
  runMainRepeatedly(process.env.REPEAT_INTERVAL_MS);