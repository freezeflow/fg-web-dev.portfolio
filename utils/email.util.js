import fs from "fs";
import path from "path";
import handlebars from "handlebars";
import nodemailer from 'nodemailer';
import { SMTP_HOST, SMTP_PASS, SMTP_PORT, SMTP_USER } from '../config/config.js';

// Configure your SMTP transporter
const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT || 587,
  secure: false,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
});

// Verify connection configuration (optional, good for debugging)
transporter.verify(function(error, success) {
  if (error) {
    console.error("Error connecting to SMTP server:", error);
  } else {
    console.log("SMTP server is ready to take messages");
  }
});

function renderTemplate(templateName, variables) {
  const filePath = path.join(process.cwd(), "templates", `${templateName}.hbs`);
  const source = fs.readFileSync(filePath, "utf8");
  const compiled = handlebars.compile(source);
  return compiled(variables);
}

// Function to send email
export async function sendEmail({ to, subject, templateName, variables }) {
  const html = renderTemplate(templateName, variables);

  return transporter.sendMail({
    from: `"FG Web Dev" <${SMTP_USER}>`,
    to,
    subject,
    html,
  });
}
