import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // ✅ MUST for port 465 (SSL connection)
  auth: {
    user: process.env.USER,
    pass: process.env.PASS, // ⚠️ App Password (NOT normal Gmail password)
  },
  pool: true,           // ✅ keeps connection alive & faster
  maxConnections: 1,    // optional
  maxMessages: 5,       // optional
  rateLimit: 1,         // optional
  socketTimeout: 20000, // ✅ 20s timeout (prevent hanging)
});
