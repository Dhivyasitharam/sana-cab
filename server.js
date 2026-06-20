import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "5mb" }));

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // TLS
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

// ✅ Verify email config on startup
transporter.verify((error) => {
  if (error) {
    console.error("❌ Email config error:", error.message);
  } else {
    console.log("✅ Email transporter ready! Sending from:", process.env.EMAIL_USER);
  }
});

app.post("/api/send-email", async (req, res) => {
  const { to, subject, message, html } = req.body;

  console.log("\n📨 ─────────────────────────────────");
  console.log("   TO      :", to);
  console.log("   SUBJECT :", subject);

  if (!to || !message) {
    console.log("   ❌ Missing 'to' or 'message'");
    return res.status(400).json({ error: "Missing to or message" });
  }

  try {
    const info = await transporter.sendMail({
      from: `"SANA CAB Bookings" <${process.env.EMAIL_USER}>`,
      replyTo: process.env.EMAIL_USER,
      to: to,
      subject: subject || "Sana Cab Notification",
      // Plain text fallback
      text: message,
      // HTML email body
      html: html || `<div style="font-family:Arial,sans-serif;white-space:pre-line;padding:20px;">${message}</div>`,
      // Headers to improve deliverability & avoid spam
      headers: {
        "X-Priority": "1",
        "X-Mailer": "Sana Cab Booking System",
        "Importance": "high",
      },
    });

    console.log("   ✅ Email SENT! MessageID:", info.messageId);
    console.log("   ✅ Accepted by:", info.accepted);
    console.log("   ⏩ Response   :", info.response);
    res.json({ success: true, messageId: info.messageId, accepted: info.accepted });

  } catch (err) {
    console.error("   ❌ Email FAILED:", err.message);
    res.status(500).json({ error: err.message });
  }
});

app.get("/", (req, res) => {
  res.send("🚖 Sana Cab Email Server is Running! POST /api/send-email to send emails.");
});

app.listen(4000, () => {
  console.log("🚖 ─────────────────────────────────");
  console.log("   Sana Cab Email Server on port 4000");
  console.log("   Gmail account:", process.env.EMAIL_USER);
  console.log("─────────────────────────────────");
});