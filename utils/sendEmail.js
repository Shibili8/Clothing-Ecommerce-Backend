import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const sendOrderEmail = async (order, user) => {
  try {
    await sgMail.send({
      to: user.email,
      from: process.env.SENDER_EMAIL, // must be verified in SendGrid
      subject: "Order Successful!",
      html: `
        <h2>Your order was placed successfully!</h2>
        <p><strong>Order ID:</strong> ${order._id}</p>
        <p><strong>Total Price:</strong> ₹${order.totalPrice}</p>
      `,
    });

    console.log("Order email sent.");
  } catch (err) {
    console.error("SendGrid Email Error:", err.response?.body || err);
  }
};
