import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendResetEmail = async (email, link) => {
  const msg = {
    to: email,
    from: process.env.SENDER_EMAIL, // MUST be verified
    subject: "Reset Your Password",
    html: `
      <h2>Password Reset Request</h2>
      <p>Click below to reset your password:</p>
      <a href="${link}" style="color:#1a73e8">${link}</a>
      <p>This link expires in <b>15 minutes</b>.</p>
    `,
  };

  await sgMail.send(msg);
};

export default sendResetEmail;
