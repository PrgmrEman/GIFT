import { useState } from "react";
import "./index.css";
import giftCard from "./assets/gift-card.png";

function App() {
  const [showMessage, setShowMessage] = useState(
    localStorage.getItem("giftSent") === "true"
  );

  const [loading, setLoading] = useState(false);

  const [sent, setSent] = useState(
    localStorage.getItem("giftSent") === "true"
  );

  const [errorMessage, setErrorMessage] = useState("");

  const giftFrom = [
    "أ/ إيمان",
    "أ/ هناء الشريف",
    "أ/ محاسن",
    "أ/ مرام",
    "أ/ لينا",
    "أ/ هدى",
    "أ/ أريج الحميدي",
    "أ/ أريج النمري",
    "أ/ بركة",
    "أ/ هناء القرشي",
    "أ/ أميرة",
    "أ/ معتوقة",
    "أ/ سارة الغريبي",
    "أ/ نهى",
    "أ/ زكية",
    "أ/ أريج الغريبي",
    "أ/ نورا",
    "أ/ عائشة",
    "أ/ عواطف",
    "أ/ مطرة",
    "أ/ نور",
  ];

  async function handleGiftClick() {
    // يمنع الضغط المتكرر أثناء الإرسال أو بعد نجاح الإرسال
    if (loading || sent) return;

    setLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch("/api/notify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          clickedAt: new Date().toLocaleString("ar-SA"),
        }),
      });

      // لو ملف الإشعار فيه خطأ أو ما وصل لتليجرام، لا نقفل الزر
      if (!response.ok) {
        throw new Error("فشل إرسال الإشعار");
      }

      // فقط إذا نجح الإرسال، نعرض الرسالة ونقفل الزر
      setShowMessage(true);
      localStorage.setItem("giftSent", "true");
      setSent(true);
    } catch (error) {
      console.log("تعذر إرسال الإشعار:", error);

      // نخلي الزر متاح عشان تقدرين تجربين مرة ثانية
      setErrorMessage("ما وصل الإشعار، جربي الضغط مرة ثانية.");
    } finally {
      setLoading(false);
    }
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

        {errorMessage && (
          <div className="error-message">
            {errorMessage}
          </div>
        )}

        {showMessage && (
          <div className="gift-message">
            <p>
              أبشر يا بطل! خلال خمس دقايق تصل هديتك على حساب أمك 💙
            </p>

            <p className="gift-from-title">هديتك من:</p>

            <p className="gift-from-names">
              {giftFrom.join(" - ")}
            </p>
          </div>
        )}
      </div>
    </main>
  );
}

export default App;