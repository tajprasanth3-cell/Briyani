import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Trash2, 
  X, 
  Minus, 
  Plus, 
  ShieldCheck
} from 'lucide-react';
import bgImage from "./Images/bacjgrund1.jpg";

const cartStyles = `
.cartPage {
  position: relative;
  min-height: 100vh;
  padding: 40px 20px;
}

.cartPage::before {
  content: "";
  position: fixed;
  inset: 0;
  background: url("${bgImage}") center/cover fixed no-repeat;
  opacity: 0.08;
  pointer-events: none;
  z-index: 0;
}

.cartPage > * {
  position: relative;
  z-index: 1;
}

.cartItemCard {
  display: flex;
  gap: 20px;
  background: rgba(255,255,255,0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.06);
  border: 1px solid rgba(107,15,15,0.06);
  transition: all 0.3s ease;
}

.cartItemCard:hover {
  box-shadow: 0 12px 32px rgba(0,0,0,0.1);
  transform: translateY(-2px);
}

@media (max-width: 1024px) {
  .cartHeader { flex-direction: column; text-align: center; gap: 12px; }
  .cartMainGrid { grid-template-columns: 1fr !important; }
  .cartBillCard { position: static !important; }
}

@media (max-width: 768px) {
  .cartPage { padding: 24px 14px !important; }
  .cartPageTitle { font-size: 24px !important; }
  .cartBillTotal { font-size: 28px !important; }
  .cartItemCard { flex-direction: column; gap: 14px; padding: 16px; }
  .cartItemImg { width: 100% !important; height: 160px !important; border-radius: 12px !important; }
  .cartEmptyEmoji { font-size: 48px !important; }
  .cartEmptyTitle { font-size: 18px !important; }
}

@media (max-width: 480px) {
  .cartPage { padding: 16px 10px !important; }
  .cartBillCard { padding: 18px !important; border-radius: 16px !important; }
  .cartItemImg { height: 140px !important; }
  .cartEmptyEmoji { font-size: 40px !important; }
  .cartCouponRow { flex-direction: column !important; }
  .cartCouponInput { width: 100% !important; }
  .cartCouponBtn { width: 100% !important; }
  .cartHeader { flex-direction: column !important; align-items: center !important; text-align: center !important; }
  .cartPageTitle { font-size: 20px !important; }
  .cartItemCard { padding: 14px !important; border-radius: 16px !important; }
}
`;

