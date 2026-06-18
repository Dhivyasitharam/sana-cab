import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ✅ Check email config on startup
transporter.verify((error) => {
  if (error) {
    console.error("❌ Email config error:", error.message);
  } else {
    console.log("✅ Email transporter ready!");
  }
});

app.post("/api/send-email", async (req, res) => {
  const { to, subject, message } = req.body;

  if (!to || !message) {
    return res.status(400).json({ error: "Missing to or message" });
  }

  try {
    await transporter.sendMail({
      from: `"Sana Cab" <${process.env.EMAIL_USER}>`,
      to: to,
      subject: subject || "Sana Cab Notification",
      text: message,
      html: `<p>${message}</p>`,
    });
    res.json({ success: true });
  } catch (err) {
    console.error("❌ Email error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

app.get("/", (req, res) => {
  res.send("🚖 Sana Cab Server is Running!");
});

app.listen(4000, () => console.log("✅ Email server running on port 4000"));