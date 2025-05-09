const nodemailer=require('nodemailer');
import dotenv from 'dotenv';
dotenv.config();

export const sendMail=async function name(mailOptions:any) {
    const transporter= nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:`${process.env.NODEMAILER_USER}`,
            pass:`${process.env.NODEMAILER_PASS}`,
        }
    });
    
    try {
        const res =await transporter.sendMail(mailOptions);
        console.log("Mail sent sucessfully")
    } catch (error) {
        console.log("Mail not sent ",error);
    }
}