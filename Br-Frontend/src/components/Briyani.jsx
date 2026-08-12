import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Utensils, Smile, Store, Star } from "lucide-react";
import {
  FaFire,
  FaPercent,
  FaGift,
  FaTag,
} from "react-icons/fa";

import bgImage from "./Images/eraser.png";
import cardOne from "./Images/one.jpg";
import cardTwo from "./Images/wow.jpg";
import cardThree from "./Images/veg special.jpg";
import cardFour from "./Images/family.jpg";
import cardFive from "./Images/chicken full.jpg";
import cardSix from "./Images/kolkata.jpg";
import cardSeven from "./Images/ciiii.jpg";
import cardEight from "./Images/chicken dum.jpg";
import statBg1 from "./Images/ton.jpg";
import statBg2 from "./Images/ton.jpg";
import statBg3 from "./Images/ton.jpg";
import statBg4 from "./Images/ton.jpg";

const biryaniStyles = `
*, *::before, *::after { box-sizing: border-box; }

.briyaniPage {
  min-height: 100vh;
  font-family: "Poppins", sans-serif;
  color: #2b140f;
  overflow-x: hidden;
}

@keyframes moveSmoke {
  0% { background-position: 0% 50%; background-size: 110%; }
  50% { background-position: 100% 50%; background-size: 115%; }
  100% { background-position: 0% 50%; background-size: 110%; }
}

/* ── HERO ── */
.briyaniHero {
  position: relative;
  height: 89vh;
  min-height: 500px;
  width: 100%;
  isolation: isolate;
  overflow: hidden;
  background: #1a0404;
  display: flex;
  align-items: center;
  animation: moveSmoke 25s ease-in-out infinite;
  background-size: 110%;
  background-position: center;
}

.briyaniHeroContent {
  position: relative;
  z-index: 5;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 40%;
  min-width: 280px;
  max-width: 500px;
  margin-right: auto;
  padding: 20px 40px;
  gap: 18px;
}

.briyaniHeroBtnRow {
  display: flex;
  gap: 12px;
  width: 100%;
  justify-content: center;
  flex-wrap: wrap;
}

.briyaniHeroBtnRow button {
  flex: 0 1 auto;
  white-space: nowrap;
}

.briyaniOffersRow {
  display: flex;
  gap: 14px;
  justify-content: center;
  flex-wrap: wrap;
}

.briyaniOfferBox {
  width: 80px;
  height: 80px;
  border-radius: 14px;
  flex-shrink: 0;
  cursor: pointer;
  transition: transform 0.2s;
}
.briyaniOfferBox:hover { transform: scale(1.08); }

.briyaniOfferIcon {
  color: #D4AF37;
  font-size: 20px;
  margin-bottom: 4px;
}

/* ── FEATURES ── */
.briyaniFeatures {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
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
  top: 0; left: 0; right: 0;
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

/* ── PRODUCTS ── */
.briyaniProductsSection {
  padding: 36px 5% 58px;
}

.briyaniSectionTitle {
  margin: 0 0 30px;
  color: #6b0f0f;
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(26px, 5vw, 46px);
  text-align: center;
}

.briyaniProductGrid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

@keyframes cardSlideUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

.briyaniCard {
  overflow: hidden;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 14px 32px rgba(44, 18, 9, 0.12);
  display: flex;
  flex-direction: column;
  animation: cardSlideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.briyaniCard:hover {
  transform: translateY(-8px);
  box-shadow: 0 24px 48px rgba(44, 18, 9, 0.2);
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
  margin-top: auto;
  border: 0;
  border-radius: 8px;
  background: #6b0f0f;
  color: #fff;
  padding: 12px;
  font-weight: 800;
  cursor: pointer;
  font-family: inherit;
}

.briyaniCardTitle {
  min-height: 44px;
  margin: 0 0 8px;
  color: #5f0e0b;
  font-size: 17px;
  line-height: 1.3;
}

.briyaniPrice {
  color: #b27414;
  font-size: 17px;
  font-weight: 800;
}

/* ── CATERING ── */
.briyaniCatering {
  margin: 26px 4% 46px;
  border-radius: 12px;
  padding: 70px 20px;
  background:
    linear-gradient(rgba(68, 8, 8, 0.88), rgba(68, 8, 8, 0.88)),
    url("${cardFour}") center/cover;
  color: #fff;
  text-align: center;
}

.briyaniCateringTitle {
  margin: 0 0 12px;
  color: #fff;
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(22px, 5vw, 42px);
}

.briyaniSecondaryBtn {
  margin-top: 16px;
  border: 2px solid #f7c66b;
  border-radius: 8px;
  background: #f7c66b;
  color: #2a0705;
  padding: 13px 28px;
  font-weight: 800;
  cursor: pointer;
  font-family: inherit;
}

/* ── STATS ── */
.briyaniStats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  padding: 12px 4% 50px;
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
  position: absolute; inset: 0;
  background: linear-gradient(90deg, transparent, rgba(247,198,107,0.08), transparent);
  background-size: 200% 100%;
  animation: statShine 3s ease-in-out infinite;
  pointer-events: none; z-index: 0;
}
.briyaniStats > div::after {
  content: "";
  position: absolute; inset: 0;
  background: var(--statBg) center/cover no-repeat !important;
  opacity: 0.08;
  pointer-events: none; z-index: 0;
}
.briyaniStats > div:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 40px rgba(44, 18, 9, 0.14);
}

.briyaniStatContent {
  position: relative; z-index: 1;
}

.briyaniStatIcon {
  font-size: 28px;
  display: block;
  margin-bottom: 8px;
  position: relative; z-index: 1;
}

.briyaniStatNumber {
  color: #6b0f0f;
  font-size: 36px;
  font-weight: 900;
  line-height: 1.1;
  position: relative; z-index: 1;
}

.briyaniStatLabel {
  margin: 8px 0 0;
  color: #8a5a44;
  font-weight: 600;
  font-size: 14px;
  position: relative; z-index: 1;
}

/* ── MODALS ── */
.briyaniModalOverlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(0,0,0,0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.briyaniNotifOverlay {
  position: fixed;
  inset: 0;
  z-index: 99999;
  background: rgba(0,0,0,0.55);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  animation: notifFadeIn 0.3s ease;
}

.briyaniModalCard {
  background: #fff;
  border-radius: 20px;
  padding: 32px;
  max-width: 420px;
  width: 100%;
  position: relative;
  box-shadow: 0 24px 64px rgba(0,0,0,0.3);
  max-height: 85vh;
  overflow-y: auto;
}

.briyaniNotifCard {
  background: linear-gradient(145deg, rgba(255,255,255,0.95), rgba(255,255,255,0.85));
  border-radius: 24px;
  padding: 48px 40px 40px;
  max-width: 400px;
  width: 100%;
  text-align: center;
  box-shadow: 0 32px 80px rgba(0,0,0,0.25), 0 0 0 1px rgba(255,255,255,0.2) inset;
  animation: notifPopIn 0.4s cubic-bezier(0.34,1.56,0.64,1);
  position: relative;
  overflow: hidden;
}

.briyaniModalClose {
  position: absolute;
  top: 12px; right: 16px;
  background: none; border: none;
  font-size: 24px; cursor: pointer;
  color: #999; line-height: 1;
}

/* ── BOOK TABLE FORM ── */
.briyaniFormRow {
  display: flex;
  gap: 10px;
}

.briyaniFormInput {
  padding: 12px 14px;
  border-radius: 12px;
  border: 1px solid #e0d5c7;
  font-size: 14px;
  color: #333;
  outline: none;
  width: 100%;
  box-sizing: border-box;
  font-family: inherit;
}

/* ── KEYFRAMES ── */
@keyframes statShine {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
@keyframes notifFadeIn { from { opacity: 0; } to { opacity: 1; } }
@keyframes notifPopIn { from { opacity: 0; transform: scale(0.8) translateY(20px); } to { opacity: 1; transform: scale(1) translateY(0); } }
@keyframes notifCheck1 { from { stroke-dasharray: 100; stroke-dashoffset: 100; } to { stroke-dashoffset: 0; } }
@keyframes notifCheck2 { from { stroke-dasharray: 100; stroke-dashoffset: 100; } to { stroke-dashoffset: 0; } }

/* ═══════════════════════════════════════
   RESPONSIVE BREAKPOINTS
   ═══════════════════════════════════════ */

@media (max-width: 1024px) {
  .briyaniStats { grid-template-columns: repeat(2, 1fr); gap: 16px; }
  .briyaniProductGrid { grid-template-columns: repeat(3, 1fr); gap: 16px; }
  .briyaniHeroContent { width: 60%; }
  .briyaniFeatures { grid-template-columns: repeat(2, 1fr); gap: 14px; padding: 32px 4%; }
}

@media (max-width: 768px) {
  .briyaniHero { height: auto; min-height: auto; padding: 80px 0 40px; }
  .briyaniHeroContent { width: 90%; max-width: none; min-width: 0; }
  .briyaniProductsSection { padding: 24px 4% 40px; }
  .briyaniCatering { padding: 50px 20px; margin: 20px 3% 36px; }
  .briyaniStats { padding: 8px 4% 36px; gap: 12px; }
  .briyaniStats > div { padding: 22px 12px; }
  .briyaniStatNumber { font-size: 28px; }
  .briyaniStatIcon { font-size: 24px; }
  .briyaniStatLabel { font-size: 12px; }
  .briyaniProductGrid { grid-template-columns: repeat(2, 1fr); gap: 14px; }
  .briyaniCardTitle { font-size: 15px; min-height: auto; }
  .briyaniCardBody { padding: 14px; }
  .briyaniPrice { font-size: 15px; }
  .briyaniAddBtn { padding: 10px; font-size: 13px; }
  .briyaniFormRow { flex-direction: column; }
}

@media (max-width: 480px) {
  .briyaniHero { padding: 60px 0 24px; }
  .briyaniHeroContent { width: 100%; padding: 12px; gap: 12px; }
  .briyaniFeatures { grid-template-columns: 1fr; gap: 10px; padding: 20px 4%; }
  .briyaniFeatureCard { padding: 16px 14px; font-size: 14px; }
  .briyaniFeatureIcon { font-size: 26px; margin-bottom: 8px; }
  .briyaniProductsSection { padding: 14px 3% 24px; }
  .briyaniSectionTitle { font-size: 22px; margin-bottom: 16px; }
  .briyaniCatering { padding: 32px 14px; margin: 12px 3% 20px; border-radius: 10px; }
  .briyaniCateringTitle { font-size: 20px; }
  .briyaniStats { grid-template-columns: repeat(2, 1fr); gap: 10px; padding: 6px 3% 28px; }
  .briyaniStats > div { padding: 18px 10px; border-radius: 12px; }
  .briyaniStatNumber { font-size: 24px; }
  .briyaniStatLabel { font-size: 11px; }
  .briyaniOfferBox { width: 58px; height: 58px; border-radius: 8px; }
  .briyaniOfferIcon { font-size: 16px; }
  .briyaniOffersRow { gap: 6px; }
  .briyaniProductGrid { grid-template-columns: 1fr; gap: 14px; max-width: 360px; margin: 0 auto; }
  .briyaniCardTitle { font-size: 14px; }
  .briyaniPrice { font-size: 14px; }
  .briyaniAddBtn { padding: 9px; font-size: 12px; }
  .briyaniHeroBtnRow { flex-direction: column; align-items: center; }
  .briyaniHeroBtnRow button { display: flex; justify-content: center; align-items: center; text-align: center; width: 60%; padding: 10px 16px; margin: 0 auto; }
  .briyaniModalCard { padding: 22px 18px; border-radius: 16px; }
  .briyaniNotifCard { padding: 32px 20px 28px; border-radius: 16px; }
}

@media (max-width: 380px) {
  .briyaniStats { grid-template-columns: 1fr; max-width: 220px; margin: 0 auto; }
  .briyaniOfferBox { width: 52px; height: 52px; }
  .briyaniOfferIcon { font-size: 14px; }
  .briyaniFeatureCard { padding: 14px 12px; font-size: 13px; }
}
`;

