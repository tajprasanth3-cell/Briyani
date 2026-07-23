import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Package, Clock, CheckCircle2, XCircle, Truck } from "lucide-react";
import { orderAPI } from "../api";
import { useAuth } from "../context/AuthContext";
import LoadingSpinner from "./LoadingSpinner";

const statusConfig = {
  pending: { color: "#d97706", bg: "#fef3c7", icon: <Clock size={14} />, label: "Pending" },
  confirmed: { color: "#2563eb", bg: "#dbeafe", icon: <CheckCircle2 size={14} />, label: "Confirmed" },
  preparing: { color: "#4f46e5", bg: "#e0e7ff", icon: <Package size={14} />, label: "Preparing" },
  ready: { color: "#059669", bg: "#d1fae5", icon: <CheckCircle2 size={14} />, label: "Ready" },
  "out-for-delivery": { color: "#9333ea", bg: "#f3e8ff", icon: <Truck size={14} />, label: "Out for Delivery" },
  delivered: { color: "#16a34a", bg: "#dcfce7", icon: <CheckCircle2 size={14} />, label: "Delivered" },
  cancelled: { color: "#dc2626", bg: "#fee2e2", icon: <XCircle size={14} />, label: "Cancelled" },
};

export default function OrderHistory() {
  const navigate = useNavigate();
  const { token } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  const loadOrders = async () => {
    try {
      const res = await orderAPI.getAll();
      setOrders(res.data.orders || res.data || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) { navigate("/login"); return; }
    loadOrders();
  }, [token, navigate]);

  const handleCancel = async (orderId) => {
    if (!confirm("Are you sure you want to cancel this order?")) return;
    try {
      await orderAPI.cancel(orderId);
      loadOrders();
    } catch (e) {
      alert(e.message);
    }
  };

  const filtered = filter === "all" ? orders : orders.filter((o) => o.status === filter);

  if (loading) return <LoadingSpinner />;

  return (
    <div style={{ minHeight: "80vh", background: "linear-gradient(135deg, #faf6f0 0%, #f3ede4 100%)", padding: "40px 20px" }}>
      <style>{`
        @media (max-width: 768px) { .ohPage { padding: 24px 14px !important; } .ohTitle { font-size: 24px !important; } }
        @media (max-width: 480px) { .ohPage { padding: 16px 10px !important; } .ohTitle { font-size: 20px !important; } .ohFilters { gap: 4px !important; } }
      `}</style>
      <div className="ohPage" style={{ maxWidth: "900px", margin: "0 auto" }}>
        <button onClick={() => navigate(-1)} style={{ background: "rgba(107,15,15,0.08)", color: "#6b0f0f", border: "none", cursor: "pointer", padding: "10px 20px", borderRadius: "12px", fontSize: "14px", fontWeight: "700", display: "flex", alignItems: "center", gap: "8px", marginBottom: "24px" }}>
          <ArrowLeft size={20} /> Back
        </button>

        <h1 className="ohTitle" style={{ fontSize: "32px", fontWeight: "900", color: "#6b0f0f", margin: "0 0 8px", fontFamily: "Georgia, serif" }}>Order History</h1>
        <p style={{ fontSize: "13px", color: "#c89a2b", marginBottom: "24px", fontWeight: "700" }}>ALL YOUR ORDERS</p>

        <div className="ohFilters" style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "24px" }}>
          {["all", "pending", "confirmed", "preparing", "delivered", "cancelled"].map((f) => (
            <button key={f} onClick={() => setFilter(f)} style={{
              padding: "8px 16px", borderRadius: "50px", border: "none",
              background: filter === f ? "linear-gradient(135deg, #6b0f0f, #8b1a1a)" : "#fff",
              color: filter === f ? "#f7c66b" : "#666",
              fontWeight: "600", fontSize: "12px", cursor: "pointer",
              textTransform: "capitalize",
            }}>
              {f}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div style={{ background: "#fff", borderRadius: "20px", padding: "60px 40px", textAlign: "center", boxShadow: "0 12px 40px rgba(0,0,0,0.06)" }}>
            <Package size={48} color="#ddd" style={{ marginBottom: "16px" }} />
            <h3 style={{ fontSize: "20px", fontWeight: "700", color: "#6b0f0f", margin: "0 0 8px" }}>No orders yet</h3>
            <p style={{ fontSize: "14px", color: "#888", marginBottom: "24px" }}>Start ordering delicious biryani!</p>
            <button onClick={() => navigate("/menu")} style={{ background: "linear-gradient(135deg, #6b0f0f, #8b1a1a)", color: "#f7c66b", border: "none", padding: "12px 28px", borderRadius: "12px", fontWeight: "700", cursor: "pointer" }}>
              Browse Menu
            </button>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {filtered.map((order) => {
              const sc = statusConfig[order.status] || statusConfig.pending;
              return (
                <div key={order._id} style={{ background: "#fff", borderRadius: "16px", padding: "24px", boxShadow: "0 8px 24px rgba(0,0,0,0.06)", border: "1px solid rgba(107,15,15,0.05)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px", flexWrap: "wrap", gap: "8px" }}>
                    <div>
                      <span style={{ fontSize: "13px", fontWeight: "700", color: "#6b0f0f", fontFamily: "monospace" }}>#{order._id?.slice(-6).toUpperCase()}</span>
                      <span style={{ fontSize: "12px", color: "#999", marginLeft: "12px" }}>{new Date(order.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
                    </div>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", padding: "4px 12px", borderRadius: "50px", fontSize: "11px", fontWeight: "700", background: sc.bg, color: sc.color, textTransform: "uppercase" }}>
                      {sc.icon} {sc.label}
                    </span>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginBottom: "12px" }}>
                    {order.items?.map((item, i) => (
                      <div key={i} style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", color: "#555" }}>
                        <span>{item.menuItem?.name || "Item"} x{item.quantity}</span>
                        <span style={{ fontWeight: "600" }}>Rs. {item.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #f0f0f0", paddingTop: "12px" }}>
                    <span style={{ fontSize: "18px", fontWeight: "900", color: "#c89a2b", fontFamily: "Georgia, serif" }}>Rs. {order.totalAmount}</span>
                    <div style={{ display: "flex", gap: "8px" }}>
                      {["pending", "confirmed"].includes(order.status) && (
                        <button onClick={() => handleCancel(order._id)} style={{ padding: "8px 16px", borderRadius: "8px", border: "1px solid #fecaca", background: "#fef2f2", color: "#dc2626", fontSize: "12px", fontWeight: "700", cursor: "pointer" }}>
                          Cancel
                        </button>
                      )}
                      <button onClick={() => navigate("/track-order")} style={{ padding: "8px 16px", borderRadius: "8px", border: "none", background: "linear-gradient(135deg, #6b0f0f, #8b1a1a)", color: "#f7c66b", fontSize: "12px", fontWeight: "700", cursor: "pointer" }}>
                        Track
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
