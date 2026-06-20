import { useState } from "react";
import { dbAdd } from "../db.js";
import { sendEmailMessage } from "../utils/emailService.js";

const F = ({ name, label, type = "text", placeholder, options, required, form, setForm, errors, setErrors }) => {
  return (
    <div className="form-group">
      <label className="form-label">{label}{required && " *"}</label>
      {options ? (
        <select value={form[name]} onChange={e => {
          setForm(p => ({ ...p, [name]: e.target.value }));
          setErrors(p => ({ ...p, [name]: "" }));
        }}>
          {options.map(o => <option key={o}>{o}</option>)}
        </select>
      ) : (
        <input
          type={type}
          style={errors[name] ? { borderColor: "#ef4444" } : {}}
          value={form[name]}
          onChange={e => {
            setForm(p => ({ ...p, [name]: e.target.value }));
            setErrors(p => ({ ...p, [name]: "" }));
          }}
          placeholder={placeholder}
        />
      )}
      {errors[name] && <div className="form-error">{errors[name]}</div>}
    </div>
  );
};

export default function BookingPage() {
  const [form, setForm] = useState({
    customerName: "", mobile: "", email: "", pickup: "",
    drop: "", date: "", time: "", vehicleType: "Sedan", passengers: 1, notes: ""
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.customerName.trim()) e.customerName = "Name is required";
    if (!form.mobile.match(/^[6-9]\d{9}$/)) e.mobile = "Enter a valid 10-digit mobile number";
    if (!form.email.trim()) e.email = "Email is required to receive booking updates";
    else if (!form.email.match(/\S+@\S+\.\S+/)) e.email = "Enter a valid email address";
    if (!form.pickup.trim()) e.pickup = "Pickup location required";
    if (!form.drop.trim()) e.drop = "Drop location required";
    if (!form.date) e.date = "Travel date required";
    if (!form.time) e.time = "Travel time required";
    return e;
  };

  const submit = async () => {
    const e = validate();
    if (Object.keys(e).length) return setErrors(e);
    setLoading(true);
    const bookingRef = "SCB-" + (Math.floor(Math.random() * 90000) + 10000);
    await dbAdd("bookings", {
      ...form, status: "pending", bookingRef,
      submittedAt: new Date().toISOString(), assignedDriver: ""
    });

    // Send confirmation email to user that booking is received and pending approval
    try {
      await sendEmailMessage(
        form.email,
        "Booking Received – Awaiting Confirmation | Sana Cab",
        `Dear ${form.customerName},

Your booking request has been received and is awaiting admin confirmation.

━━━━━━━━━━━━━━━━━━━━━━━━
BOOKING REFERENCE: ${bookingRef}
━━━━━━━━━━━━━━━━━━━━━━━━

Trip Details:
📍 Pickup  : ${form.pickup}
🏁 Drop    : ${form.drop}
📅 Date    : ${form.date}
🕐 Time    : ${form.time}
🚗 Vehicle : ${form.vehicleType}
👥 Passengers: ${form.passengers}

Status: ⏳ PENDING ADMIN APPROVAL

Our admin will review your booking and you will receive a confirmation or cancellation email shortly.

📞 Call us: +91 97905 82382
📧 Email: kumarsandhiya561@gmail.com

Thank you for choosing SANA CAB!`,
        `<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#0d0d0d;font-family:'Segoe UI',Arial,sans-serif;">
  <div style="max-width:600px;margin:0 auto;background:#161616;border-radius:16px;overflow:hidden;border:1px solid rgba(255,214,0,0.15);">
    <div style="background:linear-gradient(135deg,#1a1a00,#2a2200);padding:36px 32px;text-align:center;border-bottom:2px solid #FFD600;">
      <div style="font-size:48px;margin-bottom:12px;">🎉</div>
      <h1 style="color:#FFD600;font-size:28px;margin:0;letter-spacing:2px;font-weight:900;">BOOKING RECEIVED!</h1>
      <p style="color:rgba(255,255,255,0.6);margin:10px 0 0;font-size:14px;">Your request is awaiting admin confirmation</p>
    </div>
    <div style="padding:32px;">
      <p style="color:#f5f5f5;font-size:15px;margin-bottom:24px;">Dear <strong style="color:#FFD600;">${form.customerName}</strong>,</p>
      <p style="color:rgba(255,255,255,0.7);font-size:14px;line-height:1.7;margin-bottom:28px;">
        We've successfully received your booking request! Our admin team will review it and confirm your cab. You'll receive an email once your booking is accepted or if there are any issues.
      </p>
      <div style="background:rgba(255,214,0,0.07);border:1px solid rgba(255,214,0,0.25);border-radius:12px;padding:20px;text-align:center;margin-bottom:24px;">
        <div style="color:rgba(255,255,255,0.4);font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;margin-bottom:8px;">BOOKING REFERENCE</div>
        <div style="color:#FFD600;font-size:32px;font-weight:900;letter-spacing:3px;">${bookingRef}</div>
      </div>
      <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);border-radius:12px;padding:20px;margin-bottom:24px;">
        <h3 style="color:#FFD600;font-size:13px;text-transform:uppercase;letter-spacing:1px;margin:0 0 16px;">📋 Trip Details</h3>
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="color:rgba(255,255,255,0.4);font-size:12px;padding:7px 0;width:120px;">📍 Pickup</td><td style="color:#f5f5f5;font-size:13px;font-weight:600;">${form.pickup}</td></tr>
          <tr><td style="color:rgba(255,255,255,0.4);font-size:12px;padding:7px 0;">🏁 Drop</td><td style="color:#f5f5f5;font-size:13px;font-weight:600;">${form.drop}</td></tr>
          <tr><td style="color:rgba(255,255,255,0.4);font-size:12px;padding:7px 0;">📅 Date</td><td style="color:#f5f5f5;font-size:13px;font-weight:600;">${form.date}</td></tr>
          <tr><td style="color:rgba(255,255,255,0.4);font-size:12px;padding:7px 0;">🕐 Time</td><td style="color:#f5f5f5;font-size:13px;font-weight:600;">${form.time}</td></tr>
          <tr><td style="color:rgba(255,255,255,0.4);font-size:12px;padding:7px 0;">🚗 Vehicle</td><td style="color:#f5f5f5;font-size:13px;font-weight:600;">${form.vehicleType}</td></tr>
          <tr><td style="color:rgba(255,255,255,0.4);font-size:12px;padding:7px 0;">👥 Passengers</td><td style="color:#f5f5f5;font-size:13px;font-weight:600;">${form.passengers}</td></tr>
        </table>
      </div>
      <div style="background:rgba(255,214,0,0.06);border:1px solid rgba(255,214,0,0.15);border-radius:10px;padding:14px;text-align:center;margin-bottom:24px;">
        <span style="color:#FFD600;font-weight:700;font-size:13px;">⏳ Status: Pending Admin Approval</span>
      </div>
      <div style="border-top:1px solid rgba(255,255,255,0.08);padding-top:20px;text-align:center;">
        <p style="color:rgba(255,255,255,0.4);font-size:13px;margin-bottom:8px;">Need help? Contact us:</p>
        <p style="color:#FFD600;font-size:14px;font-weight:700;margin:4px 0;">📞 +91 97905 82382</p>
        <p style="color:rgba(255,255,255,0.5);font-size:13px;margin:4px 0;">📧 kumarsandhiya561@gmail.com</p>
      </div>
    </div>
    <div style="background:#111;padding:18px;text-align:center;border-top:1px solid rgba(255,255,255,0.06);">
      <p style="color:rgba(255,255,255,0.2);font-size:11px;margin:0;">© ${new Date().getFullYear()} SANA CAB · All rights reserved</p>
    </div>
  </div>
</body>
</html>`
      );
    } catch (err) {
      console.error("Email failed:", err.message);
    }

    setSuccess({ bookingRef, email: form.email, customerName: form.customerName });
    setLoading(false);
  };

  if (success) return (
    <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div className="glass fadeUp" style={{ maxWidth: 500, width: "100%", padding: 48, textAlign: "center" }}>
        <div style={{ fontSize: 64, marginBottom: 16 }}>🎉</div>
        <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 32, letterSpacing: 1, marginBottom: 8 }}>Booking Received!</h2>
        <p style={{ color: "rgba(255,255,255,.5)", marginBottom: 24, lineHeight: 1.7 }}>
          We'll call you shortly to confirm your cab. Thank you for choosing <strong style={{ color: "#FFD600" }}>SANA CAB!</strong>
        </p>

        {/* Pending Status Badge */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          background: "rgba(255,214,0,.1)", border: "1px solid rgba(255,214,0,.3)",
          borderRadius: 30, padding: "8px 20px", marginBottom: 28
        }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#FFD600", display: "inline-block", animation: "pulse 1.5s infinite" }} />
          <span style={{ color: "#FFD600", fontWeight: 700, fontSize: 13, letterSpacing: 1 }}>⏳ Awaiting Admin Approval</span>
        </div>

        {/* Booking Ref */}
        <div style={{ background: "rgba(255,214,0,.07)", border: "1px solid rgba(255,214,0,.2)", borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <div className="form-label" style={{ textAlign: "center", marginBottom: 6 }}>Booking Reference</div>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 36, color: "#FFD600", letterSpacing: 2 }}>{success.bookingRef}</div>
        </div>

        {/* Email notification info */}
        <div style={{
          background: "rgba(52,211,153,.06)", border: "1px solid rgba(52,211,153,.2)",
          borderRadius: 10, padding: 14, marginBottom: 20, fontSize: 13,
          color: "rgba(255,255,255,.6)", lineHeight: 1.6
        }}>
          ✉️ A confirmation email has been sent to <strong style={{ color: "#34d399" }}>{success.email}</strong>.<br />
          You will receive another email once admin <strong>accepts or rejects</strong> your booking.
        </div>

        {/* Contact */}
        <div style={{ background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.08)", borderRadius: 10, padding: 14, marginBottom: 24, fontSize: 13, color: "rgba(255,255,255,.5)", textAlign: "left" }}>
          📞 <strong style={{ color: "#fff" }}>Call us:</strong> +91 97905 82382<br />
          📧 <strong style={{ color: "#fff" }}>Email:</strong> kumarsandhiya561@gmail.com
        </div>

        <button className="btn btn-yellow" style={{ width: "100%" }} onClick={() => {
          setSuccess(null);
          setForm({ customerName: "", mobile: "", email: "", pickup: "", drop: "", date: "", time: "", vehicleType: "Sedan", passengers: 1, notes: "" });
        }}>Book Another Cab</button>
      </div>
    </div>
  );

  return (
    <div style={{ maxWidth: 760, margin: "0 auto", padding: "52px 24px" }}>
      <div style={{ textAlign: "center", marginBottom: 36 }}>
        <div className="section-label">Reserve Your Seat</div>
        <h1 className="section-title">Book Your Cab</h1>
        <p style={{ color: "rgba(255,255,255,.45)", marginTop: 10, fontSize: 15 }}>Fill in the details below and we'll confirm your ride</p>
      </div>
      <div className="glass" style={{ padding: 36 }}>
        <h3 style={{ fontWeight: 700, color: "#FFD600", marginBottom: 20, fontSize: 13, textTransform: "uppercase", letterSpacing: 1 }}>👤 Your Details</h3>
        <div className="grid-2">
          <F name="customerName" label="Full Name" required placeholder="Your full name" form={form} setForm={setForm} errors={errors} setErrors={setErrors} />
          <F name="mobile" label="Mobile Number" required placeholder="10-digit mobile number" form={form} setForm={setForm} errors={errors} setErrors={setErrors} />
        </div>
        <F name="email" label="Email Address" required placeholder="your@email.com (required for booking updates)" form={form} setForm={setForm} errors={errors} setErrors={setErrors} />
        <h3 style={{ fontWeight: 700, color: "#FFD600", margin: "24px 0 20px", fontSize: 13, textTransform: "uppercase", letterSpacing: 1 }}>📍 Trip Details</h3>
        <div className="grid-2">
          <F name="pickup" label="Pickup Location" required placeholder="City / address / landmark" form={form} setForm={setForm} errors={errors} setErrors={setErrors} />
          <F name="drop" label="Drop Location" required placeholder="Destination city / address" form={form} setForm={setForm} errors={errors} setErrors={setErrors} />
        </div>
        <div className="grid-2">
          <F name="date" label="Travel Date" required type="date" form={form} setForm={setForm} errors={errors} setErrors={setErrors} />
          <F name="time" label="Travel Time" required type="time" form={form} setForm={setForm} errors={errors} setErrors={setErrors} />
        </div>
        <div className="grid-2">
          <F name="vehicleType" label="Vehicle Type" options={["Sedan", "SUV", "Hatchback", "Minivan", "Luxury"]} form={form} setForm={setForm} errors={errors} setErrors={setErrors} />
          <div className="form-group">
            <label className="form-label">Passengers</label>
            <input type="number" min={1} max={8} value={form.passengers} onChange={e => setForm(p => ({ ...p, passengers: parseInt(e.target.value) || 1 }))} />
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Notes / Special Requests</label>
          <textarea style={{ height: 80, resize: "vertical" }} value={form.notes} onChange={e => setForm(p => ({ ...p, notes: e.target.value }))} placeholder="Luggage details, special needs, meeting point…" />
        </div>
        <div style={{ background: "rgba(255,214,0,.05)", border: "1px solid rgba(255,214,0,.15)", borderRadius: 10, padding: 14, marginBottom: 22, fontSize: 13, color: "rgba(255,255,255,.5)", lineHeight: 1.6 }}>
          💡 After booking, your request goes to our admin for approval. You'll receive a confirmation email once accepted. No hidden charges.
        </div>
        <button className="btn btn-yellow" style={{ width: "100%", fontSize: 16, padding: "14px" }} onClick={submit} disabled={loading}>
          {loading ? "Submitting…" : "🚕 Submit Booking Request"}
        </button>
      </div>
    </div>
  );
}