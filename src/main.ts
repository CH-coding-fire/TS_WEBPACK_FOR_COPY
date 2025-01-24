import { mongoDbClient } from "./db/mongoDbClient";

export const main = async () => {
  // const response = await askChatGPT([{role: "user", content: "I want to ask, 1 cat vs thousands of ants, who wins, simulate the battle?"}]);
  // console.log(response.choices[0].message.content);
  console.log("main.ts is running...")
  console.log(process.env.REPEAT_INTERVAL_MS)

}

