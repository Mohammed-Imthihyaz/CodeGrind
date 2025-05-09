
import { sendMail } from "./connectToNodemailer";
import { GET_WELCOME_TEMPLATE, PASSWORD_RESET_REQUEST_TEMPLATE, SENT_EMAIL_TEMPLATE, SUBSCRIPTION_CONFIRMATION_TEMPLATE } from "./emailTemplates";

export const welcomeEmail =async function name(email:string) {
    const mailOptions={
        from:'mohammedimthihyaz@gmail.com',
        to:email,
        subject:'Welcome to Daily_Code',
        html:GET_WELCOME_TEMPLATE("https://learnyard.com/practice/dsa")
    }
    try {
        const response =await sendMail(mailOptions);
        console.log("mail sent ",response);
    } catch (error) {
        console.error(`Error sending welcome email`,error);
        throw new Error(`Error sending welcome email: ${error}`);
    }
    
}

export const subscribedtoEmail=async function name(email:string) {
    const mailOptions={
        from:'mohammedimthihyaz@gmail.com',
        to:email,
        subject:'You are a Subscriber !!',
        html:SUBSCRIPTION_CONFIRMATION_TEMPLATE
    }
    try {
        await sendMail(mailOptions);
        console.log("subscription email sent ")
    } catch (error) {
        console.error(`Error in sending of subscription`,error);
        throw new Error(`Error in sending of subscription: ${error}`);
    }
}

export const sendQuestionstoUsers=async (emails:string[],questions:string)=>{
    const mailOptions={
        from:'mohammedimthihyaz@gmail.com',
        to:emails,
        subject:'Time to Code ⏰🧑‍💻',
        html:SENT_EMAIL_TEMPLATE(questions)
    }
    try {
        await sendMail(mailOptions);
        console.log("email sent to every one ")
    } catch (error) {
        console.error(`Error sending emails to eveyone`,error);
        throw new Error(`Error sending emails to eveyone: ${error}`);
    }
}

export const sendResetEmail=async(email:string,url:string)=>{
    const mailOptions ={
        from:"mohammedimthihyaz@gmail.com",
        to:email,
        subject: 'Password Reset Successful',
        html:PASSWORD_RESET_REQUEST_TEMPLATE(url)
    }
    try {
        await sendMail(mailOptions);
        console.log("reset email sent");
    } catch (error) {
        console.log("error in reset email ",error);
        throw new Error(`Error  in reset email : ${error}`);
    }
}