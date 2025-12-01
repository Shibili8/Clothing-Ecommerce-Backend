import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const sendOrderEmail = async (order, user) => {
  const msg = {
    to: user.email,
    from: process.env.SENDER_EMAIL, // Must be verified SendGrid sender
    subject: "Your Order is Successful!",
    html: `
      <h2>Order Successful</h2>
      <p>Hi ${user.name},</p>
      <p>Your order has been placed successfully.</p>
      <p><b>Order ID:</b> ${order._id}</p>
      <p><b>Total:</b> ₹${order.totalPrice}</p>

      <h3>Items:</h3>
      <ul>
        ${order.items
          .map(
            (item) =>
              `<li>${item.name} (${item.size}) × ${item.qty} — ₹${item.price}</li>`
          )
          .join("")}
      </ul>

      <p>Thank you for shopping with us!</p>
    `,
  };

  try {
    await sgMail.send(msg);
    console.log("Order email sent!");
  } catch (err) {
    console.error("SendGrid Email Error:", err);
  }
};
