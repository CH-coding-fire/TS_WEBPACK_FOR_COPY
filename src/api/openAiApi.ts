import axios from 'axios';

const openaiApi = axios.create({
    baseURL: 'https://api.openai.com/v1',
    headers: {
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
  });
  
  export const askChatGPT = async (messages: any[]) => {
    try {
      const response = await openaiApi.post('/chat/completions', {
        model: 'gpt-4o-mini',  // Free tier has access to this
        messages,
        temperature: 0.7,
        max_tokens: 16384,       // Free tier TPM limit is 40,000
        // stream: true,         // Optional streaming
      });
  
      // You can check rate limits from headers
    //   const remainingRequests = response.headers['x-ratelimit-remaining-requests'];
    //   const remainingTokens = response.headers['x-ratelimit-remaining-tokens'];
    //   console.log(`Remaining requests: ${remainingRequests}`);
    //   console.log(`Remaining tokens: ${remainingTokens}`);
  
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Implement exponential backoff if you hit rate limits
        if (error.response?.status === 429) {
          console.log('Rate limit hit, please wait before retrying');
        }
        throw new Error(error.response?.data?.error?.message || 'An error occurred');
      }
      throw error;
    }
  };