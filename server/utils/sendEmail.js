const nodemailer = require("nodemailer");

// Set up the transporter
const transporter = nodemailer.createTransport({
  host: "smtp.hostinger.com",
  port: 587,
  secure: false,
  auth: {
    // user: process.env.SMTP_USER,
    // pass: process.env.SMTP_PASS,
    user: "verify@ultimatebraggingrights.com",
    pass: "5vY_=vKVW@^8f-9736j;",
  },
});

// Function to send an OTP email
exports.sendOTPEmail = async (recipientEmail, otp) => {
  try {
    const mailOptions = {
      //   from: '"Your Company Name" <noreply@yourdomain.com>', // Sender address
      from: '"Ultimate Bragging Rights" <verify@ultimatebraggingrights.com>', // Sender address
      to: recipientEmail, // Recipient address
      subject: "Your OTP Code", // Subject line
      text: `Your OTP code is ${otp}`, // Plain text body
      html: `<p>Your OTP code is <strong>${otp}</strong></p>`, // HTML body
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
  } catch (error) {
    console.error("Error sending email: ", error);
  }
};
