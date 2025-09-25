import OrderResiveEmail from "@/components/order-review-email";
import { ShippingAddress } from "@prisma/client";
import { render } from "@react-email/components";
import nodemailer from "nodemailer";

// إعداد الناقل (Transporter)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "abdallaemad1.3.2.0.0.5@gmail.com",
    pass: process.env.G_SECRET,
  },
});

export const sendOrderEmail = async ({
  orderId,
  orderDate,
  shippingAddress,
  mailTo,
}: {
  orderId: string;
  orderDate: string;
  shippingAddress: ShippingAddress;
  mailTo: string;
}) => {
  try {
    const emailHTML = await render(
      OrderResiveEmail({ orderId, orderDate, shippingAddress })
    );
    const mailOptions = {
      from: "abdallaemad1.3.2.0.0.5@gmail.com",
      to: mailTo,
      subject: "Your Case Is On The Way!",
      html: emailHTML,
    };
    transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
