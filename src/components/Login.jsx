import { useNavigate } from "react-router-dom";
import slideOne from "./Images/slide image.png";

const loginStyles = `
.loginPage {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Poppins", sans-serif;
  background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url("${slideOne}") center/cover no-repeat;
  padding: 20px;
}

.loginCard {
  width: 100%;
  max-width: 400px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
  color: #fff;
  text-align: center;
}

.loginLogo {
  font-family: Georgia, serif;
  font-size: 32px;
  color: #f5c75e;
  margin-bottom: 30px;
  font-weight: 800;
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
  font-size: 14px;
  margin-bottom: 8px;
  color: #f7c66b;
}

.loginInput {
  width: 100%;
  padding: 12px 16px;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 8px;
  font-size: 16px;
  color: #333;
  outline: none;
}

.loginSubmitBtn {
  background: linear-gradient(180deg, #f3bd4f, #d99523);
  color: #160604;
  padding: 14px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 800;
  cursor: pointer;
  margin-top: 10px;
  transition: transform 0.2s;
}

.loginSubmitBtn:hover {
  transform: translateY(-2px);
}

.loginFooter {
  margin-top: 20px;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
}

.loginFooter span {
  color: #f5c75e;
  cursor: pointer;
  font-weight: 600;
}
`;

export default function Login() {
  const navigate = useNavigate();

  return (
    <div className="loginPage">
      <style>{loginStyles}</style>
      <div className="loginCard">
        <div className="loginLogo">👑 ROYAL TAJ</div>
        <h2 style={{ marginBottom: '20px' }}>Welcome Back</h2>
        <form className="loginForm" onSubmit={(e) => e.preventDefault()}>
          <div className="loginInputGroup">
            <label>Email Address</label>
            <input type="email" placeholder="Enter your email" className="loginInput" required />
          </div>
          <div className="loginInputGroup">
            <label>Password</label>
            <input type="password" placeholder="Enter your password" className="loginInput" required />
          </div>
          <button type="submit" className="loginSubmitBtn">SIGN IN</button>
        </form>
        <p className="loginFooter">Don't have an account? <span onClick={() => navigate("/menu")}>Sign Up</span></p>
      </div>
    </div>
  );
}