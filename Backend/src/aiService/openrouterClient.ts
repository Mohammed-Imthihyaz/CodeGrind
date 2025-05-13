import axios from "axios";
import dotenv from 'dotenv';
dotenv.config();

const Key =process.env.OPENROUTER_API_KEY;
export async function getQuestions(prompt:string): Promise<string>  {
    try {
        const response =await axios.post("https://openrouter.ai/api/v1/chat/completions",
        {
            model:'openai/gpt-3.5-turbo',
            messages:[{role:'user',content:prompt}],
        },
        {
            headers:{
                Authorization:`Bearer ${Key}`,
                'Content-Type': 'application/json',
                'HTTP-Referer': 'http://localhost:3002', 
                'X-Title': 'Daily-Code', 
            }
        }
        );
        const content = response.data.choices?.[0]?.message?.content || 'No reply.';
        return content;
    } catch (error) {
        console.error(' Error with OpenRouter:', error || error);
        return 'Failed to fetch from OpenRouter.';
    }
    
} 