const nodemailer = require("nodemailer");

export default async function sendEmail(from, to, subject, body) {
  const transporter = nodemailer.createTransport({
    host: "smtp.mailgun.org", // hostname
    secureConnection: false, // TLS requires secureConnection to be false
    port: 587, // port for secure SMTP
    tls: {
      ciphers: "SSLv3",
    },
    auth: {
      user: process.env.TRANSPORTER_EMAIL,
      pass: process.env.TRANSPORTER_EMAIL_PW,
    },
  });

  const mailOptions = { from, to, subject, html: `<html>${body}</html>` };

  await transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      throw new Error("Failed to send email.");
    } else {
      return "Email sent: " + info.response;
    }
  });
}
