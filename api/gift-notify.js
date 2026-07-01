export default async function handler(request, response) {
  if (request.method !== "POST") {
    return response.status(405).json({ error: "Method not allowed" });
  }

  try {
    // حطي هنا التوكن الجديد من BotFather
    const token = "8915411941:AAGNa4b9YCxImFyuEVceJblIPBUfFzcZjOc";

    // حطي هنا رقم chat id
    const chatId = "819322320";

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

    if (!telegramResponse.ok) {
      return response.status(500).json({
        error: "Telegram failed",
      });
    }

    return response.status(200).json({ ok: true });
  } catch (error) {
    console.error(error);
    return response.status(500).json({ error: "Notification failed" });
  }
}