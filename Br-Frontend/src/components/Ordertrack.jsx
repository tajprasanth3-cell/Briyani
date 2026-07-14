import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Check, 
  ChefHat, 
  Package, 
  Bike, 
  CheckCircle2,
  PhoneCall,
  ReceiptText,
  ShoppingBag
} from 'lucide-react';
import trackBg from "./Images/background3.jpg";

const trackStyles = `
.trackPage {
  position: relative;
}

.trackPage::before {
  content: "";
  position: fixed;
  inset: 0;
  background: url("${trackBg}") center/cover fixed no-repeat;
  opacity: 0.06;
  pointer-events: none;
  z-index: 0;
}

.trackPage > * {
  position: relative;
  z-index: 1;
}

@media (max-width: 1024px) {
  .trackBody { grid-template-columns: 1fr !important; }
  .trackHeader { flex-direction: column !important; text-align: center !important; gap: 12px !important; }
  .trackHeaderRight { width: auto !important; text-align: center !important; }
}

@media (max-width: 768px) {
  .trackPage { padding: 20px 12px !important; }
  .trackContainer { border-radius: 16px !important; }
  .trackContent { padding: 20px 16px !important; }
  .trackStepRow { gap: 12px !important; }
  .trackDeliveryPartner { flex-direction: column !important; gap: 12px !important; }
  .trackBody { gap: 24px !important; }
}

@media (max-width: 480px) {
  .trackPageTitle { font-size: 17px !important; }
  .trackContainer { border-radius: 12px !important; }
  .trackContent { padding: 16px 12px !important; }
}
`;

