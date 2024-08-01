
import OpenAI from 'openai';// Initialize OpenAI client

if (!process.env.OPENAI_API_KEY) {
    throw new Error('OpenAI API key is missing');
}
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});
export default openai;