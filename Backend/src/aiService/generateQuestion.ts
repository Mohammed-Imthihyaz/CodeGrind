import { getQuestions } from "./openrouterClient";

export default async function generateQuestion(): Promise<string> {
  const prompt = `Generate a coding question asked in FANG (Meta, Amazon, Netflix, Google) or top tech company interviews ,Get Questions from leetcode ,GeeksForGeeks or interview bit. Follow this exact format:

     Title: [Problem Name]
     Difficulty: [Easy/Medium/Hard]
     Description: [1-3 sentence problem statement]
     Input: [Input format]
     Output: [Expected output]
     Constraints: [Constraint1, Constraint2, ...]
     Source: [LeetCode/GeeksForGeeks/InterviewBit]  
     Problem Link: [Direct URL to the problem]
     Reported at: [Companies Name ]  
     Frequency: [X% of interviews in Y year]  
     Tags: [Tag1, Tag2, ...]

     Example 1:
     Input: [Sample input]
     Output: [Sample output]
     Explanation: [1-line reasoning]

     Example 2:
     Input: [Sample input]
     Output: [Sample output]
     Explanation: [1-line reasoning] `;

  return await getQuestions(prompt);
}
