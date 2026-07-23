import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Crown, Mail, Lock } from "lucide-react";
import { authAPI } from "../api";
import { useAuth } from "../context/AuthContext";
import One from "./Images/one.jpg";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isSubmitHovered, setIsSubmitHovered] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await authAPI.login(email, password);
      login(res.data, res.data.token);
      if (res.data.isAdmin) {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = (isFocused) => ({
    width: "100%",
    padding: "15px 16px 15px 48px",
    backgroundColor: "rgba(18, 5, 3, 0.65)",
    border: isFocused ? "1px solid #f7c66b" : "1px solid rgba(247, 198, 107, 0.2)",
    borderRadius: "14px",
    fontSize: "15px",
    color: "#f8f6f2",
    outline: "none",
    fontFamily: "'Poppins', sans-serif",
    transition: "all 0.3s ease",
    boxSizing: "border-box",
    boxShadow: isFocused ? "0 0 15px rgba(247, 198, 107, 0.12)" : "none",
  });

  return (
    <div style={{
      position: "relative",
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'Poppins', sans-serif",
      backgroundColor: "#120503",
      color: "#f8f6f2",
      overflow: "hidden",
      padding: "20px",
    }}>
      <style>{`
        @media (max-width: 480px) {
          .loginCard { padding: 32px 20px !important; border-radius: 20px !important; }
          .loginTitle { font-size: 20px !important; letter-spacing: 2px !important; }
        }
        @media (max-width: 768px) {
          .loginCard { padding: 40px 28px !important; }
        }
      `}</style>
      <img src={One} alt="Royal Biryani background" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 1 }} />
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle, rgba(18,5,3,0.45) 0%, rgba(18,5,3,0.9) 85%, #120503 100%)", zIndex: 2 }} />

      <div style={{ position: "relative", zIndex: 3, width: "100%", maxWidth: "500px" }}>
        <div className="loginCard" style={{
          backgroundColor: "rgba(22, 10, 8, 0.78)",
          border: "1px solid rgba(247, 198, 107, 0.25)",
          borderRadius: "28px",
          padding: "55px 45px",
          boxShadow: "0 30px 80px rgba(0, 0, 0, 0.75)",
          backdropFilter: "blur(20px)",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "4px", background: "linear-gradient(90deg, transparent, #f7c66b, transparent)" }} />

          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", marginBottom: "8px" }}>
            <Crown size={30} color="#f7c66b" style={{ filter: "drop-shadow(0 0 8px rgba(247, 198, 107, 0.4))" }} />
            <span className="loginTitle" style={{ fontFamily: "'Cinzel', serif", fontSize: "28px", fontWeight: "700", letterSpacing: "4px" }}>ROYAL TAJ</span>
          </div>
          <p style={{ color: "#c9bda8", fontSize: "13px", letterSpacing: "1px", margin: "0 0 36px", textTransform: "uppercase" }}>Sign in to continue your food journey</p>

          {error && (
            <div style={{ background: "rgba(239,68,68,0.15)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: "10px", padding: "10px 14px", marginBottom: "16px", fontSize: "13px", color: "#fca5a5" }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
            <div style={{ textAlign: "left" }}>
              <label style={{ display: "block", fontSize: "12px", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: "8px", color: "#f7c66b", fontWeight: "600" }}>Email Address</label>
              <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                <Mail style={{ position: "absolute", left: "16px", color: isEmailFocused ? "#f7c66b" : "rgba(247, 198, 107, 0.5)", transition: "color 0.3s" }} size={18} />
                <input type="email" placeholder="Enter your email" style={inputStyle(isEmailFocused)} value={email} onChange={(e) => setEmail(e.target.value)} onFocus={() => setIsEmailFocused(true)} onBlur={() => setIsEmailFocused(false)} required />
              </div>
            </div>

            <div style={{ textAlign: "left" }}>
              <label style={{ display: "block", fontSize: "12px", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: "8px", color: "#f7c66b", fontWeight: "600" }}>Password</label>
              <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                <Lock style={{ position: "absolute", left: "16px", color: isPasswordFocused ? "#f7c66b" : "rgba(247, 198, 107, 0.5)", transition: "color 0.3s" }} size={18} />
                <input type="password" placeholder="Enter your password" style={inputStyle(isPasswordFocused)} value={password} onChange={(e) => setPassword(e.target.value)} onFocus={() => setIsPasswordFocused(true)} onBlur={() => setIsPasswordFocused(false)} required />
              </div>
            </div>

            <button type="submit" disabled={loading} onMouseEnter={() => setIsSubmitHovered(true)} onMouseLeave={() => setIsSubmitHovered(false)} style={{
              background: "linear-gradient(135deg, #f7c66b 0%, #d99523 100%)",
              color: "#120503",
              padding: "16px",
              border: "none",
              borderRadius: "14px",
              fontSize: "14px",
              fontWeight: "700",
              letterSpacing: "2px",
              textTransform: "uppercase",
              cursor: loading ? "not-allowed" : "pointer",
              marginTop: "10px",
              boxShadow: isSubmitHovered ? "0 12px 30px rgba(217, 149, 35, 0.45)" : "0 8px 25px rgba(217, 149, 35, 0.25)",
              transform: isSubmitHovered ? "translateY(-2px)" : "translateY(0)",
              opacity: loading ? 0.7 : 1,
              transition: "all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)",
            }}>
              {loading ? "Signing In..." : "SIGN IN"}
            </button>
          </form>

          <div style={{ display: "flex", alignItems: "center", gap: "16px", margin: "32px 0 24px", color: "rgba(201, 189, 168, 0.3)", fontSize: "11px", textTransform: "uppercase", letterSpacing: "2px", fontWeight: "600" }}>
            <div style={{ flex: 1, height: "1px", background: "rgba(201, 189, 168, 0.15)" }} />
            <span>Taj Biryani</span>
            <div style={{ flex: 1, height: "1px", background: "rgba(201, 189, 168, 0.15)" }} />
          </div>

          <p style={{ fontSize: "13px", color: "#c9bda8", margin: 0 }}>
            Don't have an account?{" "}
            <span onClick={() => navigate("/register")} style={{ color: "#f7c66b", cursor: "pointer", fontWeight: "600" }}>Sign Up</span>
          </p>
        </div>
      </div>
    </div>
  );
}
