import { useState } from "react";
import "./index.css";
import giftCard from "./assets/gift-card.png";

function App() {
  const [showMessage, setShowMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

async function handleGiftClick() {
  // يمنع الضغط مرة ثانية
  if (loading || sent) return;

  setLoading(true);
  setShowMessage(true);

  try {
    await fetch("/api/notify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        clickedAt: new Date().toLocaleString("ar-SA"),
      }),
    });

    // بعد الإرسال نقفل الزر نهائيًا
    setSent(true);
  } catch (error) {
    console.log("تعذر إرسال الإشعار:", error);

    // حتى لو صار خطأ، نقفله عشان ما يكرر الضغط
    setSent(true);
  }

  setLoading(false);
}

  return (
    <main className="page">
      <div className="card-container">
        <img
          src={giftCard}
          alt="بطاقة تهنئة بالشفاء والنجاح"
          className="gift-image"
        />

<button
  className="gift-button"
  onClick={handleGiftClick}
  disabled={loading || sent}
>
  {loading
    ? "جاري الإرسال..."
    : sent
    ? "تم إرسال طلب الهدية ✅"
    : "احصل على هديتك"}
</button>

        {showMessage && (
          <div className="gift-message">
             أبشر يا بطل! خلال خمس دقايق وتوصل على حساب أمك بإذن الله 💙
<p>
             هديتك من</p>
              أ/ايمان-أ/هناء الشريف-أ/محاسن-أ/مرام-أ/لينا-أ/هدى-أ/اريج الحميدي-أ/اريج النمري-أ/بركه-أ/هناء القرشي-أ/أميرة-أ/معتوقه-أ/سارة الغريبي-أ/نهى-أ/زكيه-أ/اريج الغريبي-أ/نورا -أ/عائشة-أ/عواطف-أ/مطرة
          </div>
        )}
      </div>
    </main>
  );
}

export default App;