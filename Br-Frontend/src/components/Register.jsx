import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Crown, Mail, Lock, User, Phone } from "lucide-react";
import { authAPI } from "../api";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", password: "", phone: "", address: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const validate = () => {
    const errs = {};
    if (!form.name || form.name.trim().length < 2) errs.name = "Name must be at least 2 characters";
    if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Valid email is required";
    if (!form.password || form.password.length < 6) errs.password = "Password must be at least 6 characters";
    if (form.phone && !/^[0-9]{10}$/.test(form.phone.replace(/\s/g, ""))) errs.phone = "Phone must be 10 digits";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setServerError("");
    try {
      const res = await authAPI.register(form);
      login(res.data, res.data.token);
      navigate("/");
    } catch (err) {
      setServerError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = (hasError) => ({
    width: "100%",
    padding: "13px 14px 13px 44px",
    backgroundColor: "rgba(18, 5, 3, 0.65)",
    border: hasError ? "1px solid #ef4444" : "1px solid rgba(247, 198, 107, 0.2)",
    borderRadius: "14px",
    fontSize: "14px",
    color: "#f8f6f2",
    outline: "none",
    fontFamily: "'Poppins', sans-serif",
    boxSizing: "border-box",
    transition: "all 0.3s ease",
  });

  return (
    <div style={{
      minHeight: "10vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'Poppins', sans-serif",
      backgroundColor: "#120503",
      color: "#f8f6f2",
      padding: "40px 20px",
    }}>
      <div style={{
        width: "100%",
        maxWidth: "480px",
        backgroundColor: "rgba(22, 10, 8, 0.78)",
        border: "1px solid rgba(247, 198, 107, 0.25)",
        borderRadius: "28px",
        padding: "45px",
        boxShadow: "0 30px 80px rgba(0, 0, 0, 0.75)",
        backdropFilter: "blur(20px)",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "4px", background: "linear-gradient(90deg, transparent, #f7c66b, transparent)" }} />

        <div style={{ textAlign: "center", marginBottom: "28px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", marginBottom: "8px" }}>
            <Crown size={28} color="#f7c66b" />
            <span style={{ fontSize: "26px", fontWeight: "700", letterSpacing: "3px", fontFamily: "Georgia, serif" }}>ROYAL TAJ</span>
          </div>
          <p style={{ color: "#c9bda8", fontSize: "13px", letterSpacing: "1px", textTransform: "uppercase" }}>Create your account</p>
        </div>

        {serverError && (
          <div style={{ background: "rgba(239,68,68,0.15)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: "10px", padding: "10px 14px", marginBottom: "16px", fontSize: "13px", color: "#fca5a5" }}>
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          {[
            { label: "Full Name", name: "name", type: "text", icon: <User size={18} />, placeholder: "Enter your name" },
            { label: "Email", name: "email", type: "email", icon: <Mail size={18} />, placeholder: "Enter your email" },
            { label: "Password", name: "password", type: "password", icon: <Lock size={18} />, placeholder: "Min. 6 characters" },
            { label: "Phone (optional)", name: "phone", type: "tel", icon: <Phone size={18} />, placeholder: "10-digit number" },
          ].map((field) => (
            <div key={field.name}>
              <label style={{ display: "block", fontSize: "11px", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: "6px", color: "#f7c66b", fontWeight: "600" }}>{field.label}</label>
              <div style={{ position: "relative" }}>
                <div style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", color: "rgba(247, 198, 107, 0.5)" }}>{field.icon}</div>
                <input type={field.type} placeholder={field.placeholder} value={form[field.name]}
                  onChange={(e) => setForm({ ...form, [field.name]: e.target.value })}
                  style={inputStyle(errors[field.name])} />
              </div>
              {errors[field.name] && <p style={{ fontSize: "11px", color: "#fca5a5", margin: "4px 0 0", paddingLeft: "4px" }}>{errors[field.name]}</p>}
            </div>
          ))}

          <button type="submit" disabled={loading} style={{
            background: "linear-gradient(135deg, #f7c66b 0%, #d99523 100%)",
            color: "#120503",
            padding: "15px",
            border: "none",
            borderRadius: "14px",
            fontSize: "14px",
            fontWeight: "700",
            letterSpacing: "2px",
            textTransform: "uppercase",
            cursor: loading ? "not-allowed" : "pointer",
            opacity: loading ? 0.7 : 1,
            marginTop: "8px",
            boxShadow: "0 8px 25px rgba(217, 149, 35, 0.25)",
          }}>
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <div style={{ textAlign: "center", marginTop: "24px" }}>
          <p style={{ fontSize: "13px", color: "#c9bda8", margin: 0 }}>
            Already have an account?{" "}
            <span onClick={() => navigate("/login")} style={{ color: "#f7c66b", cursor: "pointer", fontWeight: "600" }}>Sign In</span>
          </p>
        </div>
      </div>
    </div>
  );
}
