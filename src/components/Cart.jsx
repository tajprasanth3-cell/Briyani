import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Trash2, 
  X, 
  Minus, 
  Plus, 
  ChevronRight, 
  ShieldCheck 
} from 'lucide-react';

export default function Cart({ cartItems = [], onUpdateQuantity, onRemoveItem, onClearCart }) {
  const navigate = useNavigate();

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

  // Checkout Math Order Summaries
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const total = subtotal > 0 ? subtotal + deliveryCharge + packagingCharge : 0;

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #faf6f0 0%, #f3ede4 100%)", padding: "40px 20px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        
        {/* Header Section */}
        <div style={{ marginBottom: "40px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "20px", flexWrap: "wrap" }}>
          <button
            onClick={() => navigate('/menu')}
            style={{
              background: "transparent",
              color: "#6b0f0f",
              border: "none",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "700",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 16px",
              borderRadius: "8px",
              transition: "all 0.3s ease",
            }}
            onMouseOver={(e) => e.target.style.background = "rgba(107, 15, 15, 0.08)"}
            onMouseOut={(e) => e.target.style.background = "transparent"}
          >
            <ArrowLeft size={20} /> Back to Menu
          </button>
          
          <div style={{ textAlign: "center" }}>
            <h1 style={{ fontSize: "36px", fontWeight: "900", color: "#6b0f0f", margin: "0", letterSpacing: "-0.5px" }}>Your Order</h1>
            <p style={{ fontSize: "13px", color: "#c89a2b", marginTop: "4px", fontWeight: "600", letterSpacing: "0.5px" }}>Review & Proceed</p>
          </div>

          {cartItems.length > 0 && (
            <button 
              onClick={clearCart}
              style={{
                background: "rgba(239, 68, 68, 0.1)",
                color: "#dc2626",
                border: "1px solid rgba(239, 68, 68, 0.3)",
                cursor: "pointer",
                padding: "8px 16px",
                borderRadius: "8px",
                fontSize: "14px",
                fontWeight: "600",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                transition: "all 0.3s ease",
              }}
              onMouseOver={(e) => {
                e.target.style.background = "rgba(239, 68, 68, 0.15)";
                e.target.style.borderColor = "rgba(239, 68, 68, 0.5)";
              }}
              onMouseOut={(e) => {
                e.target.style.background = "rgba(239, 68, 68, 0.1)";
                e.target.style.borderColor = "rgba(239, 68, 68, 0.3)";
              }}
            >
              <Trash2 size={16} /> Clear
            </button>
          )}
        </div>

        {/* Main Content Grid */}
        <div style={{ display: "grid", gridTemplateColumns: cartItems.length === 0 ? "1fr" : "repeat(auto-fit, minmax(280px, 1fr))", gap: "32px", gridAutoFlow: "dense" }}>
          
          {/* Items Section */}
          <div style={{ gridColumn: cartItems.length === 0 ? "1" : "span 2" }}>
            {cartItems.length === 0 ? (
              <div style={{ 
                background: "#fff", 
                borderRadius: "24px", 
                padding: "60px 40px", 
                textAlign: "center", 
                boxShadow: "0 10px 40px rgba(0,0,0,0.05)",
                border: "2px dashed #ddd"
              }}>
                <div style={{ fontSize: "64px", marginBottom: "20px" }}>🍲</div>
                <h3 style={{ fontSize: "24px", fontWeight: "700", color: "#6b0f0f", margin: "0 0 12px 0" }}>Cart is Empty</h3>
                <p style={{ fontSize: "16px", color: "#666", marginBottom: "32px", lineHeight: "1.6" }}>Explore our delicious biryani collection</p>
                <button
                  onClick={() => navigate('/menu')}
                  style={{
                    background: "#6b0f0f",
                    color: "#fff",
                    border: "none",
                    padding: "14px 32px",
                    borderRadius: "12px",
                    cursor: "pointer",
                    fontSize: "16px",
                    fontWeight: "700",
                    transition: "all 0.3s ease",
                  }}
                  onMouseOver={(e) => e.target.style.transform = "translateY(-2px)"}
                  onMouseOut={(e) => e.target.style.transform = "translateY(0)"}
                >
                  Browse Menu
                </button>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {cartItems.map((item) => (
                  <div 
                    key={item.id} 
                    style={{
                      background: "#fff",
                      borderRadius: "16px",
                      padding: "20px",
                      display: "flex",
                      gap: "16px",
                      boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
                      border: "1px solid rgba(0,0,0,0.04)",
                      transition: "all 0.3s ease",
                      position: "relative"
                    }}
                    onMouseOver={(e) => e.currentTarget.style.boxShadow = "0 12px 32px rgba(0,0,0,0.1)"}
                    onMouseOut={(e) => e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.06)"}
                  >
                    <div style={{ width: "100px", height: "100px", borderRadius: "12px", overflow: "hidden", flexShrink: 0 }}>
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        loading="lazy"
                        onError={(e) => e.currentTarget.src = "https://via.placeholder.com/100?text=Biryani"}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    </div>

                    <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                      <div>
                        <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#6b0f0f", margin: "0 0 6px 0" }}>{item.name}</h3>
                        <p style={{ fontSize: "13px", color: "#666", margin: "0" }}>{item.description}</p>
                      </div>
                      
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "12px" }}>
                        <span style={{ fontSize: "20px", fontWeight: "800", color: "#c89a2b" }}>₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                        
                        <div style={{ display: "flex", alignItems: "center", background: "#f0f0f0", borderRadius: "8px", padding: "4px" }}>
                          <button 
                            onClick={() => updateQuantity(item.id, -1)}
                            style={{
                              background: "transparent",
                              border: "none",
                              cursor: "pointer",
                              padding: "8px 10px",
                              color: "#6b0f0f",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              transition: "all 0.2s ease",
                            }}
                            onMouseOver={(e) => e.target.style.background = "rgba(107, 15, 15, 0.1)"}
                            onMouseOut={(e) => e.target.style.background = "transparent"}
                          >
                            <Minus size={14} />
                          </button>
                          <span style={{ width: "32px", textAlign: "center", fontWeight: "700", color: "#333" }}>{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, 1)}
                            style={{
                              background: "transparent",
                              border: "none",
                              cursor: "pointer",
                              padding: "8px 10px",
                              color: "#6b0f0f",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              transition: "all 0.2s ease",
                            }}
                            onMouseOver={(e) => e.target.style.background = "rgba(107, 15, 15, 0.1)"}
                            onMouseOut={(e) => e.target.style.background = "transparent"}
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                    </div>

                    <button 
                      onClick={() => removeItem(item.id)}
                      style={{
                        position: "absolute",
                        top: "12px",
                        right: "12px",
                        background: "rgba(239, 68, 68, 0.1)",
                        border: "none",
                        cursor: "pointer",
                        width: "32px",
                        height: "32px",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#dc2626",
                        transition: "all 0.2s ease",
                      }}
                      onMouseOver={(e) => e.currentTarget.style.background = "rgba(239, 68, 68, 0.2)"}
                      onMouseOut={(e) => e.currentTarget.style.background = "rgba(239, 68, 68, 0.1)"}
                    >
                      <X size={18} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Bill Details Section */}
          {cartItems.length > 0 && (
            <div style={{ 
              background: "#fff", 
              borderRadius: "20px", 
              padding: "32px", 
              boxShadow: "0 12px 40px rgba(0,0,0,0.08)",
              border: "1px solid rgba(107, 15, 15, 0.1)",
              height: "fit-content",
              position: "sticky",
              top: "80px"
            }}>
              
              {/* Coupon Section */}
              <button style={{
                width: "100%",
                background: "linear-gradient(135deg, #f7c66b15, #f7c66b08)",
                border: "2px dashed #c89a2b",
                borderRadius: "12px",
                padding: "16px",
                marginBottom: "24px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                transition: "all 0.3s ease",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = "linear-gradient(135deg, #f7c66b25, #f7c66b15)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = "linear-gradient(135deg, #f7c66b15, #f7c66b08)";
                e.currentTarget.style.transform = "translateY(0)";
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <span style={{ fontSize: "24px" }}>🎟️</span>
                  <span style={{ fontSize: "14px", fontWeight: "600", color: "#666" }}>Apply Coupon Code</span>
                </div>
                <ChevronRight size={18} style={{ color: "#c89a2b" }} />
              </button>

              {/* Bill Divider */}
              <div style={{ borderTop: "2px solid #f0f0f0", paddingTop: "20px", marginBottom: "20px" }}>
                <h3 style={{ fontSize: "12px", fontWeight: "800", letterSpacing: "1px", color: "#999", textTransform: "uppercase", margin: "0 0 16px 0" }}>Order Summary</h3>
                
                {/* Bill Items */}
                <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "20px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px" }}>
                    <span style={{ color: "#666" }}>Subtotal</span>
                    <span style={{ fontWeight: "700", color: "#333" }}>₹{subtotal.toLocaleString('en-IN')}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px" }}>
                    <span style={{ color: "#666" }}>Delivery Fee</span>
                    <span style={{ fontWeight: "700", color: "#333" }}>₹{subtotal > 0 ? deliveryCharge : 0}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px" }}>
                    <span style={{ color: "#666" }}>Handi Packaging</span>
                    <span style={{ fontWeight: "700", color: "#333" }}>₹{subtotal > 0 ? packagingCharge : 0}</span>
                  </div>
                </div>
              </div>

              {/* Grand Total */}
              <div style={{ 
                background: "linear-gradient(135deg, #6b0f0f, #8b1a1a)",
                color: "#fff",
                borderRadius: "12px",
                padding: "20px",
                marginBottom: "24px",
                textAlign: "center"
              }}>
                <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.8)", margin: "0 0 8px 0", textTransform: "uppercase", letterSpacing: "0.5px", fontWeight: "600" }}>Total Amount</p>
                <h2 style={{ fontSize: "36px", fontWeight: "900", margin: "0", color: "#f7c66b" }}>₹{total.toLocaleString('en-IN')}</h2>
              </div>

              {/* Checkout Button */}
              <button 
                style={{
                  width: "100%",
                  background: cartItems.length === 0 ? "#ccc" : "linear-gradient(135deg, #6b0f0f, #8b1a1a)",
                  color: "#fff",
                  border: "none",
                  padding: "16px",
                  borderRadius: "12px",
                  cursor: cartItems.length === 0 ? "not-allowed" : "pointer",
                  fontSize: "16px",
                  fontWeight: "800",
                  transition: "all 0.3s ease",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  marginBottom: "12px",
                  opacity: cartItems.length === 0 ? 0.5 : 1,
                }}
                disabled={cartItems.length === 0}
                onMouseOver={(e) => {
                  if (cartItems.length > 0) {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow = "0 12px 32px rgba(107, 15, 15, 0.3)";
                  }
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                Proceed to Checkout
              </button>

              {/* Trust Badge */}
              <div style={{ 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center", 
                gap: "8px", 
                fontSize: "11px", 
                color: "#666",
                textAlign: "center",
                fontWeight: "600"
              }}>
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