import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const sendOrderEmail = async (order, user) => {
  try {
    await sgMail.send({
      to: user.email,
      from: process.env.SENDER_EMAIL, // must be verified in SendGrid
      subject: `Order Confirmation #${order._id}`,
      html: `
        <h2>Thank you for your order, ${user.name}!</h2>
        <p>We've received your order and are processing it.</p>
        <p><strong>Order ID:</strong> ${order._id}</p>
        <p><strong>Total:</strong> ₹${order.totalPrice}</p>
        <p>We’ll notify you when it ships.</p>
      `,
    });

    console.log("Order email sent.");
  } catch (err) {
    console.error("SendGrid Email Error:", err.response?.body || err);
  }
};
