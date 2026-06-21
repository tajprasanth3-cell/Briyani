import { useState, useCallback } from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import TajBiryani from "./components/Briyani.jsx";
import Menu from "./components/Menu.jsx";
import Cart from "./components/Cart.jsx";
import Checkout from "./components/Checkout.jsx";
import TrackOrder from "./components/Ordertrack.jsx";
import Login from "./components/Login.jsx";

const navItems = [
  { to: "/", label: "Home", end: true },
  { to: "/menu", label: "Menu" },
  { to: "/cart", label: "Cart" },
  { to: "/checkout", label: "Checkout" },
  { to: "/track-order", label: "Track Order" },
];

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [cartItems, setCartItems] = useState([]);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

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

  return (
    <BrowserRouter>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Poppins:wght@400;500;600;700;800;900&display=swap');

          * { font-family: 'Poppins', sans-serif; }
          h1, h2, h3, .royal-font { font-family: 'Playfair Display', Georgia, serif; }

          @media (max-width: 1024px) {
            .navbar { padding: 12px 3% !important; }
            .nav-search { width: 40% !important; }
          }

          @media (max-width: 768px) {
            .navbar { 
              flex-direction: column; 
              height: auto !important; 
              position: sticky !important; 
              padding: 15px !important;
              align-items: stretch !important;
            }
            
            .nav-search { width: 100% !important; max-width: none !important; }
            
            header nav { 
              justify-content: center; 
              width: 100%; 
              margin-top: 10px;
            }
            
            main { padding: 15px 4% !important; }
            
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
      <div
        style={{
          minHeight: "100vh",
          background: "#f8f6f2",
        }}
      >
          <header
            className="navbar"
            style={{
              background: "linear-gradient(135deg, #5a0c0c 0%, #6b0f0f 50%, #4a0a0a 100%)",
              color: "#fff",
              padding: "12px 5%",
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
          <div style={{ display: "flex", alignItems: "center", gap: 12, background: "linear-gradient(135deg, rgba(247,198,107,0.12), rgba(247,198,107,0.04))", padding: "5px 20px 5px 8px", borderRadius: 50, border: "1px solid rgba(247,198,107,0.15)" }}>
            <div style={{ width: 44, height: 44, borderRadius: "50%", background: "linear-gradient(135deg, #f7c66b, #d99523)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, lineHeight: 1, flexShrink: 0, boxShadow: "0 4px 12px rgba(247,198,107,0.3)" }}>
              👑
            </div>
            <div>
              <div style={{ color: "#f7c66b", fontSize: "20px", fontWeight: "900", lineHeight: 1.1, letterSpacing: "1.5px", fontFamily: "Georgia, serif" }}>TAJ</div>
              <div style={{ color: "#fff", fontSize: "10px", fontWeight: "700", lineHeight: 1, letterSpacing: "2px", opacity: 0.9 }}>BIRYANI</div>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 12, flex: 1, justifyContent: "center" }}>
            <input
              className="nav-search"
              placeholder="Search biryani, dishes or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                padding: "10px 14px",
                borderRadius: 10,
                border: "none",
                width: "60%",
                maxWidth: 520,
                outline: "none",
              }}
            />
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              color: "#fff",
            }}
          >
            {cartCount > 0 && (
              <div
                style={{
                  padding: "6px 12px",
                  borderRadius: "999px",
                  background: "rgba(247,198,107,0.18)",
                  color: "#f7c66b",
                  fontWeight: 700,
                  fontSize: "14px",
                }}
              >
                Cart: {cartCount}
              </div>
            )}
          </div>

          <nav
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "12px",
              alignItems: "center",
            }}
          >
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                style={({ isActive }) => ({
                  color: isActive ? "#f7c66b" : "rgba(255,255,255,0.85)",
                  textDecoration: "none",
                  padding: "8px 16px",
                  borderRadius: "8px",
                  background: isActive ? "rgba(247,198,107,0.1)" : "transparent",
                  fontWeight: isActive ? 800 : 500,
                  border: isActive ? "1px solid rgba(247,198,107,0.2)" : "1px solid transparent",
                  fontSize: "13px",
                  letterSpacing: "0.3px",
                  transition: "all 0.2s ease",
                })}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </header>

        <main style={{ padding: "0 0 40px 0" }}>
          <Routes>
            <Route
              path="/"
              element={
                <TajBiryani
                  onAddToCart={handleAddToCart}
                />
              }
            />
            <Route
              path="/menu"
              element={
                <Menu
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                  onAddToCart={handleAddToCart}
                  cartCount={cartCount}
                />
              }
            />
            <Route
              path="/cart"
              element={
                <Cart
                  cartItems={cartItems}
                  onUpdateQuantity={handleUpdateCartItem}
                  onRemoveItem={handleRemoveCartItem}
                  onClearCart={handleClearCart}
                />
              }
            />
            <Route path="/checkout" element={<Checkout cartItems={cartItems} />} />
            <Route path="/track-order" element={<TrackOrder />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="*"
              element={
                <div
                  style={{
                    textAlign: "center",
                    padding: "60px 20px",
                    color: "#6b0f0f",
                  }}
                >
                  <h1>Page not found</h1>
                  <p>The page you are looking for does not exist.</p>
                </div>
              }
            />
          </Routes>
        </main>

        <footer className="siteFooter">
          <div className="footerInner">
            <div className="footerCol brandCol">
              <div className="footerLogo">
                <span className="footerLogoIcon">👑</span>
                <div>
                  <div className="footerLogoTitle">TAJ</div>
                  <div className="footerLogoSub">BIRYANI</div>
                </div>
              </div>
              <p className="footerDesc">
                Experience the royal taste of authentic Dum Biryani, crafted with
                premium spices and aged basmati rice.
              </p>
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
                <li><span className="footerContactItem">📍 123, Bhendi Bazaar, Mumbai</span></li>
                <li><span className="footerContactItem">📞 +91 98765 43210</span></li>
                <li><span className="footerContactItem">✉️ info@tajbiryani.com</span></li>
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
      </div>

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
        .footerLogoIcon {
          font-size: 32px;
          line-height: 1;
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
        }
      `}</style>
    </BrowserRouter>
  );
}
