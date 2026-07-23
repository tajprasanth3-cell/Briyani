import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User, Mail, Phone, MapPin, Save, ArrowLeft, Lock } from "lucide-react";
import { userAPI } from "../api";
import { useAuth } from "../context/AuthContext";
import LoadingSpinner from "./LoadingSpinner";

export default function Profile() {
  const navigate = useNavigate();
  const { updateUser, token } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "" });
  const [passwordForm, setPasswordForm] = useState({ currentPassword: "", newPassword: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);
  const [activeTab, setActiveTab] = useState("profile");

  useEffect(() => {
    if (!token) { navigate("/login"); return; }
    const loadProfile = async () => {
      try {
        const res = await userAPI.getProfile();
        const u = res.data;
        setForm({ name: u.name || "", email: u.email || "", phone: u.phone || "", address: u.address || "" });
      } catch (e) {
        setMessage({ type: "error", text: e.message });
      } finally {
        setLoading(false);
      }
    };
    loadProfile();
  }, [token, navigate]);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);
    try {
      await userAPI.updateProfile(form);
      updateUser(form);
      setMessage({ type: "success", text: "Profile updated successfully!" });
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5001/api"}/auth/change-password`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(passwordForm),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message);
      setMessage({ type: "success", text: "Password changed successfully!" });
      setPasswordForm({ currentPassword: "", newPassword: "" });
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  const inputStyle = {
    width: "100%",
    padding: "14px 16px 14px 44px",
    border: "2px solid #eee",
    borderRadius: "12px",
    fontSize: "14px",
    fontFamily: "inherit",
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.3s",
  };

  return (
    <div style={{ minHeight: "80vh", background: "linear-gradient(135deg, #faf6f0 0%, #f3ede4 100%)", padding: "40px 20px" }}>
      <style>{`
        @media (max-width: 768px) { .profileCard { padding: 24px 18px !important; } .profileTitle { font-size: 24px !important; } }
        @media (max-width: 480px) { .profileCard { padding: 18px 14px !important; border-radius: 16px !important; } .profileTitle { font-size: 20px !important; } }
      `}</style>
      <div style={{ maxWidth: "600px", margin: "0 auto" }}>
        <button onClick={() => navigate(-1)} style={{ background: "rgba(107,15,15,0.08)", color: "#6b0f0f", border: "none", cursor: "pointer", padding: "10px 20px", borderRadius: "12px", fontSize: "14px", fontWeight: "700", display: "flex", alignItems: "center", gap: "8px", marginBottom: "24px" }}>
          <ArrowLeft size={20} /> Back
        </button>

        <h1 className="profileTitle" style={{ fontSize: "32px", fontWeight: "900", color: "#6b0f0f", margin: "0 0 8px", fontFamily: "Georgia, serif" }}>My Profile</h1>
        <p style={{ fontSize: "13px", color: "#c89a2b", marginBottom: "32px", fontWeight: "700" }}>MANAGE YOUR ACCOUNT</p>

        <div style={{ display: "flex", gap: "8px", marginBottom: "24px" }}>
          {["profile", "password"].map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{
              padding: "10px 20px", borderRadius: "10px", border: "none",
              background: activeTab === tab ? "linear-gradient(135deg, #6b0f0f, #8b1a1a)" : "#fff",
              color: activeTab === tab ? "#f7c66b" : "#666",
              fontWeight: "700", fontSize: "13px", cursor: "pointer",
              boxShadow: activeTab === tab ? "0 4px 12px rgba(107,15,15,0.3)" : "0 2px 8px rgba(0,0,0,0.06)",
            }}>
              {tab === "profile" ? "Profile Info" : "Change Password"}
            </button>
          ))}
        </div>

        {message && (
          <div style={{
            background: message.type === "success" ? "#f0fdf4" : "#fef2f2",
            border: `1px solid ${message.type === "success" ? "#bbf7d0" : "#fecaca"}`,
            borderRadius: "12px", padding: "12px 16px", marginBottom: "20px",
            fontSize: "13px", fontWeight: "600",
            color: message.type === "success" ? "#16a34a" : "#dc2626",
          }}>
            {message.text}
          </div>
        )}

        <div className="profileCard" style={{ background: "#fff", borderRadius: "20px", padding: "32px", boxShadow: "0 12px 40px rgba(0,0,0,0.08)" }}>
          {activeTab === "profile" ? (
            <form onSubmit={handleSave} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {[
                { label: "Full Name", name: "name", icon: <User size={16} /> },
                { label: "Email", name: "email", icon: <Mail size={16} />, type: "email" },
                { label: "Phone", name: "phone", icon: <Phone size={16} /> },
                { label: "Address", name: "address", icon: <MapPin size={16} /> },
              ].map((field) => (
                <div key={field.name}>
                  <label style={{ fontSize: "11px", fontWeight: "700", color: "#666", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "6px", display: "block" }}>{field.label}</label>
                  <div style={{ position: "relative" }}>
                    <div style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "#c89a2b" }}>{field.icon}</div>
                    <input type={field.type || "text"} value={form[field.name]} onChange={(e) => setForm({ ...form, [field.name]: e.target.value })} style={inputStyle}
                      onFocus={(e) => e.target.style.borderColor = "#c89a2b"}
                      onBlur={(e) => e.target.style.borderColor = "#eee"} />
                  </div>
                </div>
              ))}
              <button type="submit" disabled={saving} style={{
                background: "linear-gradient(135deg, #6b0f0f, #8b1a1a)", color: "#f7c66b",
                border: "none", padding: "14px", borderRadius: "12px", fontSize: "14px",
                fontWeight: "800", cursor: saving ? "not-allowed" : "pointer",
                display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                opacity: saving ? 0.7 : 1,
              }}>
                <Save size={16} /> {saving ? "Saving..." : "Save Changes"}
              </button>
            </form>
          ) : (
            <form onSubmit={handlePasswordChange} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div>
                <label style={{ fontSize: "11px", fontWeight: "700", color: "#666", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "6px", display: "block" }}>Current Password</label>
                <div style={{ position: "relative" }}>
                  <div style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "#c89a2b" }}><Lock size={16} /></div>
                  <input type="password" value={passwordForm.currentPassword} onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })} placeholder="Enter current password" style={inputStyle} required />
                </div>
              </div>
              <div>
                <label style={{ fontSize: "11px", fontWeight: "700", color: "#666", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "6px", display: "block" }}>New Password</label>
                <div style={{ position: "relative" }}>
                  <div style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "#c89a2b" }}><Lock size={16} /></div>
                  <input type="password" value={passwordForm.newPassword} onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })} placeholder="Min. 6 characters" style={inputStyle} required minLength={6} />
                </div>
              </div>
              <button type="submit" disabled={saving} style={{
                background: "linear-gradient(135deg, #6b0f0f, #8b1a1a)", color: "#f7c66b",
                border: "none", padding: "14px", borderRadius: "12px", fontSize: "14px",
                fontWeight: "800", cursor: saving ? "not-allowed" : "pointer",
                opacity: saving ? 0.7 : 1,
              }}>
                {saving ? "Changing..." : "Change Password"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
