export async function sendEmailMessage(to, subject, message) {
  try {
    const res = await fetch("/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ to, subject, message }),
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Email send error:", err.message);
    throw err;
  }
}