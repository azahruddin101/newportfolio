import nodemailer from "nodemailer";

/**
 * Sends the contact notification email when SMTP is configured.
 * Silently no-ops when env vars are missing so the contact form
 * still works with MongoDB storage alone.
 */
export async function sendContactEmail({ name, email, subject, message }) {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_EMAIL } =
    process.env;

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) return { skipped: true };

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT || 587),
    secure: Number(SMTP_PORT) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  await transporter.sendMail({
    from: `"Portfolio Contact" <${SMTP_USER}>`,
    to: CONTACT_EMAIL || SMTP_USER,
    replyTo: email,
    subject: `[Portfolio] ${subject || "New message"} — ${name}`,
    text: `From: ${name} <${email}>\n\n${message}`,
    html: `
      <div style="font-family:sans-serif;max-width:560px;margin:0 auto;padding:24px;background:#0a0908;color:#ece7df;border-radius:12px">
        <h2 style="color:#a35e47;margin-top:0">New portfolio message</h2>
        <p><strong>From:</strong> ${name} &lt;${email}&gt;</p>
        <p><strong>Subject:</strong> ${subject || "—"}</p>
        <hr style="border-color:#2a2622" />
        <p style="white-space:pre-wrap;line-height:1.6">${message}</p>
      </div>`,
  });

  return { sent: true };
}