export default function TrackOrder() {
  // Sample data simulating the order lifecycle state
  const orderInfo = {
    id: '#TB123456',
    date: '20 May, 2024 at 12:30 PM',
    status: 'Confirmed',
    partner: {
      name: 'Rohan Singh',
      avatar:
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&auto=format&fit=crop',
    }
  };

  const orderItems = [
    { name: 'Chicken Dum Biryani', quantity: 1, price: 599 },
    { name: 'Extra Raita & Salan', quantity: 1, price: 0 },
  ];

  const subtotal = 599;
  const delivery = 40;
  const packaging = 20;
  const total = subtotal + delivery + packaging;
  const navigate = useNavigate();

  const steps = [
    {
      title: 'Order Placed',
      description: 'Your order has been placed',
      time: '12:30 PM',
      status: 'completed', // completed | current | pending
      icon: <Check size={14} strokeWidth={3} />
    },
    {
      title: 'Kitchen Accepted',
      description: 'Your order is being prepared',
      time: '12:35 PM',
      status: 'completed',
      icon: <Check size={14} strokeWidth={3} />
    },
    {
      title: 'Cooking',
      description: 'Your biryani is cooking',
      time: '01:00 PM',
      status: 'current',
      icon: <ChefHat size={14} />
    },
    {
      title: 'Packed',
      description: 'Your order is packed',
      time: '01:25 PM',
      status: 'current',
      icon: <Package size={14} />
    },
    {
      title: 'Out for Delivery',
      description: 'On the way to you',
      time: '01:40 PM',
      status: 'current',
      icon: <Bike size={14} />
    },
    {
      title: 'Delivered',
      description: 'Enjoy your meal!',
      time: '-- : --',
      status: 'pending',
      icon: <CheckCircle2 size={14} />
    }
  ];

  return (
    <div className="trackPage" style={{ minHeight: "100vh", background: "linear-gradient(135deg, #faf6f0 0%, #f3ede4 100%)", padding: "40px 20px" }}>
      <style>{trackStyles}</style>
      {/* Main Layout Container */}
      <div className="trackContainer" style={{ maxWidth: "1000px", margin: "0 auto", background: "#fff", borderRadius: "24px", boxShadow: "0 20px 50px rgba(0,0,0,0.1)", overflow: "hidden", border: "1px solid rgba(107, 15, 15, 0.05)" }}>
        
        {/* Header Navigation */}
        <div className="trackHeader" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "24px 32px", borderBottom: "1px solid #f0f0f0" }}>
          <button 
            onClick={() => navigate('/menu')}
            style={{
              background: "rgba(107, 15, 15, 0.05)",
              border: "none",
              cursor: "pointer",
              padding: "10px 20px",
              borderRadius: "12px",
              color: "#6b0f0f",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontWeight: "700",
              fontSize: "14px",
              transition: "all 0.3s ease"
            }}
            onMouseOver={(e) => e.currentTarget.style.background = "rgba(107, 15, 15, 0.1)"}
            onMouseOut={(e) => e.currentTarget.style.background = "rgba(107, 15, 15, 0.05)"}
          >
            <ArrowLeft size={20} />
          </button>
          
          <div style={{ textAlign: "center" }}>
            <h1 className="trackPageTitle" style={{ fontSize: "20px", fontWeight: "900", color: "#6b0f0f", margin: "0", letterSpacing: "1px", textTransform: "uppercase" }}>Track Order</h1>
            <p style={{ fontSize: "12px", color: "#c89a2b", margin: "2px 0 0 0", fontWeight: "700" }}>Live Status Updates</p>
          </div>
          
          <div className="trackHeaderRight" style={{ width: "120px", textAlign: "right", fontSize: "13px", color: "#666", fontWeight: "600" }}>
            ID: <span style={{ color: "#6b0f0f" }}>{orderInfo.id}</span>
          </div>
        </div>

        {/* Content Body Layout */}
        <div className="trackBody trackContent" style={{ padding: "32px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "40px" }}>
          
          {/* Left Side: Timeline */}
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
              <div>
                <h2 style={{ fontSize: "16px", fontWeight: "800", color: "#333", margin: "0" }}>Delivery Status</h2>
                <p style={{ fontSize: "12px", color: "#999", margin: "4px 0 0 0" }}>Placed on {orderInfo.date}</p>
              </div>
              <span className="bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] font-semibold px-2.5 py-0.5 rounded-full shadow-sm">
                {orderInfo.status}
              </span>
            </div>

            {/* Vertical Custom Timeline Tracker */}
            <div className="relative pl-2 space-y-5 mt-4">
              {steps.map((step, index) => (
                <div key={index} className="trackStepRow" style={{ display: "flex", gap: "20px", alignItems: "start", position: "relative", marginBottom: "28px" }}>
                  
                  {/* Vertical Connection Line connecting the steps */}
                  {index !== steps.length - 1 && (
                    <div className={`absolute left-3.5 top-7 bottom-[-24px] w-[2px] ${
                      step.status === 'completed' ? 'bg-emerald-600' : 'bg-stone-200'
                    }`} />
                  )}

                  {/* Icon Node Indicator */}
                  <div style={{ 
                    width: "32px", 
                    height: "32px", 
                    borderRadius: "50%", 
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "center", 
                    zIndex: "10",
                    background: step.status === 'completed' ? '#059669' : step.status === 'current' ? '#6b0f0f' : '#f0f0f0',
                    color: step.status === 'pending' ? '#999' : '#fff',
                    boxShadow: step.status === 'current' ? '0 0 15px rgba(107, 15, 15, 0.3)' : 'none'
                  }}>
                    {step.icon}
                  </div>

                  {/* Step Description Content */}
                  <div style={{ flex: 1, display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                    <div>
                      <h4 style={{ 
                        fontSize: "14px", 
                        fontWeight: "700", 
                        margin: "0", 
                        color: step.status === 'pending' ? '#999' : '#333'
                      }}>
                        {step.title}
                      </h4>
                      <p style={{ fontSize: "12px", color: "#666", margin: "2px 0 0 0" }}>{step.description}</p>
                    </div>
                    <span style={{ fontSize: "11px", color: "#999", fontWeight: "700" }}>
                      {step.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side: Bill Details & Summary */}
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            {/* Order Items */}
            <div style={{ background: "#fdfaf5", padding: "24px", borderRadius: "20px", border: "1px solid #f3ede4" }}>
              <h3 style={{ fontSize: "15px", fontWeight: "800", color: "#6b0f0f", margin: "0 0 16px 0", display: "flex", alignItems: "center", gap: "10px" }}>
                <ShoppingBag size={18} /> Order Summary
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {orderItems.map((item, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", fontSize: "14px" }}>
                    <span style={{ color: "#333", fontWeight: "600" }}>{item.quantity}x {item.name}</span>
                    <span style={{ color: "#666" }}>₹{item.price}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bill Details */}
            <div style={{ background: "#fff", padding: "24px", borderRadius: "20px", border: "1px solid #f0f0f0" }}>
              <h3 style={{ fontSize: "15px", fontWeight: "800", color: "#6b0f0f", margin: "0 0 16px 0", display: "flex", alignItems: "center", gap: "10px" }}>
                <ReceiptText size={18} /> Bill Details
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px", borderBottom: "1px dashed #ddd", paddingBottom: "16px", marginBottom: "16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px" }}>
                  <span style={{ color: "#666" }}>Item Total</span>
                  <span style={{ color: "#333", fontWeight: "700" }}>₹{subtotal}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px" }}>
                  <span style={{ color: "#666" }}>Delivery Fee</span>
                  <span style={{ color: "#333", fontWeight: "700" }}>₹{delivery}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px" }}>
                  <span style={{ color: "#666" }}>Packaging Charges</span>
                  <span style={{ color: "#333", fontWeight: "700" }}>₹{packaging}</span>
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "16px", fontWeight: "800", color: "#333" }}>Paid Total</span>
                <span style={{ fontSize: "24px", fontWeight: "900", color: "#c89a2b" }}>₹{total}</span>
              </div>
            </div>

            {/* Delivery Partner */}
            <div className="trackDeliveryPartner" style={{ background: "#fff", padding: "16px", borderRadius: "20px", border: "1px solid #f0f0f0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <img 
                  src={orderInfo.partner.avatar} 
                  alt={orderInfo.partner.name} 
                  style={{ width: "48px", height: "48px", borderRadius: "14px", objectFit: "cover" }} 
                />
                <div>
                  <p style={{ fontSize: "10px", fontWeight: "800", color: "#999", margin: "0", textTransform: "uppercase" }}>Delivery Hero</p>
                  <p style={{ fontSize: "14px", fontWeight: "700", color: "#333", margin: "2px 0 0 0" }}>{orderInfo.partner.name}</p>
                </div>
              </div>
              <button style={{ 
                width: "40px", 
                height: "40px", 
                borderRadius: "12px", 
                background: "#6b0f0f", 
                color: "#fff", 
                border: "none", 
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "transform 0.2s ease"
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.1)"}
              onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
              >
                <PhoneCall size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}