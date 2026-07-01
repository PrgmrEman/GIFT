import { useState } from "react";
import "./index.css";
import giftCard from "./assets/gift-card.png";

function App() {
  const [showMessage, setShowMessage] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleGiftClick() {
    setLoading(true);
    setShowMessage(true);

    try {
      await fetch("/api/gift-notify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          clickedAt: new Date().toLocaleString("ar-SA"),
        }),
      });
    } catch (error) {
      console.log("ما تم إرسال الإشعار:", error);
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
          disabled={loading}
        >
          {loading ? "جاري تجهيز هديتك..." : "احصل على هديتك"}
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