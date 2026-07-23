import { useState, useMemo } from 'react';
import { ArrowLeft, MapPin, Phone, User, Package, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { orderAPI } from '../api';
import { useAuth } from '../context/AuthContext';
import checkoutBg from "./Images/background2.jpg";

const checkoutStyles = `
.checkoutPage {
  position: relative;
}

.checkoutPage::before {
  content: "";
  position: fixed;
  inset: 0;
  background: url("${checkoutBg}") center/cover fixed no-repeat;
  opacity: 0.06;
  pointer-events: none;
  z-index: 0;
}

.checkoutPage > * {
  position: relative;
  z-index: 1;
}

@media (max-width: 1024px) {
  .checkoutGrid { grid-template-columns: 1fr !important; }
  .checkoutBill { order: -1; }
}

@media (max-width: 768px) {
  .checkoutPage { padding: 24px 14px !important; }
  .checkoutHeaderSpacer { display: none !important; }
  .checkoutPageTitle { font-size: 22px !important; }
  .checkoutFormCard { padding: 20px 16px !important; border-radius: 16px !important; }
  .checkoutCityRow { grid-template-columns: 1fr !important; }
  .checkoutHeader { flex-wrap: wrap !important; gap: 12px !important; }
  .checkoutOrderType { flex-wrap: wrap !important; }
  .checkoutBillCard { border-radius: 16px !important; padding: 20px !important; }
}

@media (max-width: 480px) {
  .checkoutPage { padding: 16px 10px !important; }
  .checkoutPageTitle { font-size: 18px !important; }
  .checkoutFormCard { padding: 16px 12px !important; border-radius: 14px !important; }
  .checkoutBillCard { padding: 16px !important; border-radius: 14px !important; }
  .checkoutGrid { gap: 20px !important; }
}
`;

export default function Checkout({ cartItems = [], appliedCoupon, onClearCart }) {
  const navigate = useNavigate();
  const { token } = useAuth();
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address: '',
    city: 'Mumbai',
    pincode: '',
    instructions: '',
    orderType: 'delivery',
  });
  const [notification, setNotification] = useState(null);
  const [placing, setPlacing] = useState(false);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = appliedCoupon
    ? appliedCoupon.flat
      ? appliedCoupon.flat
      : Math.round(subtotal * appliedCoupon.discount)
    : 0;
  const deliveryTimeEstimate = useMemo(() => {
    if (formData.orderType === "dine-in") return "Ready in ~10 min";
    if (formData.orderType === "takeaway") return "Ready in ~20 min";
    const base = 30;
    const extras = cartItems.reduce((sum, item) => sum + item.quantity, 0) > 3 ? 10 : 0;
    return `${base + extras} - ${base + extras + 15} min`;
  }, [formData.orderType, cartItems]);
  const deliveryCharge = 40;
  const packagingCharge = 20;
  const total = subtotal > 0 ? subtotal - discount + deliveryCharge + packagingCharge : 0;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = async () => {
    if (!formData.fullName || !formData.phone || !formData.address || !formData.pincode) {
      setNotification({ type: "error", message: "Please fill in all required fields!" });
      return;
    }

    if (!token) {
      setNotification({ type: "error", message: "Please login to place an order" });
      setTimeout(() => navigate('/login'), 2000);
      return;
    }

    setPlacing(true);
    try {
      const orderData = {
        items: cartItems.map((item) => ({ menuItem: item.id?.toString(), quantity: item.quantity })),
        orderType: formData.orderType,
        deliveryAddress: `${formData.address}, ${formData.city} - ${formData.pincode}`,
        specialInstructions: formData.instructions,
      };
      const res = await orderAPI.create(orderData);
      if (onClearCart) onClearCart();
      navigate('/order-confirmation', { state: { order: res.data } });
    } catch (err) {
      setNotification({ type: "error", message: err.message || "Failed to place order" });
    } finally {
      setPlacing(false);
    }
  };

  return (
    <div className="checkoutPage" style={{ minHeight: "100vh", background: "linear-gradient(135deg, #faf6f0 0%, #f3ede4 100%)", padding: "40px 20px" }}>
      <style>{checkoutStyles}</style>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

        {/* Header */}
        <div className="checkoutHeader" style={{ marginBottom: "40px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px" }}>
          <button
            onClick={() => navigate(-1)}
            style={{
              background: "rgba(107,15,15,0.08)",
              border: "none",
              cursor: "pointer",
              padding: "10px 20px",
              color: "#6b0f0f",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "14px",
              fontWeight: "700",
              borderRadius: "12px",
              transition: "all 0.2s",
            }}
            onMouseOver={(e) => e.currentTarget.style.background = "rgba(107,15,15,0.15)"}
            onMouseOut={(e) => e.currentTarget.style.background = "rgba(107,15,15,0.08)"}
          >
            <ArrowLeft size={20} /> Back
          </button>
          <div style={{ textAlign: "center" }}>
            <h1 className="checkoutPageTitle" style={{ fontSize: "34px", fontWeight: "900", color: "#6b0f0f", margin: 0, fontFamily: "Georgia, serif", letterSpacing: "1px" }}>Royal Checkout</h1>
            <p style={{ fontSize: "12px", color: "#c89a2b", fontWeight: "700", letterSpacing: "1.5px", margin: "4px 0 0 0" }}>✦ COMPLETE YOUR ORDER ✦</p>
          </div>
          <div className="checkoutHeaderSpacer" style={{ width: "80px" }} />
        </div>

        {/* Main Content */}
        <div className="checkoutGrid responsive-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px" }}>

          {/* Left: Form */}
          <div>
            <div className="checkoutFormCard" style={{ background: "#fff", borderRadius: "20px", padding: "32px", boxShadow: "0 12px 40px rgba(0,0,0,0.08)", border: "1px solid rgba(107, 15, 15, 0.1)" }}>
              <h2 style={{ fontSize: "18px", fontWeight: "800", color: "#6b0f0f", marginBottom: "24px", display: "flex", alignItems: "center", gap: "10px" }}>
                <User size={20} /> Delivery Details
              </h2>

              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

                {/* Name */}
                <div>
                  <label style={{ fontSize: "12px", fontWeight: "700", color: "#666", display: "block", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Your full name"
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      border: "2px solid #eee",
                      borderRadius: "10px",
                      fontSize: "14px",
                      fontFamily: "inherit",
                      transition: "all 0.3s ease",
                      outline: "none",
                      boxSizing: "border-box",
                    }}
                    onFocus={(e) => e.target.style.borderColor = "#c89a2b"}
                    onBlur={(e) => e.target.style.borderColor = "#eee"}
                  />
                </div>

                {/* Phone */}
                <div>
                  <label style={{ fontSize: "12px", fontWeight: "700", color: "#666", display: "flex", alignItems: "center", gap: "6px", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                    <Phone size={14} /> Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="10-digit mobile number"
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      border: "2px solid #eee",
                      borderRadius: "10px",
                      fontSize: "14px",
                      fontFamily: "inherit",
                      transition: "all 0.3s ease",
                      outline: "none",
                      boxSizing: "border-box",
                    }}
                    onFocus={(e) => e.target.style.borderColor = "#c89a2b"}
                    onBlur={(e) => e.target.style.borderColor = "#eee"}
                  />
                </div>

                {/* Address */}
                <div>
                  <label style={{ fontSize: "12px", fontWeight: "700", color: "#666", display: "flex", alignItems: "center", gap: "6px", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                    <MapPin size={14} /> Street Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Apartment, house, etc."
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      border: "2px solid #eee",
                      borderRadius: "10px",
                      fontSize: "14px",
                      fontFamily: "inherit",
                      transition: "all 0.3s ease",
                      outline: "none",
                      boxSizing: "border-box",
                    }}
                    onFocus={(e) => e.target.style.borderColor = "#c89a2b"}
                    onBlur={(e) => e.target.style.borderColor = "#eee"}
                  />
                </div>

                {/* City & Pincode */}
                <div className="checkoutCityRow" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                  <div>
                    <label style={{ fontSize: "12px", fontWeight: "700", color: "#666", display: "block", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.5px" }}>City</label>
                    <select
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      style={{
                        width: "100%",
                        padding: "12px 16px",
                        border: "2px solid #eee",
                        borderRadius: "10px",
                        fontSize: "14px",
                        fontFamily: "inherit",
                        background: "#fff",
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                        outline: "none",
                        boxSizing: "border-box",
                      }}
                      onFocus={(e) => e.target.style.borderColor = "#c89a2b"}
                      onBlur={(e) => e.target.style.borderColor = "#eee"}
                    >
                      <option>Mumbai</option>
                      <option>Hyderabad</option>
                      <option>Delhi</option>
                      <option>Bangalore</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: "12px", fontWeight: "700", color: "#666", display: "block", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Pincode</label>
                    <input
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      placeholder="6-digit pincode"
                      style={{
                        width: "100%",
                        padding: "12px 16px",
                        border: "2px solid #eee",
                        borderRadius: "10px",
                        fontSize: "14px",
                        fontFamily: "inherit",
                        transition: "all 0.3s ease",
                        outline: "none",
                        boxSizing: "border-box",
                      }}
                      onFocus={(e) => e.target.style.borderColor = "#c89a2b"}
                      onBlur={(e) => e.target.style.borderColor = "#eee"}
                    />
                  </div>
                </div>

                {/* Instructions */}
                <div>
                  <label style={{ fontSize: "12px", fontWeight: "700", color: "#666", display: "block", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Delivery Instructions</label>
                  <textarea
                    name="instructions"
                    value={formData.instructions}
                    onChange={handleInputChange}
                    placeholder="Leave with guard, ring doorbell thrice..."
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      border: "2px solid #eee",
                      borderRadius: "10px",
                      fontSize: "14px",
                      fontFamily: "inherit",
                      minHeight: "100px",
                      resize: "vertical",
                      transition: "all 0.3s ease",
                      outline: "none",
                      boxSizing: "border-box",
                    }}
                    onFocus={(e) => e.target.style.borderColor = "#c89a2b"}
                    onBlur={(e) => e.target.style.borderColor = "#eee"}
                  />
                </div>

                {/* Order Type */}
                <div>
                  <label style={{ fontSize: "12px", fontWeight: "700", color: "#666", display: "block", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Order Type</label>
                  <div className="checkoutOrderType" style={{ display: "flex", gap: "8px" }}>
                    {["delivery", "takeaway", "dine-in"].map((type) => (
                      <button key={type} type="button" onClick={() => setFormData({ ...formData, orderType: type })} style={{
                        flex: 1, padding: "10px", borderRadius: "10px", border: formData.orderType === type ? "2px solid #6b0f0f" : "2px solid #eee",
                        background: formData.orderType === type ? "rgba(107,15,15,0.08)" : "#fff",
                        color: formData.orderType === type ? "#6b0f0f" : "#666",
                        fontSize: "13px", fontWeight: "700", cursor: "pointer", textTransform: "capitalize",
                      }}>
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Order Summary */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

            {/* Order Items Card */}
            <div className="checkoutBillCard" style={{ background: "#fff", borderRadius: "20px", padding: "24px", boxShadow: "0 12px 40px rgba(0,0,0,0.08)", border: "1px solid rgba(107, 15, 15, 0.1)" }}>
              <h2 style={{ fontSize: "16px", fontWeight: "800", color: "#6b0f0f", marginBottom: "16px", display: "flex", alignItems: "center", gap: "10px" }}>
                <Package size={20} /> Order Summary
              </h2>

              <div style={{ display: "flex", flexDirection: "column", gap: "12px", paddingBottom: "16px", borderBottom: "2px solid #f0f0f0" }}>
                {cartItems.map((item) => (
                  <div key={item.id} style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                    <div style={{ width: "60px", height: "60px", borderRadius: "8px", overflow: "hidden", flexShrink: 0, background: "#f0f0f0" }}>
                      <img src={item.image} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: "14px", fontWeight: "700", color: "#6b0f0f", margin: 0 }}>{item.name}</p>
                      <p style={{ fontSize: "12px", color: "#999", margin: "2px 0 0 0" }}>{item.description || 'Standard Portion'}</p>
                      <p style={{ fontSize: "12px", color: "#c89a2b", fontWeight: "600", margin: "2px 0 0 0" }}>₹{item.price}</p>
                    </div>
                    <div style={{ fontSize: "12px", color: "#666", fontWeight: "600" }}>x{item.quantity}</div>
                  </div>
                ))}
              </div>

              {/* Bill Breakdown */}
              <div style={{ paddingTop: "16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", color: "#666", marginBottom: "8px" }}>
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                {discount > 0 && (
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", color: "#16a34a", marginBottom: "8px" }}>
                    <span>Discount ({appliedCoupon?.label || appliedCoupon?.code})</span>
                    <span>-₹{discount}</span>
                  </div>
                )}
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", color: "#666", marginBottom: "8px" }}>
                  <span>Delivery Fee</span>
                  <span>₹{deliveryCharge}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", color: "#666", marginBottom: "16px" }}>
                  <span>Packaging</span>
                  <span>₹{packagingCharge}</span>
                </div>

                {/* Delivery Time Estimate */}
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "12px 16px",
                  background: "linear-gradient(135deg, rgba(107,15,15,0.06), rgba(247,198,107,0.1))",
                  borderRadius: "12px",
                  border: "1px solid rgba(200,154,43,0.2)",
                }}>
                  <Clock size={18} color="#6b0f0f" />
                  <div>
                    <p style={{ margin: 0, fontSize: "12px", fontWeight: "700", color: "#6b0f0f", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                      Estimated {formData.orderType === "delivery" ? "Delivery" : "Ready"} Time
                    </p>
                    <p style={{ margin: "2px 0 0", fontSize: "14px", fontWeight: "800", color: "#1a0404" }}>{deliveryTimeEstimate}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Total Card */}
            <div style={{
              background: "linear-gradient(135deg, #6b0f0f 0%, #8b1a1a 100%)",
              borderRadius: "20px",
              padding: "24px",
              boxShadow: "0 12px 40px rgba(107, 15, 15, 0.2)",
              border: "1px solid rgba(200, 154, 43, 0.2)",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                <span style={{ fontSize: "16px", fontWeight: "600", color: "#fff" }}>Total Amount</span>
                <span style={{ fontSize: "28px", fontWeight: "800", color: "#f7c66b" }}>₹{total}</span>
              </div>
              <button
                onClick={handlePlaceOrder}
                disabled={placing}
                style={{
                  width: "100%",
                  padding: "16px",
                  background: "linear-gradient(135deg, #c89a2b 0%, #f7c66b 100%)",
                  border: "none",
                  borderRadius: "12px",
                  color: "#6b0f0f",
                  fontSize: "16px",
                  fontWeight: "800",
                  cursor: placing ? "not-allowed" : "pointer",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  opacity: placing ? 0.7 : 1,
                  transition: "all 0.3s ease",
                }}
                onMouseOver={(e) => {
                  if (!placing) {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow = "0 12px 32px rgba(107, 15, 15, 0.3)";
                  }
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {placing ? "Placing Order..." : "Place Order"}
              </button>

              {/* Trust Badge */}
              <div style={{ textAlign: "center", fontSize: "12px", color: "#ddd", fontWeight: "600", marginTop: "16px" }}>
                ✓ Secure checkout • 100% authentic • Quick delivery
              </div>
            </div>
          </div>
        </div>
      </div>

      {notification && (
        <div
          onClick={() => setNotification(null)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "rgba(0,0,0,0.55)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            animation: "checkoutFadeIn 0.3s ease",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "linear-gradient(145deg, rgba(255,255,255,0.95), rgba(255,255,255,0.85))",
              borderRadius: "24px",
              padding: "48px 40px 40px",
              maxWidth: "400px",
              width: "100%",
              textAlign: "center",
              boxShadow: "0 32px 80px rgba(0,0,0,0.25), 0 0 0 1px rgba(255,255,255,0.2) inset",
              animation: "checkoutPopIn 0.4s cubic-bezier(0.34,1.56,0.64,1)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "4px",
              background: notification.type === "success"
                ? "linear-gradient(90deg, #22c55e, #16a34a, #22c55e)"
                : "linear-gradient(90deg, #ef4444, #dc2626, #ef4444)",
            }} />

            <div style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              background: notification.type === "success"
                ? "linear-gradient(135deg, #dcfce7, #bbf7d0)"
                : "linear-gradient(135deg, #fee2e2, #fecaca)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 20px",
              boxShadow: notification.type === "success"
                ? "0 8px 24px rgba(34,197,94,0.2)"
                : "0 8px 24px rgba(239,68,68,0.2)",
            }}>
              {notification.type === "success" ? (
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" style={{ animation: "checkoutCheck1 0.4s 0.3s ease both" }} />
                  <polyline points="22 4 12 14.01 9 11.01" style={{ animation: "checkoutCheck2 0.3s 0.6s ease both" }} />
                </svg>
              ) : (
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" style={{ animation: "checkoutCheck1 0.4s 0.3s ease both" }} />
                  <line x1="15" y1="9" x2="9" y2="15" style={{ animation: "checkoutCheck2 0.3s 0.6s ease both" }} />
                  <line x1="9" y1="9" x2="15" y2="15" style={{ animation: "checkoutCheck2 0.3s 0.6s ease both" }} />
                </svg>
              )}
            </div>

            <h3 style={{
              fontSize: "22px",
              fontWeight: "800",
              color: notification.type === "success" ? "#16a34a" : "#dc2626",
              margin: "0 0 8px",
              fontFamily: "Georgia, serif",
              letterSpacing: "0.5px",
            }}>
              {notification.type === "success" ? "Order Placed!" : "Oops!"}
            </h3>
            <p style={{ fontSize: "14px", color: "#666", margin: "0 0 28px", lineHeight: 1.7, fontWeight: 500 }}>
              {notification.message}
            </p>
            <button
              onClick={() => {
                setNotification(null);
                if (notification.type === "success") navigate('/track-order');
              }}
              style={{
                padding: "14px 40px",
                borderRadius: "14px",
                border: "none",
                background: notification.type === "success"
                  ? "linear-gradient(135deg, #6b0f0f, #8b1a1a)"
                  : "linear-gradient(135deg, #dc2626, #b91c1c)",
                color: notification.type === "success" ? "#f7c66b" : "#fff",
                fontWeight: "800",
                fontSize: "14px",
                cursor: "pointer",
                letterSpacing: "0.5px",
                boxShadow: notification.type === "success"
                  ? "0 8px 24px rgba(107,15,15,0.3)"
                  : "0 8px 24px rgba(220,38,38,0.3)",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => { e.target.style.transform = "translateY(-2px)"; }}
              onMouseLeave={(e) => { e.target.style.transform = "translateY(0)"; }}
            >
              {notification.type === "success" ? "Track Order" : "Got it"}
            </button>
          </div>
        </div>
      )}
      <style>{`
        @keyframes checkoutFadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes checkoutPopIn { from { opacity: 0; transform: scale(0.8) translateY(20px); } to { opacity: 1; transform: scale(1) translateY(0); } }
        @keyframes checkoutCheck1 { from { stroke-dasharray: 100; stroke-dashoffset: 100; } to { stroke-dashoffset: 0; } }
        @keyframes checkoutCheck2 { from { stroke-dasharray: 100; stroke-dashoffset: 100; } to { stroke-dashoffset: 0; } }
      `}</style>
    </div>
  );
}   