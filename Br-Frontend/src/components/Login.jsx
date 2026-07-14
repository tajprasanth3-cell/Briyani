import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Crown, Mail, Lock } from "lucide-react";
import One from "./Images/one.jpg";

export default function Login() {
  const navigate = useNavigate();

  // Input states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Responsive state
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Focus states for input glows
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  // Hover states
  const [isSubmitHovered, setIsSubmitHovered] = useState(false);
  const [isSignUpHovered, setIsSignUpHovered] = useState(false);
  const [loginNotif, setLoginNotif] = useState(null);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      navigate("/");
    }
  };

  const isMobile = windowWidth <= 576;

  // --- Dynamic Inline Styles ---
  const styles = {
    page: {
      position: "relative",
      minHeight: "10vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'Poppins', sans-serif",
      backgroundColor: "#120503",
      color: "#f8f6f2",
      overflow: "hidden",
      padding: "20px",
      boxSizing: "border-box",
    },
    backgroundImage: {
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      objectFit: "cover",
      zIndex: 1,
    },
    imageOverlay: {
      position: "absolute",
      inset: 0,
      background: "radial-gradient(circle, rgba(18, 5, 3, 0.45) 0%, rgba(18, 5, 3, 0.9) 85%, #120503 100%)",
      pointerEvents: "none",
      zIndex: 2,
    },
    cardContainer: {
      position: "relative",
      zIndex: 3,
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    card: {
      width: "100%",
      height: "530px",
      maxWidth: "500px",
      backgroundColor: "rgba(22, 10, 8, 0.78)",
      border: "1px solid rgba(247, 198, 107, 0.25)",
      borderRadius: isMobile ? "20px" : "28px",
      padding: isMobile ? "40px 25px" : "55px 45px",
      boxShadow: "0 30px 80px rgba(0, 0, 0, 0.75)",
      backdropFilter: "blur(20px)",
      color: "#f8f6f2",
      textAlign: "center",
      position: "relative",
      overflow: "hidden",
      boxSizing: "border-box",
    },
    cardTopBorder: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: "4px",
      background: "linear-gradient(90deg, transparent, #f7c66b, transparent)",
    },
    logo: {
      fontFamily: "'Cinzel', serif",
      fontSize: isMobile ? "24px" : "28px",
      fontWeight: "700",
      letterSpacing: "4px",
      color: "#f8f6f2",
      marginBottom: "8px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "12px",
    },
    logoIcon: {
      color: "#f7c66b",
      filter: "drop-shadow(0 0 8px rgba(247, 198, 107, 0.4))",
    },
    welcome: {
      fontFamily: "'Poppins', sans-serif",
      color: "#c9bda8",
      fontSize: "13px",
      letterSpacing: "1px",
      margin: "0 0 36px 0",
      textTransform: "uppercase",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      gap: "22px",
    },
    inputGroup: {
      textAlign: "left",
    },
    inputLabel: {
      display: "block",
      fontSize: "12px",
      textTransform: "uppercase",
      letterSpacing: "1.5px",
      marginBottom: "8px",
      color: "#f7c66b",
      fontWeight: "600",
    },
    inputWrapper: {
      position: "relative",
      display: "flex",
      alignItems: "center",
    },
    inputIcon: (isFocused) => ({
      position: "absolute",
      left: isMobile ? "14px" : "16px",
      color: isFocused ? "#f7c66b" : "rgba(247, 198, 107, 0.5)",
      transition: "color 0.3s",
    }),
    input: (isFocused) => ({
      width: "100%",
      padding: isMobile ? "13px 14px 13px 44px" : "15px 16px 15px 48px",
      backgroundColor: "rgba(18, 5, 3, 0.65)",
      border: isFocused ? "1px solid #f7c66b" : "1px solid rgba(247, 198, 107, 0.2)",
      borderRadius: "14px",
      fontSize: isMobile ? "14px" : "15px",
      color: "#f8f6f2",
      outline: "none",
      fontFamily: "'Poppins', sans-serif",
      transition: "all 0.3s ease",
      boxSizing: "border-box",
      boxShadow: isFocused ? "0 0 15px rgba(247, 198, 107, 0.12), inset 0 0 10px rgba(0, 0, 0, 0.3)" : "none",
    }),
    submitBtn: {
      background: "linear-gradient(135deg, #f7c66b 0%, #d99523 100%)",
      color: "#120503",
      padding: isMobile ? "14px" : "16px",
      border: "none",
      borderRadius: "14px",
      fontSize: isMobile ? "13px" : "14px",
      fontWeight: "700",
      letterSpacing: "2px",
      textTransform: "uppercase",
      cursor: "pointer",
      marginTop: "10px",
      boxShadow: isSubmitHovered 
        ? "0 12px 30px rgba(217, 149, 35, 0.45)" 
        : "0 8px 25px rgba(217, 149, 35, 0.25)",
      transform: isSubmitHovered ? "translateY(-2px)" : "translateY(0)",
      filter: isSubmitHovered ? "brightness(1.1)" : "brightness(1)",
      transition: "all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)",
    },
    divider: {
      display: "flex",
      alignItems: "center",
      gap: "16px",
      margin: "32px 0 24px 0",
      color: "rgba(201, 189, 168, 0.3)",
      fontSize: "11px",
      textTransform: "uppercase",
      letterSpacing: "2px",
      fontWeight: "600",
    },
    dividerLine: {
      flex: 1,
      height: "1px",
      background: "rgba(201, 189, 168, 0.15)",
    },
    footer: {
      fontSize: "13px",
      color: "#c9bda8",
      margin: 0,
    },
    footerLink: {
      color: "#f7c66b",
      cursor: "pointer",
      fontWeight: "600",
      transition: "all 0.3s",
      borderBottom: isSignUpHovered ? "1px solid #f7c66b" : "1px dashed transparent",
      paddingBottom: "2px",
    }
  };

  return (
    <div style={styles.page}>
      {/* Full screen atmospheric food background */}
      <img src={One} alt="Royal Biryani background" style={styles.backgroundImage} />
      <div style={styles.imageOverlay}></div>

      {/* Centered Login Card Container */}
      <div style={styles.cardContainer}>
        <div style={styles.card}>
          <div style={styles.cardTopBorder}></div>
          
          <div style={styles.logo}>
            <Crown style={styles.logoIcon} size={30} />
            <span>ROYAL TAJ</span>
          </div>
          <p style={styles.welcome}>Sign in to continue your food journey</p>
          
          <form style={styles.form} onSubmit={handleSubmit}>
            <div style={styles.inputGroup}>
              <label style={styles.inputLabel}>Email Address</label>
              <div style={styles.inputWrapper}>
                <Mail 
                  style={styles.inputIcon(isEmailFocused)} 
                  size={18} 
                />
                <input
                  type="email"
                  placeholder="Enter your email"
                  style={styles.input(isEmailFocused)}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setIsEmailFocused(true)}
                  onBlur={() => setIsEmailFocused(false)}
                  required
                />
              </div>
            </div>
            
            <div style={styles.inputGroup}>
              <label style={styles.inputLabel}>Password</label>
              <div style={styles.inputWrapper}>
                <Lock 
                  style={styles.inputIcon(isPasswordFocused)} 
                  size={18} 
                />
                <input
                  type="password"
                  placeholder="Enter your password"
                  style={styles.input(isPasswordFocused)}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setIsPasswordFocused(true)}
                  onBlur={() => setIsPasswordFocused(false)}
                  required
                />
              </div>
            </div>
            
            <button 
              type="submit" 
              style={styles.submitBtn}
              onMouseEnter={() => setIsSubmitHovered(true)}
              onMouseLeave={() => setIsSubmitHovered(false)}
            >
              SIGN IN
            </button>
          </form>
          
          <div style={styles.divider}>
            <span style={styles.dividerLine}></span>
            <span>Taj Biryani</span>
            <span style={styles.dividerLine}></span>
          </div>
          
          <p style={styles.footer}>
            Don't have an account?{" "}
            <span 
              style={styles.footerLink}
              onClick={() => navigate("/menu")}
              onMouseEnter={() => setIsSignUpHovered(true)}
              onMouseLeave={() => setIsSignUpHovered(false)}
            >
              Sign Up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}