export default function TajBiryani({ onAddToCart, onApplyCoupon }) {
  const navigate = useNavigate();
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [showBookTable, setShowBookTable] = useState(false);
  const [notification, setNotification] = useState(null);

  const offers = {
    first: {
      title: "Rs 175 OFF",
      subtitle: "on FIRST ORDER",
      minOrder: "Min. order amount: Rs 699",
      desc: "Get Rs 175 off on your first order. Valid for new customers only.",
      color: "#d4af37",
      code: "1750",
    },
    takeaway: {
      title: "FLAT 25% OFF",
      subtitle: "on Take Away Orders",
      desc: "No minimum order amount. Now get FLAT 25% OFF on all Take Away Orders for website and APP.",
      color: "#22c55e",
      code: "2500",
      terms: [
        "This Coupon code can be applied only once in 2 hours",
        "Offer Valid on BBK APP and website only",
        "This offer cannot be clubbed with any other offer",
        "Offer not valid on combos or already discounted offer",
        "Offer applicable on min. order amount of Rs 199 & above",
        "Max discount Rs 3000 per order",
      ],
    },
  };

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
    {
      name: "Prawn Biryani",
      price: 749,
      unit: "KG",
      image: cardEight,
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
      <section
        className="briyaniHero"
        style={{
          backgroundImage: `
            linear-gradient(
              90deg,
              rgba(0,0,0,0.85) 0%,
              rgba(0,0,0,0.7) 30%,
              rgba(0,0,0,0.3) 60%,
              rgba(0,0,0,0.1) 100%
            ),
            url(${bgImage})
          `,
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="briyaniHeroContent">
          <div
            style={{
              padding: "6px 18px",
              borderRadius: "50px",
              border: "1px solid rgba(212,175,55,.4)",
              color: "#D4AF37",
              fontSize: "11px",
              letterSpacing: "2px",
              textTransform: "uppercase",
              textAlign: "center",
            }}
          >
            Royal Taste Experience
          </div>

          <h1
            style={{
              fontSize: "clamp(1.6rem,3vw,2.6rem)",
              lineHeight: "1",
              fontWeight: "800",
              color: "#fff",
              textShadow: "0 0 25px rgba(212,175,55,.2)",
              margin: 0,
              textAlign: "center",
            }}
          >
            A TASTY DISH{" "}
            <span
              style={{
                background: "linear-gradient(180deg,#FFF8D6,#FFD700,#D4AF37)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontStyle: "italic",
              }}
            >
              Delights
            </span>
          </h1>

          <h3
            style={{
              color: "#D4AF37",
              fontSize: "clamp(0.75rem,1.2vw,1rem)",
              fontWeight: "400",
              margin: 0,
            }}
          >
            The Senses With Its Rich Flavors
          </h3>

          <div className="briyaniHeroBtnRow">
            <button
              onClick={() => navigate("/menu")}
              style={{
                padding: "7px 22px",
                border: "none",
                borderRadius: "50px",
                background: "linear-gradient(135deg,#FFD700,#D4AF37)",
                color: "#000",
                fontWeight: "700",
                fontSize: "11px",
                cursor: "pointer",
                boxShadow: "0 5px 15px rgba(212,175,55,.3)",
              }}
            >
              Explore Menu
            </button>

            <button
              onClick={() => setShowBookTable(true)}
              style={{
                padding: "7px 22px",
                borderRadius: "50px",
                background: "transparent",
                border: "1px solid rgba(212,175,55,.5)",
                color: "#D4AF37",
                fontWeight: "600",
                fontSize: "11px",
                cursor: "pointer",
              }}
            >
              Book Table
            </button>
          </div>

          <div className="briyaniOffersRow">
            {[
              { icon: <FaPercent />, title: "First\nOrder" },
              { icon: <FaFire />, title: "Take\nAway" },
              { icon: <FaGift />, title: "Gift Box" },
              { icon: <FaTag />, title: "ROYAL" },
            ].map((item, index) => (
              <div
                key={index}
                className="briyaniOfferBox"
                onClick={() => {
                  if (index === 0) setSelectedOffer("first");
                  else if (index === 1) setSelectedOffer("takeaway");
                  else if (index === 3) {
                    if (onApplyCoupon) onApplyCoupon("ROYAL");
                    navigate("/cart");
                  } else {
                    navigate("/menu");
                  }
                }}
                style={{
                  border: "1px solid rgba(212,175,55,.25)",
                  background: "linear-gradient(135deg, rgba(212,175,55,.12), rgba(255,255,255,.03))",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  backdropFilter: "blur(10px)",
                }}
              >
                <div className="briyaniOfferIcon">
                  {item.icon}
                </div>
                <span
                  style={{
                    color: "#fff",
                    fontSize: "9px",
                    textAlign: "center",
                    padding: "0 6px",
                    whiteSpace: "pre-line",
                  }}
                >
                  {item.title}
                </span>
              </div>
            ))}
          </div>
        </div>

      </section>

      <section className="briyaniProductsSection">
        <h2 className="briyaniSectionTitle">Popular Biryanis</h2>
        <div className="briyaniProductGrid">
          {items.map((item, index) => (
            <div key={item.name} className="briyaniCard" style={{ animationDelay: `${index * 0.1}s`, opacity: 0 }}>
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
        <h2 className="briyaniCateringTitle">TAJ BRIYANI CATERING SERVICES</h2>
        <p>Weddings, Corporate Events, Parties, Get-Togethers</p>
        <button className="briyaniSecondaryBtn" onClick={() => navigate("/menu")}>
          Enquire Now
        </button>
      </section>

      <section className="briyaniStats">
        <div style={{ "--statBg": `url(${statBg1})` }}>
          <div className="briyaniStatContent">
            <Utensils size={28} className="briyaniStatIcon" style={{ margin: "0 auto 8px" }} />
            <div className="briyaniStatNumber">50K+</div>
            <p className="briyaniStatLabel">Orders Delivered</p>
          </div>
        </div>
        <div style={{ "--statBg": `url(${statBg2})` }}>
          <div className="briyaniStatContent">
            <Smile size={28} className="briyaniStatIcon" style={{ margin: "0 auto 8px" }} />
            <div className="briyaniStatNumber">20K+</div>
            <p className="briyaniStatLabel">Happy Customers</p>
          </div>
        </div>
        <div style={{ "--statBg": `url(${statBg3})` }}>
          <div className="briyaniStatContent">
            <Store size={28} className="briyaniStatIcon" style={{ margin: "0 auto 8px" }} />
            <div className="briyaniStatNumber">12+</div>
            <p className="briyaniStatLabel">Branches</p>
          </div>
        </div>
        <div style={{ "--statBg": `url(${statBg4})` }}>
          <div className="briyaniStatContent">
            <Star size={28} className="briyaniStatIcon" style={{ margin: "0 auto 8px", fill: "#f7c66b" }} />
            <div className="briyaniStatNumber">4.8</div>
            <p className="briyaniStatLabel">Average Rating</p>
          </div>
        </div>
      </section>

      {selectedOffer && (
        <div
          className="briyaniModalOverlay"
          onClick={() => setSelectedOffer(null)}
        >
          <div
            className="briyaniModalCard"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="briyaniModalClose"
              onClick={() => setSelectedOffer(null)}
            >
              ×
            </button>

            {selectedOffer === "first" ? (
              <>
                <div style={{ textAlign: "center", marginBottom: "16px" }}>
                  <div style={{ fontSize: "32px", fontWeight: "900", color: "#d4af37", fontFamily: "Georgia, serif" }}>Rs 175 OFF</div>
                  <div style={{ fontSize: "18px", fontWeight: "700", color: "#6b0f0f", marginTop: "4px" }}>on FIRST ORDER</div>
                </div>
                <div style={{ background: "#fef9e7", borderRadius: "12px", padding: "16px", marginBottom: "12px" }}>
                  <p style={{ margin: 0, fontSize: "14px", color: "#333", lineHeight: 1.6 }}>Get Rs 175 off on your first order. Valid for new customers only.</p>
                </div>
                <div style={{ background: "#f5f0eb", borderRadius: "12px", padding: "16px", marginBottom: "12px" }}>
                  <p style={{ margin: 0, fontSize: "14px", color: "#6b0f0f", fontWeight: "700" }}>Min. order amount: Rs 699</p>
                </div>
                <div style={{ textAlign: "center", padding: "12px", borderRadius: "12px", border: "2px dashed #d4af37", background: "#fffdf5" }}>
                  <p style={{ margin: 0, fontSize: "11px", color: "#888", fontWeight: "600" }}>Use code at checkout</p>
                  <p style={{ margin: "4px 0 0", fontSize: "24px", fontWeight: "900", color: "#d4af37", letterSpacing: "4px", fontFamily: "monospace" }}>{offers.first.code}</p>
                </div>
              </>
            ) : (
              <>
                <div style={{ textAlign: "center", marginBottom: "16px" }}>
                  <div style={{ fontSize: "28px", fontWeight: "900", color: "#22c55e", fontFamily: "Georgia, serif" }}>FLAT 25% OFF</div>
                  <div style={{ fontSize: "16px", fontWeight: "700", color: "#6b0f0f", marginTop: "4px" }}>on Take Away Orders</div>
                </div>
                <div style={{ background: "#f0fdf4", borderRadius: "12px", padding: "16px", marginBottom: "12px" }}>
                  <p style={{ margin: 0, fontSize: "13px", color: "#333", lineHeight: 1.6 }}>No minimum order amount. Now get FLAT 25% OFF on all Take Away Orders for website and APP.</p>
                </div>
                <div style={{ textAlign: "center", padding: "12px", borderRadius: "12px", border: "2px dashed #22c55e", background: "#f0fdf4", marginBottom: "12px" }}>
                  <p style={{ margin: 0, fontSize: "11px", color: "#888", fontWeight: "600" }}>Use code at checkout</p>
                  <p style={{ margin: "4px 0 0", fontSize: "24px", fontWeight: "900", color: "#22c55e", letterSpacing: "4px", fontFamily: "monospace" }}>{offers.takeaway.code}</p>
                </div>
                <div>
                  <p style={{ fontSize: "12px", fontWeight: "800", color: "#6b0f0f", textTransform: "uppercase", letterSpacing: "1px", margin: "0 0 10px 0" }}>Terms & Conditions</p>
                  <ol style={{ margin: 0, paddingLeft: "18px", fontSize: "12px", color: "#666", lineHeight: 1.8 }}>
                    {offers.takeaway.terms.map((t, i) => (
                      <li key={i}>{t}</li>
                    ))}
                  </ol>
                </div>
              </>
            )}
          </div>
        </div>
      )}
      {showBookTable && (
        <div
          className="briyaniModalOverlay"
          onClick={() => setShowBookTable(false)}
        >
          <div
            className="briyaniModalCard"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="briyaniModalClose"
              onClick={() => setShowBookTable(false)}
            >
              ×
            </button>
            <div style={{ textAlign: "center", marginBottom: "24px" }}>
              <div style={{ fontSize: "24px", fontWeight: "900", color: "#6b0f0f", fontFamily: "Georgia, serif" }}>Book a Table</div>
              <p style={{ fontSize: "13px", color: "#888", margin: "4px 0 0" }}>Reserve your royal dining experience</p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <input placeholder="Full Name" className="briyaniFormInput" />
              <input placeholder="Phone Number" type="tel" className="briyaniFormInput" />
              <div className="briyaniFormRow">
                <input type="date" className="briyaniFormInput" />
                <input type="time" className="briyaniFormInput" />
              </div>
              <select className="briyaniFormInput">
                <option value="">Number of Guests</option>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                  <option key={n} value={n}>{n} {n === 1 ? "Guest" : "Guests"}</option>
                ))}
              </select>
              <textarea placeholder="Special requests (optional)" rows={3} className="briyaniFormInput" style={{ resize: "none" }} />
              <button
                onClick={() => {
                  setShowBookTable(false);
                  setNotification({ type: "success", message: "Table booked successfully! We'll contact you shortly." });
                }}
                style={{
                  width: "100%",
                  padding: "14px",
                  borderRadius: "12px",
                  border: "none",
                  background: "linear-gradient(135deg, #6b0f0f, #8b1a1a)",
                  color: "#f7c66b",
                  fontWeight: "800",
                  fontSize: "15px",
                  cursor: "pointer",
                  marginTop: "4px",
                }}
              >
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
      )}

      {notification && (
        <div
          className="briyaniNotifOverlay"
          onClick={() => setNotification(null)}
        >
          <div
            className="briyaniNotifCard"
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "4px", background: "linear-gradient(90deg, #22c55e, #16a34a, #22c55e)" }} />

            <div style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #dcfce7, #bbf7d0)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 20px",
              boxShadow: "0 8px 24px rgba(34,197,94,0.2)",
            }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" style={{ animation: "notifCheck1 0.4s 0.3s ease both" }} />
                <polyline points="22 4 12 14.01 9 11.01" style={{ animation: "notifCheck2 0.3s 0.6s ease both" }} />
              </svg>
            </div>

            <h3 style={{
              fontSize: "22px",
              fontWeight: "800",
              color: "#16a34a",
              margin: "0 0 8px",
              fontFamily: "Georgia, serif",
              letterSpacing: "0.5px",
            }}>
              Booked!
            </h3>
            <p style={{ fontSize: "14px", color: "#666", margin: "0 0 28px", lineHeight: 1.7, fontWeight: 500 }}>
              {notification.message}
            </p>
            <button
              onClick={() => setNotification(null)}
              style={{
                padding: "14px 40px",
                borderRadius: "14px",
                border: "none",
                background: "linear-gradient(135deg, #6b0f0f, #8b1a1a)",
                color: "#f7c66b",
                fontWeight: "800",
                fontSize: "14px",
                cursor: "pointer",
                letterSpacing: "0.5px",
                boxShadow: "0 8px 24px rgba(107,15,15,0.3)",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = "0 12px 32px rgba(107,15,15,0.4)"; }}
              onMouseLeave={(e) => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = "0 8px 24px rgba(107,15,15,0.3)"; }}
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
