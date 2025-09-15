// utils/mailer.js

import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Create a transporter object using Gmail SMTP and environment variables
const transporter = nodemailer.createTransport({
  service: 'gmail',  // Using Gmail SMTP service
  auth: {
    user: process.env.EMAIL_USER,  // Read from .env
    pass: process.env.EMAIL_PASS   // Read from .env
  }
});

// Send notification to all users
export const sendNotificationToAllUsers = async (subject, message, users) => {
  const mailOptions = {
    from: `"Detection Alert" <${process.env.EMAIL_USER}>`, // Sender address
    to: users.join(','),  // Recipients
    subject,  // Subject
    text: message,  // Message
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("📨 Notification sent to all users.");
  } catch (error) {
    console.error("❌ Error sending email:", error);
  }
};
