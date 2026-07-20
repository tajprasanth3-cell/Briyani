import { useState, useCallback, useRef, useEffect } from "react";
import { BrowserRouter, Routes, Route, NavLink, useNavigate, useLocation } from "react-router-dom";
import { Search, MapPin, Phone, Mail, UtensilsCrossed, Moon, Sun, User, LogOut, History } from "lucide-react";
import TajBiryani from "./components/Briyani.jsx";
import Menu from "./components/Menu.jsx";
import Cart from "./components/Cart.jsx";
import Checkout from "./components/Checkout.jsx";
import TrackOrder from "./components/Ordertrack.jsx";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import Admin from "./components/Admin.jsx";
import Profile from "./components/Profile.jsx";
import OrderHistory from "./components/OrderHistory.jsx";
import OrderConfirmation from "./components/OrderConfirmation.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import { AuthProvider, useAuth } from "./context/AuthContext.jsx";
import { ThemeProvider, useTheme } from "./context/ThemeContext.jsx";

const navItems = [
  { to: "/", label: "Home", end: true },
  { to: "/menu", label: "Menu" },
  { to: "/cart", label: "Cart" },
  { to: "/checkout", label: "Checkout" },
  { to: "/track-order", label: "Track Order" },
];

function AppContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const searchInputRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();
  const { darkMode, toggleDark } = useTheme();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location.pathname]);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const coupons = {
    ROYAL: { discount: 0.5, label: "ROYAL" },
    "1750": { discount: 0, flat: 175, min: 699, label: "FIRST ORDER" },
    "2500": { discount: 0.25, label: "TAKE AWAY" },
  };

  const handleApplyCoupon = useCallback((code) => {
    setAppliedCoupon((prev) =>
      prev?.code === code ? null : coupons[code] ? { code, ...coupons[code] } : prev
    );
  }, []);

  const handleAddToCart = useCallback((product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + product.quantity }
            : item
        );
      }
      return [...prev, { ...product }];
    });
    navigate("/cart");
  }, [navigate]);

  const handleUpdateCartItem = useCallback((id, change) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + change }
          : item
      ).filter((item) => item.quantity > 0)
    );
  }, []);

  const handleRemoveCartItem = useCallback((id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const handleClearCart = useCallback(() => setCartItems([]), []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: darkMode ? "#1a0a0a" : "#f8f6f2",
      color: darkMode ? "#f0e6d6" : "#2b140f",
      transition: "background 0.3s, color 0.3s",
    }}>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Poppins:wght@400;500;600;700;800;900&display=swap');

          * { font-family: 'Poppins', sans-serif; }
          h1, h2, h3, .royal-font { font-family: 'Playfair Display', Georgia, serif; }

          @media (max-width: 1024px) {
            .navbar { padding: 12px 3% !important; }
            .nav-search-wrapper { width: auto !important; }
          }

          @media (max-width: 768px) {
            .navbar { 
              flex-direction: column; 
              height: auto !important; 
              position: sticky !important; 
              padding: 15px !important;
              align-items: stretch !important;
            }
            
            .nav-search { width: 100% !important; }
            .nav-search-wrapper { width: 100% !important; }
            
            header nav { 
              justify-content: center; 
              width: 100%; 
              margin-top: 10px;
            }
            
            main { padding: 2px 4% !important; }
            
            .responsive-grid { 
              grid-template-columns: 1fr !important; 
              gap: 20px !important;
            }
            
            .responsive-flex {
              flex-direction: column !important;
            }
            
            .mobile-hide { display: none !important; }
            
            .hero-title { font-size: 32px !important; line-height: 1.2 !important; }
            .hero-subtitle { font-size: 18px !important; }
            .section-title { font-size: 24px !important; }
            
            .hero-gallery { height: 250px !important; margin-top: 20px !important; }
            
            .sticky-sidebar { position: static !important; width: 100% !important; }
            
            .feature-container { 
              grid-template-columns: repeat(2, 1fr) !important;
              padding: 20px 0 !important;
            }
          }
        `}
      </style>
        <header
          className="navbar"
          style={{
            background: "linear-gradient(135deg, rgba(90,12,12,0.85) 0%, rgba(107,15,15,0.85) 50%, rgba(74,10,10,0.85) 100%)",
            backdropFilter: "blur(24px) saturate(180%)",
            WebkitBackdropFilter: "blur(24px) saturate(180%)",
            color: "#fff",
            padding: "10px 1% 10px 1%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "12px",
            position: "sticky",
            top: 0,
            zIndex: 999,
            borderBottom: "2px solid rgba(247,198,107,0.12)",
            boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
          }}
        >
          <NavLink
            to="/"
            className="nav-brand"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              background: "rgba(255,255,255,0.1)",
              padding: "6px 22px 6px 10px",
              borderRadius: 50,
              border: "1px solid rgba(255,255,255,0.2)",
              backdropFilter: "blur(4px)",
              textDecoration: "none",
            }}
          >
            <div
              style={{
                width: 42,
                height: 42,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #f7c66b, #d99523)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                boxShadow: "0 4px 12px rgba(247,198,107,0.3)",
              }}
            >
              <UtensilsCrossed size={20} color="#5a0c0c" strokeWidth={2.5} />
            </div>
            <div>
              <div
                style={{
                  color: "#f7c66b",
                  fontSize: "20px",
                  fontWeight: "900",
                  lineHeight: 1.1,
                  letterSpacing: "1.5px",
                  fontFamily: "Georgia, serif",
                }}
              >
                TAJ
              </div>
              <div
                style={{
                  color: "rgba(255,255,255,0.9)",
                  fontSize: "10px",
                  fontWeight: "700",
                  lineHeight: 1,
                  letterSpacing: "2px",
                  opacity: 0.9,
                }}
              >
                BIRYANI
              </div>
            </div>
          </NavLink>

          <nav
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
              alignItems: "center",
            }}
          >
            <div
              className="nav-search-wrapper"
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                height: 40,
                transition: "all 0.4s cubic-bezier(0.4,0,0.2,1)",
                overflow: "hidden",
                borderRadius: 50,
                background: searchOpen
                  ? "rgba(255,255,255,0.1)"
                  : "rgba(255,255,255,0.05)",
                border: searchOpen
                  ? "1px solid rgba(247,198,107,0.4)"
                  : "1px solid rgba(255,255,255,0.12)",
                boxShadow: searchOpen
                  ? "0 0 20px rgba(247,198,107,0.1), inset 0 0 12px rgba(247,198,107,0.05)"
                  : "none",
              }}
            >
              <button
                onClick={() => {
                  if (!searchOpen) {
                    setSearchOpen(true);
                    setTimeout(() => searchInputRef.current?.focus(), 100);
                  } else if (searchQuery) {
                    navigate("/menu");
                    setSearchOpen(false);
                  } else {
                    setSearchOpen(false);
                  }
                }}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  border: "none",
                  background: searchOpen
                    ? "linear-gradient(135deg, #f7c66b, #d99523)"
                    : "transparent",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  flexShrink: 0,
                  transition: "all 0.35s ease",
                  boxShadow: searchOpen
                    ? "0 4px 12px rgba(247,198,107,0.35)"
                    : "none",
                }}
              >
                <Search
                  size={16}
                  strokeWidth={2.5}
                  color={searchOpen ? "#5a0c0c" : "rgba(255,255,255,0.8)"}
                  style={{ transition: "color 0.3s ease" }}
                />
              </button>
              <input
                ref={(el) => { searchInputRef.current = el; }}
                type="text"
                placeholder="Search for biryani..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchOpen(true)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && searchQuery) {
                    navigate("/menu");
                    setSearchOpen(false);
                    e.target.blur();
                  }
                  if (e.key === "Escape") {
                    setSearchQuery("");
                    setSearchOpen(false);
                    e.target.blur();
                  }
                }}
                onBlur={() => {
                  if (!searchQuery) setTimeout(() => setSearchOpen(false), 150);
                }}
                style={{
                  width: searchOpen ? "220px" : "0px",
                  padding: searchOpen ? "0 14px 0 4px" : "0",
                  border: "none",
                  background: "transparent",
                  color: "#fff",
                  fontSize: "13px",
                  fontWeight: 500,
                  outline: "none",
                  opacity: searchOpen ? 1 : 0,
                  transition: "all 0.4s cubic-bezier(0.4,0,0.2,1)",
                }}
                className="nav-search"
              />
            </div>

            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                style={({ isActive }) => ({
                  color: isActive ? "#f7c66b" : "rgba(255,255,255,0.85)",
                  textDecoration: "none",
                  padding: "7px 14px",
                  borderRadius: 50,
                  background: isActive
                    ? "rgba(247,198,107,0.12)"
                    : "rgba(255,255,255,0.04)",
                  fontWeight: isActive ? 800 : 500,
                  border: isActive
                    ? "1px solid rgba(247,198,107,0.25)"
                    : "1px solid rgba(255,255,255,0.06)",
                  fontSize: "13px",
                  letterSpacing: "0.3px",
                  transition: "all 0.3s ease",
                  backdropFilter: "blur(4px)",
                })}
              >
                {item.label}
              </NavLink>
            ))}

            <button
              onClick={toggleDark}
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                border: "1px solid rgba(255,255,255,0.12)",
                background: "rgba(255,255,255,0.05)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "all 0.3s",
              }}
              title={darkMode ? "Light Mode" : "Dark Mode"}
            >
              {darkMode ? <Sun size={14} color="#f7c66b" /> : <Moon size={14} color="rgba(255,255,255,0.7)" />}
            </button>

            {isAuthenticated ? (
              <>
                <NavLink to="/order-history" style={({ isActive }) => ({
                  color: isActive ? "#f7c66b" : "rgba(255,255,255,0.85)",
                  padding: "7px 12px", borderRadius: 50, fontWeight: 600, fontSize: "12px",
                  border: "1px solid rgba(255,255,255,0.1)", textDecoration: "none",
                  display: "flex", alignItems: "center", gap: "4px",
                })}>
                  <History size={14} /> Orders
                </NavLink>
                <NavLink to="/profile" style={({ isActive }) => ({
                  color: isActive ? "#f7c66b" : "rgba(255,255,255,0.85)",
                  padding: "7px 12px", borderRadius: 50, fontWeight: 600, fontSize: "12px",
                  border: "1px solid rgba(255,255,255,0.1)", textDecoration: "none",
                  display: "flex", alignItems: "center", gap: "4px",
                })}>
                  <User size={14} /> {user?.name?.split(" ")[0] || "Profile"}
                </NavLink>
                <button onClick={handleLogout} style={{
                  padding: "7px 12px", borderRadius: 50, fontWeight: 600, fontSize: "12px",
                  border: "1px solid rgba(239,68,68,0.3)", background: "rgba(239,68,68,0.1)",
                  color: "#fca5a5", cursor: "pointer", display: "flex", alignItems: "center", gap: "4px",
                }}>
                  <LogOut size={14} /> Logout
                </button>
              </>
            ) : (
              <NavLink to="/login" style={({ isActive }) => ({
                color: isActive ? "#f7c66b" : "rgba(255,255,255,0.85)",
                textDecoration: "none",
                padding: "7px 14px",
                borderRadius: 50,
                background: isActive ? "rgba(247,198,107,0.12)" : "rgba(255,255,255,0.04)",
                fontWeight: isActive ? 800 : 500,
                border: isActive ? "1px solid rgba(247,198,107,0.25)" : "1px solid rgba(255,255,255,0.06)",
                fontSize: "13px",
              })}>
                Login
              </NavLink>
            )}
          </nav>
        </header>

        <main style={{ padding: "0 0 40px 0" }}>
          <ErrorBoundary>
            <Routes>
              <Route path="/" element={<TajBiryani onAddToCart={handleAddToCart} onApplyCoupon={handleApplyCoupon} />} />
              <Route path="/menu" element={<Menu searchQuery={searchQuery} onSearchChange={setSearchQuery} onAddToCart={handleAddToCart} cartCount={cartCount} />} />
              <Route path="/cart" element={<Cart cartItems={cartItems} onUpdateQuantity={handleUpdateCartItem} onRemoveItem={handleRemoveCartItem} onClearCart={handleClearCart} appliedCoupon={appliedCoupon} onApplyCoupon={handleApplyCoupon} />} />
              <Route path="/checkout" element={<Checkout cartItems={cartItems} appliedCoupon={appliedCoupon} onClearCart={handleClearCart} />} />
              <Route path="/track-order" element={<TrackOrder />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/order-history" element={<OrderHistory />} />
              <Route path="/order-confirmation" element={<OrderConfirmation />} />
              <Route path="*" element={
                <div style={{ minHeight: "70vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 20px", textAlign: "center" }}>
                  <div style={{ maxWidth: "480px", width: "100%" }}>
                    <div style={{ fontSize: "120px", fontWeight: "900", fontFamily: "Georgia, serif", background: "linear-gradient(135deg, #6b0f0f, #8b1a1a, #d99523)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", lineHeight: 1, marginBottom: "8px", filter: "drop-shadow(0 8px 24px rgba(107,15,15,0.15))" }}>404</div>
                    <div style={{ width: "80px", height: "4px", background: "linear-gradient(90deg, transparent, #f7c66b, transparent)", margin: "0 auto 24px", borderRadius: "4px" }} />
                    <h2 style={{ fontSize: "24px", fontWeight: "800", color: "#6b0f0f", margin: "0 0 12px", fontFamily: "Georgia, serif" }}>Page Not Found</h2>
                    <p style={{ fontSize: "15px", color: "#888", margin: "0 0 32px", lineHeight: 1.7 }}>The page you're looking for doesn't exist or has been moved.</p>
                    <button onClick={() => navigate("/")} style={{ padding: "14px 36px", borderRadius: "14px", border: "none", background: "linear-gradient(135deg, #6b0f0f, #8b1a1a)", color: "#f7c66b", fontWeight: "800", fontSize: "14px", cursor: "pointer", boxShadow: "0 8px 24px rgba(107,15,15,0.3)" }}>Back to Home</button>
                  </div>
                </div>
              } />
            </Routes>
          </ErrorBoundary>
        </main>

        <footer className="siteFooter">
          <div className="footerInner">
            <div className="footerCol brandCol">
              <div className="footerLogo">
                <div style={{ width: 50, height: 40, borderRadius: "50%", background: "linear-gradient(135deg, #f7c66b, #d99523)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <UtensilsCrossed size={18} color="#5a0c0c" strokeWidth={2.5} />
                </div>
                <div>
                  <div className="footerLogoTitle">TAJ</div>
                  <div className="footerLogoSub">BIRYANI</div>
                </div>
              </div>
              <p className="footerDesc">Experience the royal taste of authentic Dum Biryani, crafted with premium spices and aged basmati rice.</p>
            </div>
            <div className="footerCol">
              <h4 className="footerHeading">Quick Links</h4>
              <ul className="footerLinks">
                <li><NavLink to="/">Home</NavLink></li>
                <li><NavLink to="/menu">Menu</NavLink></li>
                <li><NavLink to="/cart">Cart</NavLink></li>
                <li><NavLink to="/checkout">Checkout</NavLink></li>
                <li><NavLink to="/track-order">Track Order</NavLink></li>
                <li><NavLink to="/login">Login</NavLink></li>
              </ul>
            </div>
            <div className="footerCol">
              <h4 className="footerHeading">Contact Us</h4>
              <ul className="footerLinks">
                <li><span className="footerContactItem"><MapPin size={14} style={{ marginRight: 6, verticalAlign: "middle", color: "#f7c66b", flexShrink: 0 }} /> 123, Bhendi Bazaar, Mumbai</span></li>
                <li><span className="footerContactItem"><Phone size={14} style={{ marginRight: 6, verticalAlign: "middle", color: "#f7c66b", flexShrink: 0 }} /> +91 98765 43210</span></li>
                <li><span className="footerContactItem"><Mail size={14} style={{ marginRight: 6, verticalAlign: "middle", color: "#f7c66b", flexShrink: 0 }} /> info@tajbiryani.com</span></li>
              </ul>
            </div>
            <div className="footerCol">
              <h4 className="footerHeading">Hours</h4>
              <ul className="footerLinks">
                <li><span className="footerContactItem">Mon - Sat: 11 AM - 11 PM</span></li>
                <li><span className="footerContactItem">Sun: 12 PM - 10 PM</span></li>
              </ul>
            </div>
          </div>
          <div className="footerBottom">
            <p>&copy; 2026 Taj Biryani. All rights reserved.</p>
          </div>
        </footer>

      <style>{`
        .siteFooter {
          background: linear-gradient(180deg, #1a0404 0%, #0d0202 100%);
          color: #ddd;
          padding: 60px 5% 0;
          font-family: Poppins, sans-serif;
          position: relative;
          overflow: hidden;
        }
        .siteFooter::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, transparent, #f7c66b, #d99523, #f7c66b, transparent);
        }
        .footerInner {
          display: grid;
          grid-template-columns: 1.5fr 1fr 1fr 1fr;
          gap: 40px;
          max-width: 1200px;
          margin: 0 auto;
          padding-bottom: 40px;
        }
        .footerLogo {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .footerLogoTitle {
          color: #f7c66b;
          font-size: 22px;
          font-weight: 900;
          line-height: 1.2;
          letter-spacing: 2px;
          font-family: Georgia, serif;
        }
        .footerLogoSub {
          color: #fff;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 2.5px;
          opacity: 0.6;
        }
        .footerDesc {
          font-size: 13px;
          line-height: 1.7;
          margin: 16px 0 0;
          color: #999;
        }
        .footerHeading {
          color: #f7c66b;
          font-size: 14px;
          font-weight: 800;
          margin: 0 0 16px;
          letter-spacing: 1px;
          text-transform: uppercase;
        }
        .footerLinks {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .footerLinks li {
          margin-bottom: 10px;
        }
        .footerLinks a {
          color: #bbb;
          text-decoration: none;
          font-size: 14px;
          transition: color 0.2s;
        }
        .footerLinks a:hover {
          color: #f7c66b;
        }
        .footerContactItem {
          font-size: 13px;
          color: #bbb;
        }
        .footerBottom {
          border-top: 1px solid rgba(255,255,255,0.05);
          padding: 20px 0;
          text-align: center;
          font-size: 12px;
          color: #666;
        }
        .footerBottom p {
          margin: 0;
        }
        @media (max-width: 768px) {
          .footerInner {
            grid-template-columns: 1fr;
            gap: 30px;
          }
          .footerLogoTitle { font-size: 18px !important; }
          .footerHeading { font-size: 13px !important; }
          .footerDesc { font-size: 12px !important; }
          .footerContactItem { font-size: 12px !important; }
        }
      `}</style>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider>
          <AppContent />
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