export default function Cart({ cartItems = [], onUpdateQuantity, onRemoveItem, onClearCart, appliedCoupon, onApplyCoupon }) {
  const navigate = useNavigate();
  const [couponInput, setCouponInput] = useState("");

  const deliveryCharge = 40;
  const packagingCharge = 20;

  const updateQuantity = (id, change) => {
    if (typeof onUpdateQuantity === 'function') {
      onUpdateQuantity(id, change);
    }
  };

  const removeItem = (id) => {
    if (typeof onRemoveItem === 'function') {
      onRemoveItem(id);
    }
  };

  const clearCart = () => {
    if (typeof onClearCart === 'function') {
      onClearCart();
    }
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discount = appliedCoupon
    ? appliedCoupon.flat
      ? appliedCoupon.flat
      : Math.round(subtotal * appliedCoupon.discount)
    : 0;
  const total = subtotal > 0 ? subtotal - discount + deliveryCharge + packagingCharge : 0;

  return (
    <div className="cartPage" style={{ background: "linear-gradient(135deg, #faf6f0 0%, #f3ede4 100%)" }}>
      <style>{cartStyles}</style>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        
        {/* Header */}
        <div className="cartHeader" style={{ marginBottom: "32px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px", flexWrap: "wrap" }}>
          <button onClick={() => navigate('/menu')} style={{ background: "rgba(107,15,15,0.08)", color: "#6b0f0f", border: "none", cursor: "pointer", fontSize: "14px", fontWeight: "700", display: "flex", alignItems: "center", gap: "8px", padding: "10px 20px", borderRadius: "12px" }}
            onMouseOver={(e) => e.currentTarget.style.background = "rgba(107,15,15,0.15)"}
            onMouseOut={(e) => e.currentTarget.style.background = "rgba(107,15,15,0.08)"}>
            <ArrowLeft size={20} /> Menu
          </button>
          
          <div style={{ textAlign: "center" }}>
            <h1 className="cartPageTitle" style={{ fontSize: "36px", fontWeight: "900", color: "#6b0f0f", margin: "0", letterSpacing: "1px", fontFamily: "Georgia, serif" }}>Your Royal Order</h1>
            <p style={{ fontSize: "13px", color: "#c89a2b", marginTop: "4px", fontWeight: "700", letterSpacing: "1px" }}>✦ PREMIUM DUM BIRYANI ✦</p>
          </div>

          {cartItems.length > 0 && (
            <button onClick={clearCart} style={{ background: "rgba(239,68,68,0.1)", color: "#dc2626", border: "1px solid rgba(239,68,68,0.3)", cursor: "pointer", padding: "10px 18px", borderRadius: "12px", fontSize: "13px", fontWeight: "700", display: "flex", alignItems: "center", gap: "8px" }}>
              <Trash2 size={16} /> Clear Cart
            </button>
          )}
        </div>

        <div className="cartMainGrid" style={{ display: "grid", gridTemplateColumns: cartItems.length === 0 ? "1fr" : "1fr 380px", gap: "32px", alignItems: "start" }}>
          
          {/* Items List - Vertical */}
          <div>
            {cartItems.length === 0 ? (
              <div style={{ background: "rgba(255,255,255,0.9)", backdropFilter: "blur(10px)", borderRadius: "24px", padding: "60px 40px", textAlign: "center", border: "2px dashed rgba(107,15,15,0.15)" }}>
                <div className="cartEmptyEmoji" style={{ fontSize: "72px", marginBottom: "20px", lineHeight: 1 }}>👑</div>
                <h3 style={{ fontSize: "24px", fontWeight: "700", color: "#6b0f0f", margin: "0 0 12px 0" }}>Your Feast Awaits</h3>
                <p style={{ fontSize: "16px", color: "#888", marginBottom: "32px", lineHeight: "1.6" }}>Add royal biryanis to your cart</p>
                <button onClick={() => navigate('/menu')} style={{ background: "linear-gradient(135deg, #6b0f0f, #8b1a1a)", color: "#f7c66b", border: "none", padding: "16px 36px", borderRadius: "14px", cursor: "pointer", fontSize: "16px", fontWeight: "800", letterSpacing: "0.5px" }}>
                  Explore Menu
                </button>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {cartItems.map((item) => (
                  <div key={item.id} className="cartItemCard">
                    <div className="cartItemImg" style={{ width: "120px", height: "120px", borderRadius: "14px", overflow: "hidden", flexShrink: 0 }}>
                      <img src={item.image} alt={item.name} loading="lazy" onError={(e) => e.currentTarget.src = "https://via.placeholder.com/120?text=Biryani"} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                    <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", minWidth: 0 }}>
                      <div>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                          <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#6b0f0f", margin: "0 0 4px 0" }}>{item.name}</h3>
                          <button onClick={() => removeItem(item.id)} style={{ background: "rgba(239,68,68,0.1)", border: "none", cursor: "pointer", width: "28px", height: "28px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#dc2626", flexShrink: 0 }}>
                            <X size={14} />
                          </button>
                        </div>
                        <p style={{ fontSize: "13px", color: "#888", margin: "0 0 8px 0" }}>{item.description}</p>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "8px" }}>
                        <span style={{ fontSize: "22px", fontWeight: "800", color: "#c89a2b", fontFamily: "Georgia, serif" }}>₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                        <div style={{ display: "flex", alignItems: "center", background: "#f5f0eb", borderRadius: "10px", padding: "4px" }}>
                          <button onClick={() => updateQuantity(item.id, -1)} style={{ background: "transparent", border: "none", cursor: "pointer", padding: "6px 10px", color: "#6b0f0f", display: "flex", alignItems: "center", borderRadius: "6px" }}>
                            <Minus size={14} />
                          </button>
                          <span style={{ width: "32px", textAlign: "center", fontWeight: "700", color: "#333", fontSize: "15px" }}>{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, 1)} style={{ background: "transparent", border: "none", cursor: "pointer", padding: "6px 10px", color: "#6b0f0f", display: "flex", alignItems: "center", borderRadius: "6px" }}>
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Bill Section */}
          {cartItems.length > 0 && (
            <div className="cartBillCard" style={{ background: "rgba(255,255,255,0.95)", backdropFilter: "blur(10px)", borderRadius: "24px", padding: "32px", boxShadow: "0 20px 50px rgba(0,0,0,0.1)", border: "1px solid rgba(200,154,43,0.15)", position: "sticky", top: "80px" }}>
              
              <div style={{ marginBottom: "20px" }}>
                <div className="cartCouponRow" style={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
                  <input
                    className="cartCouponInput"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                    placeholder="Enter code"
                    style={{
                      flex: 1,
                      padding: "12px 14px",
                      borderRadius: "12px",
                      border: appliedCoupon ? "2px solid #22c55e" : "2px dashed #c89a2b",
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "#333",
                      outline: "none",
                      background: appliedCoupon ? "#f0fdf4" : "#fff",
                    }}
                  />
                  <button
                    className="cartCouponBtn"
                    onClick={() => {
                      if (appliedCoupon) {
                        onApplyCoupon?.(appliedCoupon.code);
                      } else if (couponInput) {
                        onApplyCoupon?.(couponInput);
                      }
                    }}
                    style={{
                      padding: "12px 18px",
                      borderRadius: "12px",
                      border: "none",
                      background: appliedCoupon
                        ? "linear-gradient(135deg, #dc2626, #b91c1c)"
                        : "linear-gradient(135deg, #6b0f0f, #8b1a1a)",
                      color: "#f7c66b",
                      fontWeight: "800",
                      fontSize: "13px",
                      cursor: "pointer",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {appliedCoupon ? "Remove" : "Apply"}
                  </button>
                </div>
                {!appliedCoupon && (
                  <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                    {["ROYAL", "1750", "2500"].map((code) => (
                      <span
                        key={code}
                        onClick={() => {
                          setCouponInput(code);
                          onApplyCoupon?.(code);
                        }}
                        style={{
                          padding: "4px 10px",
                          borderRadius: "8px",
                          background: "rgba(247,198,107,0.15)",
                          border: "1px solid rgba(247,198,107,0.3)",
                          fontSize: "11px",
                          fontWeight: "700",
                          color: "#c89a2b",
                          cursor: "pointer",
                        }}
                      >
                        {code}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div style={{ borderTop: "2px solid #f5f0eb", paddingTop: "20px", marginBottom: "20px" }}>
                <h3 style={{ fontSize: "11px", fontWeight: "800", letterSpacing: "2px", color: "#c89a2b", textTransform: "uppercase", margin: "0 0 16px 0" }}>Order Summary</h3>
                
                <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "20px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px" }}>
                    <span style={{ color: "#888" }}>Subtotal</span>
                    <span style={{ fontWeight: "700", color: "#333" }}>₹{subtotal.toLocaleString('en-IN')}</span>
                  </div>
                  {discount > 0 && (
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px" }}>
                      <span style={{ color: "#16a34a" }}>Discount ({appliedCoupon?.label || appliedCoupon?.code})</span>
                      <span style={{ fontWeight: "700", color: "#16a34a" }}>-₹{discount.toLocaleString('en-IN')}</span>
                    </div>
                  )}
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px" }}>
                    <span style={{ color: "#888" }}>Delivery Fee</span>
                    <span style={{ fontWeight: "700", color: "#333" }}>₹{subtotal > 0 ? deliveryCharge : 0}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px" }}>
                    <span style={{ color: "#888" }}>Packaging</span>
                    <span style={{ fontWeight: "700", color: "#333" }}>₹{subtotal > 0 ? packagingCharge : 0}</span>
                  </div>
                </div>
              </div>

              <div style={{ background: "linear-gradient(135deg, #6b0f0f, #8b1a1a)", borderRadius: "16px", padding: "24px", marginBottom: "24px", textAlign: "center", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: "-20px", right: "-20px", fontSize: "80px", opacity: 0.06, lineHeight: 1 }}>👑</div>
                <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.7)", margin: "0 0 6px 0", textTransform: "uppercase", letterSpacing: "2px", fontWeight: "600" }}>Grand Total</p>
                <h2 className="cartBillTotal" style={{ fontSize: "36px", fontWeight: "900", margin: "0", color: "#f7c66b", fontFamily: "Georgia, serif" }}>₹{total.toLocaleString('en-IN')}</h2>
              </div>

              <button onClick={() => navigate('/checkout')} style={{ width: "100%", background: "linear-gradient(135deg, #6b0f0f, #8b1a1a)", color: "#f7c66b", border: "none", padding: "18px", borderRadius: "14px", cursor: "pointer", fontSize: "15px", fontWeight: "800", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "12px", transition: "all 0.3s ease" }}
                onMouseOver={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(107,15,15,0.3)"; }}
                onMouseOut={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
                Proceed to Checkout
              </button>

              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", fontSize: "11px", color: "#999", fontWeight: "600" }}>
                <ShieldCheck size={14} style={{ color: "#22c55e" }} />
                <span>Secure & 100% Authentic</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}