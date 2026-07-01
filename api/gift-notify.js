import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(request, response) {
  if (request.method !== "POST") {
    return response.status(405).json({ error: "Method not allowed" });
  }

  try {
    const body = request.body || {};
    const clickedAt = body.clickedAt || new Date().toLocaleString("ar-SA");

    await resend.emails.send({
      from: process.env.EMAIL_FROM,
      to: process.env.NOTIFY_EMAIL,
      subject: "تم الضغط على زر احصل على هديتك 🎁",
      html: `
        <div dir="rtl" style="font-family: Arial, sans-serif; line-height: 1.8;">
          <h2>تنبيه هدية 🎁</h2>
          <p>تم الضغط على زر <strong>احصل على هديتك</strong>.</p>
          <p><strong>وقت الضغط:</strong> ${clickedAt}</p>
          <p>الرسالة التي ظهرت للطفل:</p>
          <p style="background:#f5f8ff;padding:12px;border-radius:10px;">
            أبشر يا بطل! خمس دقايق وتوصل على حساب أمك بإذن الله 💙
          </p>
        </div>
      `,
    });

    return response.status(200).json({ ok: true });
  } catch (error) {
    console.error(error);
    return response.status(500).json({ error: "Email failed" });
  }
}