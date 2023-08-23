import { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

const personalEmail = process.env.EMAIL;
const personalPwd = process.env.EMAIL_PASSWORD;


const sendEmail = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const { email, link } = req.body;

  if (typeof email !== "string" || typeof link !== "string") {
    return res
      .status(400)
      .send({ success: false, error: "Invalid input format" });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: personalEmail,
      pass: personalPwd,
    },
  });

  const mailOptions = {
    from: personalEmail,
    to: email,
    subject: "Greetings from Gaia!",
    text: `You are one step away from creating your account. Please set your password, here is your link: ${link}`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    res.status(200).send({ success: true });
  } catch (error) {
    res.status(500).send({ success: false, error: error.message });
  }
};

export default sendEmail;
