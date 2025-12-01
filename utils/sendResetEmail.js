// utils/sendResetEmail.js
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendResetEmail = async (to, link) => {
  const msg = {
    to,
    from: process.env.SENDER_EMAIL, // must be verified
    subject: "Password Reset Request",
    html: `
      <h2>Reset Your Password</h2>
      <p>Click the button below to reset your password:</p>

      <a href="${link}" target="_blank"
         style="padding:12px 20px;background:#111;color:#fff;
         text-decoration:none;border-radius:5px;display:inline-block;">
         Reset Password
      </a>

      <p>This link will expire in <b>15 minutes</b>.</p>
    `,
  };

  await sgMail.send(msg);
};

export default sendResetEmail;
