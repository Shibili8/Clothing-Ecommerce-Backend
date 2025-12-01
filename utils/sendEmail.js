import nodemailer from "nodemailer";
import sgTransport from "nodemailer-sendgrid";

export const sendOrderEmail = async (order, user) => {
  try {
    const transporter = nodemailer.createTransport(
      sgTransport({
        apiKey: process.env.SENDGRID_API_KEY,
      })
    );

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "Order Confirmation",
      html: `
        <h2>Order Successful!</h2>
        <p>Order ID: <strong>${order._id}</strong></p>
        <p>Total Price: ₹${order.totalPrice}</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent!");
  } catch (err) {
    console.log("SendGrid Email Error:", err);
  }
};
