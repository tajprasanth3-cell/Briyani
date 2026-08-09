import { useState, useCallback, useRef, useEffect } from "react";
import { BrowserRouter, Routes, Route, NavLink, useNavigate, useLocation } from "react-router-dom";
import { Search, MapPin, Phone, Mail, UtensilsCrossed, Moon, Sun, User, LogOut, History, Menu as MenuIcon, X } from "lucide-react";
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
import Analytics from "./components/Analytics.jsx";
import { AuthProvider, useAuth } from "./context/AuthContext.jsx";
import { ThemeProvider, useTheme } from "./context/ThemeContext.jsx";
import { LanguageProvider, useLanguage } from "./context/LanguageContext.jsx";
import tajLogo from "./components/Images/taj_logo.png";

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const searchInputRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();
  const { darkMode, toggleDark } = useTheme();
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location.pathname]);

  useEffect(() => {
    setMobileMenuOpen(false);
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
    setToast({ message: `"${product.name}" added to cart!`, type: "success" });
    setTimeout(() => setToast(null), 2500);
  }, []);

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
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Poppins:wght@400;500;600;700;800;900&display=swap');
        * { font-family: 'Poppins', sans-serif; box-sizing: border-box; }
        h1, h2, h3, .royal-font { font-family: 'Playfair Display', Georgia, serif; }
        img { max-width: 100%; height: auto; }

        .mobile-menu-overlay {
          display: none;
          position: fixed; inset: 0; z-index: 1000;
          background: rgba(0,0,0,0.6); backdrop-filter: blur(4px);
        }
        .mobile-menu-overlay.open { display: block; }

        .mobile-menu-panel {
          position: fixed; top: 0; right: -300px; z-index: 1001;
          width: 280px; max-width: 85vw; height: 100vh;
          background: linear-gradient(180deg, #1a0404 0%, #0d0202 100%);
          padding: 24px 0; display: flex; flex-direction: column;
          transition: right 0.3s cubic-bezier(0.4,0,0.2,1);
          overflow-y: auto;
        }
        .mobile-menu-panel.open { right: 0; }

        .mobile-menu-panel .mm-header {
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 20px 20px; border-bottom: 1px solid rgba(247,198,107,0.1);
          margin-bottom: 12px;
        }
        .mobile-menu-panel .mm-close {
          background: rgba(255,255,255,0.08); border: none; color: #fff;
          width: 36px; height: 36px; border-radius: 50%; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
        }
        .mobile-menu-panel .mm-nav-item {
          display: flex; align-items: center; gap: 12px;
          padding: 14px 24px; color: rgba(255,255,255,0.7);
          text-decoration: none; font-size: 15px; font-weight: 600;
          transition: all 0.2s; border: none; background: none;
          width: 100%; text-align: left; cursor: pointer;
        }
        .mobile-menu-panel .mm-nav-item:hover,
        .mobile-menu-panel .mm-nav-item.active {
          color: #f7c66b; background: rgba(247,198,107,0.08);
          border-left: 3px solid #f7c66b;
        }
        .mobile-menu-panel .mm-divider {
          height: 1px; background: rgba(255,255,255,0.06); margin: 8px 20px;
        }
        .mobile-menu-panel .mm-footer {
          margin-top: auto; padding: 16px 20px;
          border-top: 1px solid rgba(247,198,107,0.1);
        }

        @media (min-width: 769px) {
          .mobile-menu-btn { display: none !important; }
          .nav-desktop-items { display: flex !important; }
        }

        @media (max-width: 768px) {
          .mobile-menu-btn { display: flex !important; }
          .nav-desktop-items { display: none !important; }
          .navbar { padding: 8px 12px !important; }
          .nav-brand { padding: 4px 16px 4px 6px !important; gap: 8px !important; }
          .nav-brand-icon { width: 34px !important; height: 34px !important; }
          .nav-brand-text { font-size: 16px !important; }
          .nav-brand-sub { font-size: 8px !important; }
          main { padding: 0 !important; }
          .responsive-grid { grid-template-columns: 1fr !important; gap: 20px !important; }
          .responsive-flex { flex-direction: column !important; }
          .mobile-hide { display: none !important; }
          .hero-title { font-size: 28px !important; line-height: 1.2 !important; }
          .hero-subtitle { font-size: 16px !important; }
          .section-title { font-size: 22px !important; }
          .feature-container { grid-template-columns: repeat(2, 1fr) !important; padding: 16px 0 !important; }
        }

        @media (max-width: 480px) {
          .nav-brand { padding: 4px 12px 4px 4px !important; gap: 6px !important; }
          .nav-brand-icon { width: 30px !important; height: 30px !important; }
          .nav-brand-text { font-size: 14px !important; }
          .nav-brand-sub { font-size: 7px !important; letter-spacing: 1px !important; }
        }

        @media (min-width: 769px) and (max-width: 1024px) {
          .nav-link-item { padding: 6px 10px !important; font-size: 12px !important; }
          .auth-link-item { padding: 6px 10px !important; font-size: 11px !important; }
        }


      `}</style>
      <header
        className="navbar"
        style={{
          background: "linear-gradient(135deg, rgba(90,12,12,0.92) 0%, rgba(107,15,15,0.92) 50%, rgba(74,10,10,0.92) 100%)",
          backdropFilter: "blur(24px) saturate(180%)",
          WebkitBackdropFilter: "blur(24px) saturate(180%)",
          color: "#fff",
          padding: "10px 2%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "12px",
          position: "sticky",
          top: 0,
          zIndex: 999,
          borderBottom: "2px solid rgba(247,198,107,0.12)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
        }}
      >
        <NavLink
          to="/"
          className="nav-brand"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            background: "rgba(255,255,255,0.1)",
            padding: "6px 22px 6px 10px",
            borderRadius: 50,
            border: "1px solid rgba(255,255,255,0.2)",
            backdropFilter: "blur(4px)",
            textDecoration: "none",
            flexShrink: 0,
          }}
        >
          <div
            className="nav-brand-icon"
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              boxShadow: "0 4px 12px rgba(247,198,107,0.3)",
            }}
          >
            <img src={tajLogo} alt="Taj Briyani Logo" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <div>
            <div className="nav-brand-text" style={{ color: "#f7c66b", fontSize: "20px", fontWeight: "900", lineHeight: 1.1, letterSpacing: "1.5px", fontFamily: "Georgia, serif" }}>
              TAJ
            </div>
            <div className="nav-brand-sub" style={{ color: "rgba(255,255,255,0.9)", fontSize: "9px", fontWeight: "700", lineHeight: 1, letterSpacing: "2px", opacity: 0.9 }}>
              BRIYANI
            </div>
          </div>
        </NavLink>

        <nav className="nav-desktop-items" style={{ display: "flex", flexWrap: "wrap", gap: "6px", alignItems: "center" }}>
          <div
            className="nav-search-wrapper"
            style={{
              position: "relative", display: "flex", alignItems: "center", height: 36,
              transition: "all 0.4s cubic-bezier(0.4,0,0.2,1)", overflow: "hidden", borderRadius: 50,
              background: searchOpen ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.05)",
              border: searchOpen ? "1px solid rgba(247,198,107,0.4)" : "1px solid rgba(255,255,255,0.12)",
            }}
          >
            <button
              onClick={() => {
                if (!searchOpen) { setSearchOpen(true); setTimeout(() => searchInputRef.current?.focus(), 100); }
                else if (searchQuery) { navigate("/menu"); setSearchOpen(false); }
                else { setSearchOpen(false); }
              }}
              style={{ width: 36, height: 36, borderRadius: "50%", border: "none", background: searchOpen ? "linear-gradient(135deg, #f7c66b, #d99523)" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0, transition: "all 0.35s ease" }}
            >
              <Search size={14} strokeWidth={2.5} color={searchOpen ? "#5a0c0c" : "rgba(255,255,255,0.8)"} />
            </button>
            <input
              ref={(el) => { searchInputRef.current = el; }}
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setSearchOpen(true)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && searchQuery) { navigate("/menu"); setSearchOpen(false); e.target.blur(); }
                if (e.key === "Escape") { setSearchQuery(""); setSearchOpen(false); e.target.blur(); }
              }}
              onBlur={() => { if (!searchQuery) setTimeout(() => setSearchOpen(false), 150); }}
              style={{ width: searchOpen ? "180px" : "0px", padding: searchOpen ? "0 14px 0 4px" : "0", border: "none", background: "transparent", color: "#fff", fontSize: "13px", fontWeight: 500, outline: "none", opacity: searchOpen ? 1 : 0, transition: "all 0.4s cubic-bezier(0.4,0,0.2,1)" }}
              className="nav-search"
            />
          </div>

          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.end} className="nav-link-item"
              style={({ isActive }) => ({
                color: isActive ? "#f7c66b" : "rgba(255,255,255,0.85)", textDecoration: "none",
                padding: "7px 14px", borderRadius: 50, background: isActive ? "rgba(247,198,107,0.12)" : "rgba(255,255,255,0.04)",
                fontWeight: isActive ? 800 : 500, border: isActive ? "1px solid rgba(247,198,107,0.25)" : "1px solid rgba(255,255,255,0.06)",
                fontSize: "12px", letterSpacing: "0.3px", transition: "all 0.3s ease", backdropFilter: "blur(4px)", whiteSpace: "nowrap",
              })}>
              {item.label}
            </NavLink>
          ))}

          <button onClick={toggleDark} style={{ width: 34, height: 34, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all 0.3s" }} title={darkMode ? "Light Mode" : "Dark Mode"}>
            {darkMode ? <Sun size={13} color="#f7c66b" /> : <Moon size={13} color="rgba(255,255,255,0.7)" />}
          </button>

          {isAuthenticated ? (
            <>
              <NavLink to="/order-history" className="auth-link-item" style={({ isActive }) => ({ color: isActive ? "#f7c66b" : "rgba(255,255,255,0.85)", padding: "6px 10px", borderRadius: 50, fontWeight: 600, fontSize: "11px", border: "1px solid rgba(255,255,255,0.1)", textDecoration: "none", display: "flex", alignItems: "center", gap: "3px", whiteSpace: "nowrap" })}>
                <History size={12} /> Orders
              </NavLink>
              <NavLink to="/profile" className="auth-link-item" style={({ isActive }) => ({ color: isActive ? "#f7c66b" : "rgba(255,255,255,0.85)", padding: "6px 10px", borderRadius: 50, fontWeight: 600, fontSize: "11px", border: "1px solid rgba(255,255,255,0.1)", textDecoration: "none", display: "flex", alignItems: "center", gap: "3px", whiteSpace: "nowrap" })}>
                <User size={12} /> {user?.name?.split(" ")[0] || "Profile"}
              </NavLink>
              <button onClick={handleLogout} className="auth-link-item" style={{ padding: "6px 10px", borderRadius: 50, fontWeight: 600, fontSize: "11px", border: "1px solid rgba(239,68,68,0.3)", background: "rgba(239,68,68,0.1)", color: "#fca5a5", cursor: "pointer", display: "flex", alignItems: "center", gap: "3px", whiteSpace: "nowrap" }}>
                <LogOut size={12} /> Logout
              </button>
            </>
          ) : (
            <NavLink to="/login" className="auth-link-item" style={({ isActive }) => ({ color: isActive ? "#f7c66b" : "rgba(255,255,255,0.85)", textDecoration: "none", padding: "7px 14px", borderRadius: 50, background: isActive ? "rgba(247,198,107,0.12)" : "rgba(255,255,255,0.04)", fontWeight: isActive ? 800 : 500, border: isActive ? "1px solid rgba(247,198,107,0.25)" : "1px solid rgba(255,255,255,0.06)", fontSize: "12px", whiteSpace: "nowrap" })}>
              Login
            </NavLink>
          )}
        </nav>

        <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(true)} style={{ display: "none", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", color: "#fff", width: 40, height: 40, borderRadius: "50%", cursor: "pointer", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <MenuIcon size={20} />
        </button>
      </header>

      {/* Mobile Slide Menu */}
      <div className={`mobile-menu-overlay ${mobileMenuOpen ? "open" : ""}`} onClick={() => setMobileMenuOpen(false)} />
      <div className={`mobile-menu-panel ${mobileMenuOpen ? "open" : ""}`}>
        <div className="mm-header">
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg, #f7c66b, #d99523)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <UtensilsCrossed size={14} color="#5a0c0c" />
            </div>
            <div>
              <div style={{ color: "#f7c66b", fontSize: 14, fontWeight: 900, fontFamily: "Georgia, serif" }}>TAJ</div>
              <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 7, fontWeight: 700, letterSpacing: 2 }}>BRIYANI</div>
            </div>
          </div>
          <button className="mm-close" onClick={() => setMobileMenuOpen(false)}>
            <X size={18} />
          </button>
        </div>

        {navItems.map((item) => (
          <NavLink key={item.to} to={item.to} end={item.end}
            className={({ isActive }) => `mm-nav-item ${isActive ? "active" : ""}`}
            style={{ color: "inherit", textDecoration: "none" }}>
            {item.label}
          </NavLink>
        ))}

        <div className="mm-divider" />

        {isAuthenticated ? (
          <>
            <NavLink to="/order-history" className="mm-nav-item" style={{ color: "inherit", textDecoration: "none" }}>
              <History size={18} /> Orders
            </NavLink>
            <NavLink to="/profile" className="mm-nav-item" style={{ color: "inherit", textDecoration: "none" }}>
              <User size={18} /> Profile
            </NavLink>
            <button className="mm-nav-item" onClick={() => { handleLogout(); setMobileMenuOpen(false); }} style={{ color: "#fca5a5" }}>
              <LogOut size={18} /> Logout
            </button>
          </>
        ) : (
          <NavLink to="/login" className="mm-nav-item" style={{ color: "inherit", textDecoration: "none" }}>
            <User size={18} /> Login
          </NavLink>
        )}

        <div className="mm-footer">
          <button onClick={() => { toggleDark(); }} style={{ display: "flex", alignItems: "center", gap: 8, background: "none", border: "none", color: "rgba(255,255,255,0.6)", cursor: "pointer", fontSize: 13, fontWeight: 600, padding: "8px 0" }}>
            {darkMode ? <Sun size={16} color="#f7c66b" /> : <Moon size={16} />}
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
      </div>

      <Analytics />
      <main style={{ padding: "0 0 40px 0" }} role="main" aria-label="Main content">
        {toast && (
          <div style={{
            position: "fixed",
            top: 80,
            right: 20,
            zIndex: 9999,
            background: "linear-gradient(135deg, #065f46, #047857)",
            color: "#fff",
            padding: "14px 24px",
            borderRadius: 12,
            fontWeight: 700,
            fontSize: 14,
            boxShadow: "0 8px 32px rgba(6,95,70,0.4)",
            animation: "slideInRight 0.35s ease",
            display: "flex",
            alignItems: "center",
            gap: 10,
            maxWidth: "90vw",
          }}>
            <span style={{ fontSize: 18 }}>✓</span>
            {toast.message}
            <button
              onClick={() => setToast(null)}
              style={{
                background: "rgba(255,255,255,0.2)",
                border: "none",
                color: "#fff",
                marginLeft: 8,
                cursor: "pointer",
                width: 24,
                height: 24,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 14,
                fontWeight: 900,
              }}
            >
              ×
            </button>
          </div>
        )}
        <style>{`
          @keyframes slideInRight {
            from { transform: translateX(120%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
          }
        `}</style>
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<TajBiryani onAddToCart={handleAddToCart} onApplyCoupon={handleApplyCoupon} />} />
            <Route path="/menu" element={<Menu searchQuery={searchQuery} onSearchChange={setSearchQuery} onAddToCart={handleAddToCart} cartCount={cartCount} />} />
            <Route path="/cart" element={<Cart cartItems={cartItems} onUpdateQuantity={handleUpdateCartItem} onRemoveItem={handleRemoveCartItem} onClearCart={handleClearCart} appliedCoupon={appliedCoupon} onApplyCoupon={handleApplyCoupon} />} />
            <Route path="/checkout" element={<Checkout cartItems={cartItems} appliedCoupon={appliedCoupon} onClearCart={handleClearCart} />} />
            <Route path="/track-order/:orderId?" element={<TrackOrder />} />
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
              <div style={{ width: 45, height: 45, borderRadius: "50%", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: "0 4px 12px rgba(247,198,107,0.2)" }}>
                <img src={tajLogo} alt="Taj Briyani Logo" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <div>
                <div className="footerLogoTitle">TAJ</div>
                <div className="footerLogoSub">BRIYANI</div>
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
              <li><span className="footerContactItem"><Mail size={14} style={{ marginRight: 6, verticalAlign: "middle", color: "#f7c66b", flexShrink: 0 }} /> info@tajbriyani.com</span></li>
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
          <p>&copy; 2026 Taj Briyani. All rights reserved.</p>
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
          top: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg, transparent, #f7c66b, #d99523, #f7c66b, transparent);
        }
        .footerInner {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
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
        .footerBottom p { margin: 0; }

        @media (max-width: 768px) {
          .footerInner {
            gap: 16px;
          }
          .footerDesc { font-size: 10px !important; line-height: 1.5; }
          .footerHeading { font-size: 11px !important; }
          .footerContactItem { font-size: 10px !important; }
          .footerLogoTitle { font-size: 16px !important; }
          .footerLogoSub { font-size: 8px !important; }
          .footerLinks a { font-size: 11px; }
          .footerLinks li { margin-bottom: 6px; }
          .siteFooter { padding: 36px 3% 0; }
        }
        @media (max-width: 480px) {
          .footerInner { gap: 10px; }
          .footerLogoTitle { font-size: 14px !important; }
          .footerLinks a { font-size: 9px; }
          .footerContactItem { font-size: 8px !important; }
          .footerHeading { font-size: 9px !important; letter-spacing: 0.5px; }
          .footerDesc { font-size: 8px !important; }
          .footerLogo { gap: 6px; }
          .footerLogoSub { font-size: 7px !important; letter-spacing: 1px !important; }
          .siteFooter { padding: 28px 2% 0; }
          .footerBottom { padding: 14px 0; font-size: 10px; }
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
          <LanguageProvider>
            <AppContent />
          </LanguageProvider>
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
