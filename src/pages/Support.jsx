import { Mail, MessageCircle } from "lucide-react";

export default function Support() {
  const companyEmail = "subratdude98@gmail.com"; // change to your support email
  const whatsappNumber = "918328894189"; // include country code (no + sign)

  // Open Gmail Compose directly
  const openGmail = () => {
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${companyEmail}&su=${encodeURIComponent(
      "Support Request"
    )}&body=${encodeURIComponent("Hi Team,\n\nI need help regarding...")}`;
    window.open(gmailUrl, "_blank", "noopener,noreferrer");
  };

  // Open WhatsApp Chat
  const openWhatsApp = () => {
    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
        "Hi The Tribe Service Team, I need help regarding..."
      )}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-10">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md text-center">
        <h2 className="text-2xl font-semibold text-[#101828] mb-2">Need Help?</h2>
        <p className="text-gray-600 mb-6 text-sm sm:text-base">
          Our support team is here to assist you.<br />
          Reach us via Gmail or WhatsApp anytime.
        </p>

        {/* Company Number */}
        <div className="text-gray-800 font-semibold mb-6 text-lg">📞 +91 98765 43210</div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={openGmail}
            className="flex items-center justify-center gap-2 w-full sm:w-auto px-4 py-2 bg-[#101828] text-white rounded-lg font-medium hover:bg-opacity-90 transition"
          >
            <Mail size={16} />
            Mail via Gmail
          </button>

          <button
            onClick={openWhatsApp}
            className="flex items-center justify-center gap-2 w-full sm:w-auto px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition"
          >
            <MessageCircle size={16} />
            Chat on WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
}
