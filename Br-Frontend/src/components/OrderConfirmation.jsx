import { useNavigate, useLocation } from "react-router-dom";
import { CheckCircle2, MapPin, Clock, ShoppingBag } from "lucide-react";

export default function OrderConfirmation() {
  const navigate = useNavigate();
  const location = useLocation();
  const order = location.state?.order;

  return (
    <div style={{
      minHeight: "80vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "40px 20px",
      background: "linear-gradient(135deg, #faf6f0 0%, #f3ede4 100%)",
    }}>
      <style>{`
        @keyframes confirmPopIn { from { opacity: 0; transform: scale(0.8) translateY(30px); } to { opacity: 1; transform: scale(1) translateY(0); } }
        @keyframes confirmPulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } }
      `}</style>
      <div style={{
        maxWidth: "500px",
        width: "100%",
        background: "#fff",
        borderRadius: "24px",
        padding: "48px 40px",
        textAlign: "center",
        boxShadow: "0 24px 64px rgba(0,0,0,0.1)",
        animation: "confirmPopIn 0.5s cubic-bezier(0.34,1.56,0.64,1)",
      }}>
        <div style={{
          width: "100px",
          height: "100px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, #dcfce7, #bbf7d0)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 24px",
          animation: "confirmPulse 2s ease-in-out infinite",
        }}>
          <CheckCircle2 size={48} color="#16a34a" />
        </div>

        <h1 style={{
          fontSize: "28px",
          fontWeight: "900",
          color: "#16a34a",
          margin: "0 0 8px",
          fontFamily: "Georgia, serif",
        }}>
          Order Confirmed!
        </h1>
        <p style={{ fontSize: "15px", color: "#666", marginBottom: "32px", lineHeight: 1.7 }}>
          Your royal feast is being prepared with love
        </p>

        {order && (
          <div style={{
            background: "#fdfaf5",
            borderRadius: "16px",
            padding: "20px",
            marginBottom: "24px",
            textAlign: "left",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
              <ShoppingBag size={16} color="#6b0f0f" />
              <span style={{ fontSize: "13px", fontWeight: "700", color: "#6b0f0f" }}>Order #{order._id?.slice(-6).toUpperCase()}</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "13px", color: "#666" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Clock size={14} />
                <span>Estimated delivery: 30-45 minutes</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <MapPin size={14} />
                <span>{order.deliveryAddress || order.orderType}</span>
              </div>
            </div>
          </div>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <button
            onClick={() => navigate("/track-order")}
            style={{
              width: "100%",
              padding: "16px",
              borderRadius: "14px",
              border: "none",
              background: "linear-gradient(135deg, #6b0f0f, #8b1a1a)",
              color: "#f7c66b",
              fontWeight: "800",
              fontSize: "15px",
              cursor: "pointer",
              letterSpacing: "0.5px",
            }}
          >
            Track Order
          </button>
          <button
            onClick={() => navigate("/menu")}
            style={{
              width: "100%",
              padding: "14px",
              borderRadius: "14px",
              border: "2px solid #e0d5c7",
              background: "transparent",
              color: "#6b0f0f",
              fontWeight: "700",
              fontSize: "14px",
              cursor: "pointer",
            }}
          >
            Order More
          </button>
        </div>
      </div>
    </div>
  );
}
