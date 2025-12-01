import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const sendOrderEmail = async (order, user) => {
  const msg = {
    to: user.email,
    from: process.env.SENDER_EMAIL, // Must be verified sender
    subject: `Order Confirmation - ${order._id}`,
    html: `
      <h2>Thank you for your order!</h2>
      <p>Order ID: <strong>${order._id}</strong></p>
      
      <h3>Order Items:</h3>
      <ul>
        ${order.items
          .map(
            (i) =>
              `<li>${i.name} (Size: ${i.size}) × ${i.qty} — ₹${i.price}</li>`
          )
          .join("")}
      </ul>

      <p>Total Price: <strong>₹${order.totalPrice}</strong></p>
      <p>We will notify you once your order is shipped.</p>
    `,
  };

  try {
    await sgMail.send(msg);
    console.log("SendGrid email: SUCCESS");
  } catch (err) {
    console.error("SendGrid Error:", err.response?.body || err.message);
  }
};
