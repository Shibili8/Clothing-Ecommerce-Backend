import nodemailer from "nodemailer";

export const sendOrderEmail = async (order, user) => {
  try {
    // Create SMTP transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SENDGRID_HOST,
      port: Number(process.env.SENDGRID_PORT),
      secure: false, // must be false for port 587
      auth: {
        user: process.env.SENDGRID_USER,
        pass: process.env.SENDGRID_PASS,
      },
    });

    // Email content
    const mailOptions = {
      from: process.env.MAIL_FROM,
      to: user.email,
      subject: "Order Confirmation",
      html: `
        <h2>Order Confirmed 🎉</h2>
        <p>Hi <b>${user.name}</b>,</p>
        
        <p>Your order has been placed successfully!</p>
        
        <h3>Order ID: ${order._id}</h3>
        <h3>Total Price: ₹${order.totalPrice}</h3>
        
        <h4>Items:</h4>
        <ul>
          ${order.items
            .map(
              (item) =>
                `<li>${item.name} (${item.size}) × ${item.qty} — ₹${item.price}</li>`
            )
            .join("")}
        </ul>

        <p>Thank you for shopping with us! ❤️</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    console.log("SendGrid Email Sent!");
  } catch (error) {
    console.error("SendGrid Email Error:", error);
  }
};
