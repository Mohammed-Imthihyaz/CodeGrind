import { QuestionBank } from "../Models/QuestionBank";
import { User } from "../Models/User.Schema";
import generateQuestion from "../aiService/generateQuestion";
import { sendQuestionstoUsers } from "../nodemailer/sendEmails";
const cron = require('node-cron');

async function runJob() {
  try {
    const response = await generateQuestion(); 
    const newQ = new QuestionBank({ question: response });
    await newQ.save();
    const emails = await User.find({ isSubscribed: true }).select('email -_id');
    const emailArray = emails.map(user => user.email);
    await sendQuestionstoUsers(emailArray, response);
    console.log("✅ Question saved and sent successfully!");
  } catch (err) {
    console.error("❌ Error in cron job: ", err);
  }
}
export function dailyJobs(): void {
  // 10:30 
  cron.schedule('30 10 * * *', runJob);
  // 5:00 PM
  cron.schedule('0 17 * * *', runJob);
  // 8:00 PM
  cron.schedule('0 20 * * *', runJob);
}
