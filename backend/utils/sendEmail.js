import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export default async function sendEmail(to, password) {
  await transporter.sendMail({
    from: `"Capstone System" <${process.env.EMAIL_USER}>`,
    to,
    subject: 'Your Account Password',
    text: `Here is your generated password: ${password}`,
  });
}
