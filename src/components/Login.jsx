import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Crown } from "lucide-react";
import One from "./Images/one.jpg";

const loginStyles = `
.loginPage {
  min-height: 100vh;
  display: flex;
  font-family: "Poppins", sans-serif;
  background: #f8f6f2;
}

.loginImagePanel {
  flex: 7;
  position: relative;
  overflow: hidden;
  min-height: 100vh;
}

.loginImagePanel::before {
  content: "";
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 30% 50%, rgba(247, 198, 107, 0.15), transparent 60%);
  pointer-events: none;
  z-index: 1;
}

.loginFoodImage {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-12px); }
}

.loginImageText {
  position: absolute;
  bottom: 50px;
  left: 50%;
  transform: translateX(-50%);
  color: #fff;
  text-align: center;
  z-index: 2;
  width: 100%;
  height: 100%;
}

.loginFormPanel {
  flex: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  min-height: 100vh;
}

.loginCard {
  width: 90%;
  height: auto;
  max-width: 420px;
  background: #fff;
  border-radius: 24px;
  padding: 48px 40px;
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.08);
  color: #333;
  text-align: center;
}

.loginLogo {
  font-family: Georgia, serif;
  font-size: 30px;
  color: #6b0f0f;
  margin-bottom: 8px;
  font-weight: 800;
}

.loginWelcome {
  color: #8a5a44;
  font-size: 14px;
  margin: 0 0 32px;
}

.loginForm {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.loginInputGroup {
  text-align: left;
}

.loginInputGroup label {
  display: block;
  font-size: 13px;
  margin-bottom: 6px;
  color: #6b0f0f;
  font-weight: 600;
}

.loginInput {
  width: 100%;
  padding: 14px 16px;
  background: #f8f6f2;
  border: 2px solid transparent;
  border-radius: 12px;
  font-size: 15px;
  color: #333;
  outline: none;
  transition: border-color 0.3s ease;
  box-sizing: border-box;
}

.loginInput:focus {
  border-color: #f3bd4f;
  background: #fff;
}

.loginSubmitBtn {
  background: linear-gradient(180deg, #f3bd4f, #d99523);
  color: #160604;
  padding: 15px;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 800;
  cursor: pointer;
  margin-top: 10px;
  transition: transform 0.2s, box-shadow 0.2s;
}

.loginSubmitBtn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(217, 149, 35, 0.3);
}

.loginFooter {
  margin-top: 24px;
  font-size: 14px;
  color: #666;
}

.loginFooter span {
  color: #d99523;
  cursor: pointer;
  font-weight: 700;
}

.loginDivider {
  display: flex;
  align-items: center;
  gap: 16px;
  margin: 24px 0 0;
  color: #ccc;
  font-size: 12px;
}

.loginDivider::before,
.loginDivider::after {
  content: "";
  flex: 1;
  height: 1px;
  background: #eee;
}

@media (max-width: 1024px) {
  .loginImagePanel {
    flex: 5;
  }

  .loginFormPanel {
    flex: 4;
    padding: 30px;
  }
}

@media (max-width: 900px) {
  .loginImagePanel {
    display: none;
  }

  .loginFormPanel {
    padding: 20px;
    min-height: 100vh;
    flex: 1;
  }

  .loginCard {
    padding: 36px 24px;
  }
}

@media (max-width: 480px) {
  .loginCard {
    padding: 28px 18px;
    max-width: 100%;
  }

  .loginLogo {
    font-size: 24px;
  }

  .loginSubmitBtn {
    padding: 13px;
    font-size: 15px;
  }
}
`;

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      navigate("/");
    }
  };

  return (
    <div className="loginPage">
      <style>{loginStyles}</style>
      <div className="loginImagePanel">
        <img src={One} alt="Chicken Dum Biryani" className="loginFoodImage" />
      </div>
      <div className="loginFormPanel">
        <div className="loginCard">
          <div className="loginLogo"><Crown size={24} style={{ verticalAlign: "middle", marginRight: 8, color: "#f7c66b" }} /> ROYAL TAJ</div>
          <p className="loginWelcome">Sign in to continue your food journey</p>
          <form className="loginForm" onSubmit={handleSubmit}>
            <div className="loginInputGroup">
              <label>Email Address</label>
              <input type="email" placeholder="Enter your email" className="loginInput" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="loginInputGroup">
              <label>Password</label>
              <input type="password" placeholder="Enter your password" className="loginInput" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <button type="submit" className="loginSubmitBtn">SIGN IN</button>
          </form>
          <div className="loginDivider">TAJ BIRYANI</div>
          <p className="loginFooter">Don't have an account? <span onClick={() => navigate("/menu")}>Sign Up</span></p>
        </div>
      </div>
    </div>
  );
}
