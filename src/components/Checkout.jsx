import { useState } from 'react';
import { ArrowLeft, MapPin, Phone, User, Package } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
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
  .checkoutPage { padding: 24px 12px !important; }
  .checkoutHeaderSpacer { display: none !important; }
  .checkoutPageTitle { font-size: 24px !important; }
  .checkoutFormCard { padding: 24px 16px !important; }
  .checkoutCityRow { grid-template-columns: 1fr !important; }
}

@media (max-width: 480px) {
  .checkoutPageTitle { font-size: 20px !important; }
  .checkoutFormCard { padding: 20px 12px !important; }
  .checkoutBillCard { padding: 16px !important; }
}
`;

export default function Checkout({ cartItems = [], appliedCoupon }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address: '',
    city: 'Mumbai',
    pincode: '',
    instructions: '',
  });
  const [notification, setNotification] = useState(null);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = appliedCoupon
    ? appliedCoupon.flat
      ? appliedCoupon.flat
      : Math.round(subtotal * appliedCoupon.discount)
    : 0;
  const deliveryCharge = 40;
  const packagingCharge = 20;
  const total = subtotal - discount + deliveryCharge + packagingCharge;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = () => {
    if (!formData.fullName || !formData.phone || !formData.address || !formData.pincode) {
      setNotification({ type: "error", message: "Please fill in all required fields!" });
      return;
    }
    setNotification({ type: "success", message: "Your royal order has been placed! 👑" });
    setTimeout(() => navigate('/track-order'), 2000);
  };

  return (
    <div className="checkoutPage" style={{ minHeight: "100vh", background: "linear-gradient(135deg, #faf6f0 0%, #f3ede4 100%)", padding: "40px 20px" }}>
      <style>{checkoutStyles}</style>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        
        {/* Header */}
        <div style={{ marginBottom: "40px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px" }}>
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
                style={{
                  width: "100%",
                  padding: "16px",
                  background: "linear-gradient(135deg, #c89a2b 0%, #f7c66b 100%)",
                  border: "none",
                  borderRadius: "12px",
                  color: "#6b0f0f",
                  fontSize: "16px",
                  fontWeight: "800",
                  cursor: "pointer",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  transition: "all 0.3s ease",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 12px 32px rgba(107, 15, 15, 0.3)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                Place Order
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
            background: "rgba(0,0,0,0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#fff",
              borderRadius: "20px",
              padding: "40px 32px 32px",
              maxWidth: "360px",
              width: "100%",
              textAlign: "center",
              boxShadow: "0 24px 64px rgba(0,0,0,0.3)",
            }}
          >
            <div style={{ fontSize: "48px", marginBottom: "12px", lineHeight: 1 }}>
              {notification.type === "success" ? "👑" : "⚠️"}
            </div>
            <h3 style={{
              fontSize: "18px",
              fontWeight: "800",
              color: notification.type === "success" ? "#16a34a" : "#dc2626",
              margin: "0 0 8px",
              fontFamily: "Georgia, serif",
            }}>
              {notification.type === "success" ? "Order Placed!" : "Oops!"}
            </h3>
            <p style={{ fontSize: "14px", color: "#666", margin: "0 0 20px", lineHeight: 1.6 }}>
              {notification.message}
            </p>
            <button
              onClick={() => {
                setNotification(null);
                if (notification.type === "success") navigate('/track-order');
              }}
              style={{
                padding: "12px 32px",
                borderRadius: "12px",
                border: "none",
                background: "linear-gradient(135deg, #6b0f0f, #8b1a1a)",
                color: "#f7c66b",
                fontWeight: "800",
                fontSize: "14px",
                cursor: "pointer",
              }}
            >
              {notification.type === "success" ? "Track Order" : "Got it"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}   