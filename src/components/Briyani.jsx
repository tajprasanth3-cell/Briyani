import { useNavigate } from "react-router-dom";
import heroBg from "./Images/download.png";
import cardOne from "./Images/one.jpg";
import cardTwo from "./Images/wow.jpg";
import cardThree from "./Images/veg special.jpg";
import cardFour from "./Images/family.jpg";
import cardFive from "./Images/chicken full.jpg";
import cardSix from "./Images/kolkata.jpg";
import cardSeven from "./Images/ciiii.jpg";
import statBg1 from "./Images/ton.jpg";
import statBg2 from "./Images/ton.jpg";
import statBg3 from "./Images/ton.jpg";
import statBg4 from "./Images/ton.jpg";

const biryaniStyles = `
.briyaniPage {
  min-height: 100vh;
  font-family: "Poppins", sans-serif;
  color: #2b140f;
}

.briyaniHero {
  position: relative;
  height: 100vh;
  width: 100%;
  isolation: isolate;
  overflow: hidden;
  background: #1a0404;
}

.briyaniHeroImage {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 130%;
  object-fit: cover;
  object-position: center;
  z-index: 3;
}

.briyaniHeroShade {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 70% 45%, rgba(255, 182, 74, 0.1), transparent 30%),
    linear-gradient(180deg, rgba(18, 2, 2, 0.6) 0%, transparent 40%, rgba(18, 2, 2, 0.6) 100%);
  z-index: 0;
  pointer-events: none;
}

.briyaniTopBar {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: flex-end;
  padding: 24px 6%;
  z-index: 10;
}

.briyaniLoginBtn {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: #fff;
  padding: 8px 24px;
  border-radius: 50px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
}

.briyaniLoginBtn:hover {
  background: #f5c75e;
  color: #160604;
  border-color: #f5c75e;
}

.briyaniSecondaryBtn,
.briyaniAddBtn {
  cursor: pointer;
  font-family: inherit;
}

.briyaniFeatures {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;
  padding: 40px 5%;
}

.briyaniFeatureCard {
  border: none;
  border-radius: 16px;
  background: linear-gradient(135deg, #fff, #fef9f0);
  color: #6b0f0f;
  padding: 28px 22px;
  text-align: center;
  font-weight: 800;
  font-size: 17px;
  box-shadow: 0 12px 26px rgba(44, 18, 9, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;
  overflow: hidden;
}

.briyaniFeatureCard::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #f3bd4f, #d99523);
}

.briyaniFeatureCard:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 40px rgba(44, 18, 9, 0.14);
}

.briyaniFeatureIcon {
  font-size: 36px;
  margin-bottom: 12px;
  display: block;
}

.briyaniProductsSection {
  padding: 36px 5% 58px;
}

.briyaniSectionTitle {
  margin: 0 0 30px;
  color: #6b0f0f;
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(32px, 4vw, 46px);
  text-align: center;
}

.briyaniProductGrid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 24px;
}

.briyaniCard {
  overflow: hidden;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 14px 32px rgba(44, 18, 9, 0.12);
  display: flex;
  flex-direction: column;
}

.briyaniCardImg {
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  display: block;
}

.briyaniCardBody {
  padding: 18px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.briyaniAddBtn {
  width: 100%;
  margin-top: 15px;
  border: 0;
  border-radius: 6px;
  background: #6b0f0f;
  color: #fff;
  padding: 12px;
  font-weight: 800;
  margin-top: auto;
}

.briyaniCardTitle {
  min-height: 52px;
  margin: 0 0 8px;
  color: #5f0e0b;
  font-size: 20px;
  line-height: 1.25;
}

.briyaniPrice {
  color: #b27414;
  font-size: 19px;
  font-weight: 800;
}

.briyaniCatering {
  margin: 26px 0 46px;
  border-radius: 8px;
  padding: 70px 20px;
  background:
    linear-gradient(rgba(68, 8, 8, 0.88), rgba(68, 8, 8, 0.88)),
    url("${cardFour}") center/cover;
  color: #fff;
  text-align: center;
}

.briyaniCateringTitle {
  margin: 0 0 16px;
  color: #fff;
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(28px, 4vw, 42px);
}

.briyaniSecondaryBtn {
  margin-top: 16px;
  border: 2px solid #f7c66b;
  border-radius: 6px;
  background: #f7c66b;
  color: #2a0705;
  padding: 13px 28px;
  font-weight: 800;
}

.briyaniStats {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 20px;
  padding: 12px 5% 50px;
  text-align: center;
}

.briyaniStats > div {
  border-radius: 16px;
  background: linear-gradient(135deg, #fff 0%, #fef9f0 100%);
  padding: 28px 18px;
  box-shadow: 0 12px 26px rgba(44, 18, 9, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;
  overflow: hidden;
  isolation: isolate;
}

.briyaniStats > div::before {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, transparent 0%, rgba(247,198,107,0.08) 50%, transparent 100%);
  background-size: 200% 100%;
  animation: statShine 3s ease-in-out infinite;
  pointer-events: none;
  z-index: 0;
}

@keyframes statShine {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

.briyaniStats > div::after {
  content: "";
  position: absolute;
  inset: 0;
  background: var(--statBg) center/cover no-repeat !important;
  opacity: 0.08;
  pointer-events: none;
  z-index: 0;
  animation: statBgFloat 8s ease-in-out infinite alternate;
}

@keyframes statBgFloat {
  0% { transform: scale(1); }
  100% { transform: scale(1.08); }
}

.briyaniStats > div .statContent {
  position: relative;
  z-index: -1;
}

.briyaniStats > div:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 40px rgba(44, 18, 9, 0.14);
}

.briyaniStats > div:hover::before {
  animation-duration: 1.5s;
}

.briyaniStatIcon {
  font-size: 28px;
  display: block;
  margin-bottom: 8px;
  position: relative;
  z-index: 1;
}

.briyaniStatNumber {
  color: #6b0f0f;
  font-size: 36px;
  font-weight: 900;
  line-height: 1.1;
  position: relative;
  z-index: 1;
}

.briyaniStatLabel {
  margin: 8px 0 0;
  color: #8a5a44;
  font-weight: 600;
  font-size: 14px;
  position: relative;
  z-index: 1;
}

@media (max-width: 1024px) {
  .briyaniStats {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 1024px) {
  .briyaniProductGrid {
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
  }
}

@media (max-width: 900px) {
  .briyaniHero {
    height: 60vh;
  }

  .briyaniHeroShade {
    background: linear-gradient(180deg, rgba(20, 3, 3, 0.85), rgba(55, 7, 5, 0.7));
  }

  .briyaniFeatures {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 768px) {
  .briyaniProductGrid {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }
}

@media (max-width: 600px) {
  .briyaniHero {
    min-height: 320px;
  }

  .briyaniFeatures {
    grid-template-columns: 1fr;
    gap: 14px;
    padding: 24px 5%;
  }

  .briyaniFeatureCard {
    padding: 20px 16px;
    font-size: 15px;
  }

  .briyaniFeatureIcon {
    font-size: 28px;
    margin-bottom: 8px;
  }

  .briyaniStats {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 14px;
    padding: 8px 5% 36px;
  }

  .briyaniStats > div {
    padding: 20px 12px;
  }

  .briyaniStatNumber {
    font-size: 28px;
  }

  .briyaniStatLabel {
    font-size: 12px;
  }
}

@media (max-width: 480px) {
  .briyaniProductGrid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
}

@media (max-width: 400px) {
  .briyaniStats {
    grid-template-columns: 1fr;
  }
}
`;

