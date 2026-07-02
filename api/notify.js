export default async function handler(request, response) {
  if (request.method !== "POST") {
    return response.status(405).json({ error: "Method not allowed" });
  }

  try {
    // مهم: بما أنك أرسلتي التوكن هنا، جدديه من BotFather ثم ضعي الجديد هنا
    const token = "8915411941:AAFdBBhLT_SapePmpZZiVLK0pyeHSII5Ozc";

    // رقم الشات آي دي
    const chatId = "172983235";

    const body = request.body || {};
    const clickedAt = body.clickedAt || new Date().toLocaleString("ar-SA");

    const message = `
🎁 تم الضغط على زر الهدية

الزر: احصل على هديتك
الوقت: ${clickedAt}

الرسالة التي ظهرت للطفل:
أبشر يا بطل! خلال خمس دقايق وتوصل على حساب أمك بإذن الله 💙
`;

    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
        }),
      }
    );

    const telegramResult = await telegramResponse.json();

    if (!telegramResponse.ok) {
      return response.status(500).json({
        error: "Telegram failed",
        telegramResult,
      });
    }

    return response.status(200).json({
      ok: true,
      telegramResult,
    });
  } catch (error) {
    return response.status(500).json({
      error: "Notification failed",
      details: error.message,
    });
  }
}