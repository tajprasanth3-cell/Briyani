import { useState } from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import TajBiryani from "./components/Briyani.jsx";
import Menu from "./components/Menu.jsx";
import Cart from "./components/Cart.jsx";
import Checkout from "./components/Checkout.jsx";
import TrackOrder from "./components/Ordertrack.jsx";
import logo from "./components/Images/logo.png"; // Changed to an existing image to resolve import error
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

  const handleAddToCart = (product) => {
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
  };

  const handleUpdateCartItem = (id, change) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + change }
          : item
      ).filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveCartItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCart = () => setCartItems([]);

  return (
    <BrowserRouter>
      <style>
        {`
          /* Global Responsive Layout */
          @media (max-width: 1024px) {
            .navbar { padding: 12px 3% !important; }
            .nav-search { width: 40% !important; }
          }

          @media (max-width: 768px) {
            /* Stack Navbar items */
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
            
            /* Universal Responsive Grid */
            .responsive-grid { 
              grid-template-columns: 1fr !important; 
              gap: 20px !important;
            }
            
            .responsive-flex {
              flex-direction: column !important;
            }
            
            .mobile-hide { display: none !important; }
            
            /* Typography */
            .hero-title { font-size: 32px !important; line-height: 1.2 !important; }
            .hero-subtitle { font-size: 18px !important; }
            .section-title { font-size: 24px !important; }
            
            /* Component Specific Adjustments */
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
          fontFamily: "Poppins, sans-serif",
        }}
      >
        <header
          className="navbar"
          style={{
            background: "#6b0f0f",
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
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <img src={logo} alt="TAJ BIRYANI" style={{ width: 68, height: 48, borderRadius: 8, objectFit: "cover" }} />
            <div
              style={{
                color: "#f7c66b",
                fontSize: "20px",
                fontWeight: "700",
                marginLeft: 6,
              }}
            >
              TAJ BIRYANI
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
                  color: isActive ? "#f7c66b" : "#fff",
                  textDecoration: "none",
                  padding: "8px 12px",
                  borderRadius: "8px",
                  background: isActive ? "rgba(247,198,107,0.12)" : "transparent",
                  fontWeight: isActive ? 700 : 500,
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
      </div>
    </BrowserRouter>
  );
}