export default function TajBiryani({ onAddToCart }) {
  const navigate = useNavigate();

  const items = [
    {
      name: "Chicken Dum Biryani",
      price: 599,
      unit: "KG",
      image: cardOne,
    },
    {
      name: "Mutton Dum Biryani",
      price: 799,
      unit: "KG",
      image: cardTwo,
    },
    {
      name: "Veg Dum Biryani",
      price: 449,
      unit: "KG",
      image: cardThree,
    },
    {
      name: "Family Pack Biryani",
      price: 999,
      unit: "2 KG",
      image: cardFour,
    },
    {
      name: "Chicken Full Biryani",
      price: 699,
      unit: "KG",
      image: cardFive,
    },
    {
      name: "Kolkata Mutton Biryani",
      price: 849,
      unit: "KG",
      image: cardSix,
    },
    {
      name: "Royal Special Biryani",
      price: 1099,
      unit: "2 KG",
      image: cardSeven,
    },
  ];

  const handleAddToCart = (item, index) => {
    if (typeof onAddToCart !== "function") return;

    onAddToCart({
      id: index + 1,
      name: item.name,
      price: item.price,
      quantity: 1,
      image: item.image,
      description: item.name,
    });
  };

  return (
    <div className="briyaniPage">
      <style>{biryaniStyles}</style>
      <section className="briyaniHero">
        <img
          src={heroBg}
          alt="Royal biryani handi"
          className="briyaniHeroImage briyaniHeroImageActive"
        />

        <div className="briyaniHeroShade" />

        <div className="briyaniTopBar">
          <button className="briyaniLoginBtn" onClick={() => navigate("/login")}>LOGIN</button>
        </div>
      </section>

      <section className="briyaniProductsSection">
        <h2 className="briyaniSectionTitle">Popular Biryanis</h2>
        <div className="briyaniProductGrid">
          {items.map((item, index) => (
            <div key={item.name} className="briyaniCard">
              <img src={item.image} alt={item.name} className="briyaniCardImg" />
              <div className="briyaniCardBody">
                <h3 className="briyaniCardTitle">{item.name}</h3>
                <div className="briyaniPrice">
                  Rs. {item.price} / {item.unit}
                </div>
                <button
                  type="button"
                  onClick={() => handleAddToCart(item, index)}
                  className="briyaniAddBtn"
                >
                  Add To Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="briyaniCatering">
        <h2 className="briyaniCateringTitle">TAJ BIRYANI CATERING SERVICES</h2>
        <p>Weddings, Corporate Events, Parties, Get-Togethers</p>
        <button className="briyaniSecondaryBtn" onClick={() => navigate("/menu")}>
          Enquire Now
        </button>
      </section>

      <section className="briyaniStats">
        <div style={{"--statBg": `url(${statBg1})`}}>
          <div className="statContent">
            <span className="briyaniStatIcon">🍛</span>
            <div className="briyaniStatNumber">50K+</div>
            <p className="briyaniStatLabel">Orders Delivered</p>
          </div>
        </div>
        <div style={{"--statBg": `url(${statBg2})`}}>
          <div className="statContent">
            <span className="briyaniStatIcon">😊</span>
            <div className="briyaniStatNumber">20K+</div>
            <p className="briyaniStatLabel">Happy Customers</p>
          </div>
        </div>
        <div style={{"--statBg": `url(${statBg3})`}}>
          <div className="statContent">
            <span className="briyaniStatIcon">🏪</span>
            <div className="briyaniStatNumber">12+</div>
            <p className="briyaniStatLabel">Branches</p>
          </div>
        </div>
        <div style={{"--statBg": `url(${statBg4})`}}>
          <div className="statContent">
            <span className="briyaniStatIcon">⭐</span>
            <div className="briyaniStatNumber">4.8</div>
            <p className="briyaniStatLabel">Average Rating</p>
          </div>
        </div>
      </section>
    </div>
  );
}
