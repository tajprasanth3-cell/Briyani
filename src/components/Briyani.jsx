import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import slideOne from "./Images/slide image.png";
import slideTwo from "./Images/two.jpg";
import slideThree from "./Images/veg special.jpg";
import slideFour from "./Images/family.jpg";
import cardOne from "./Images/one.jpg";
import cardTwo from "./Images/wow.jpg";
import cardThree from "./Images/veg special.jpg";
import cardFour from "./Images/family.jpg";
import cardFive from "./Images/chicken full.jpg";
import cardSix from "./Images/Kolkata_Special_Mutton_Biryani_Realistic.jpg";
import cardSeven from "./Images/_379e753b-2a12-49e6-bbf1-8d77389c7f91.jpg";

const biryaniStyles = `
.briyaniPage {
  min-height: 100vh;
  font-family: "Poppins", sans-serif;
  color: #2b140f;
}

.briyaniHero {
  position: relative;
  min-height: 650px;
    width: 100%;
  isolation: isolate;
}

.briyaniHeroImage {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transform: scale(1.03);
  transition: opacity 0.8s ease, transform 4.2s ease;
  z-index: -2;
}

.briyaniHeroImageActive {
  opacity: 1;
  transform: scale(1);
}

.briyaniHeroShade {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 70% 45%, rgba(255, 182, 74, 0.1), transparent 30%),
    linear-gradient(90deg, rgba(18, 2, 2, 0.95) 0%, rgba(61, 8, 4, 0.75) 40%, rgba(32, 6, 4, 0.25) 78%);
  z-index: -1;
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

.briyaniHeroContent {
  width: min(620px, 92%);
  padding: 42px 0 74px 6%;
  color: #fff8ed;
}

.briyaniKicker {
  margin: 0 0 4px 110px;
  color: #f5c75e;
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(32px, 4vw, 52px);
  font-style: italic;
  line-height: 1;
  text-shadow: 0 3px 10px rgba(0, 0, 0, 0.35);
}

.briyaniTitle {
  margin: 0;
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(48px, 7vw, 92px);
  line-height: 0.96;
  letter-spacing: 0;
  text-shadow: 0 5px 18px rgba(0, 0, 0, 0.55);
}

.briyaniTagline {
  margin: 12px 0 18px;
  color: #f7c66b;
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(18px, 2.4vw, 28px);
  font-weight: 700;
}

.briyaniOfferBox {
  display: flex;
  width: min(430px, 100%);
  min-height: 122px;
  border: 2px solid #e4a82d;
  background: rgba(69, 6, 8, 0.9);
  box-shadow: 0 0 0 4px rgba(228, 168, 45, 0.18), 0 14px 28px rgba(0, 0, 0, 0.28);
}

.briyaniOfferLabel {
  display: grid;
  place-items: center;
  width: 60px;
  background: linear-gradient(180deg, #f0bc46, #d99a25);
  color: #2a0605;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 23px;
  font-weight: 800;
  writing-mode: vertical-rl;
  transform: rotate(180deg);
}

.briyaniOfferBox div {
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  padding: 14px 24px;
}

.briyaniOfferBox strong {
  color: #f6c662;
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(40px, 5.5vw, 68px);
  line-height: 0.95;
}

.briyaniOfferBox small {
  margin-top: 12px;
  color: #fff;
  font-size: clamp(15px, 2vw, 22px);
  font-weight: 700;
}

.briyaniHeroActions {
  display: flex;
  align-items: center;
  gap: 24px;
  margin-top: 32px;
  flex-wrap: wrap;
}

.briyaniOrderBtn,
.briyaniVideoBtn,
.briyaniSecondaryBtn,
.briyaniAddBtn,
.briyaniArrowButton,
.briyaniDot {
  cursor: pointer;
  font-family: inherit;
}

.briyaniOrderBtn {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  border: 0;
  border-radius: 6px;
  background: linear-gradient(180deg, #f3bd4f, #d99523);
  color: #160604;
  padding: 15px 24px;
  font-size: 17px;
  font-weight: 800;
}

.briyaniOrderBtn span {
  font-size: 26px;
  line-height: 1;
}

.briyaniVideoBtn {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  border: 0;
  background: transparent;
  color: #fff;
  font-size: 15px;
  font-weight: 800;
}

.briyaniVideoBtn span {
  display: grid;
  place-items: center;
  width: 42px;
  height: 42px;
  border: 2px solid rgba(255, 255, 255, 0.65);
  border-radius: 50%;
  font-size: 15px;
}

.briyaniArrowButton {
  position: absolute;
  top: 50%;
  z-index: 2;
  width: 52px;
  height: 52px;
  border: 2px solid rgba(255, 255, 255, 0.35);
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.22);
  color: #fff;
  font-size: 50px;
  line-height: 0;
  transform: translateY(-50%);
}

.briyaniArrowLeft {
  left: 28px;
}

.briyaniArrowRight {
  right: 28px;
}

.briyaniDots {
  position: absolute;
  left: 50%;
  bottom: 18px;
  display: flex;
  gap: 16px;
  transform: translateX(-50%);
}

.briyaniDot {
  width: 10px;
  height: 10px;
  padding: 0;
  border: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.86);
}

.briyaniDotActive {
  background: #f6c662;
  box-shadow: 0 0 0 4px rgba(246, 198, 98, 0.18);
}

.briyaniFeatures {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 18px;
  padding: 34px 5%;
}

.briyaniFeatureCard {
  border: 1px solid rgba(107, 15, 15, 0.12);
  border-radius: 8px;
  background: #fff;
  color: #6b0f0f;
  padding: 22px;
  text-align: center;
  font-weight: 800;
  box-shadow: 0 12px 26px rgba(44, 18, 9, 0.08);
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
}

.briyaniCardImg {
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  display: block;
}

.briyaniCardBody {
  padding: 18px;
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

.briyaniAddBtn {
  width: 100%;
  margin-top: 15px;
  border: 0;
  border-radius: 6px;
  background: #6b0f0f;
  color: #fff;
  padding: 12px;
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
  gap: 18px;
  padding: 12px 5% 42px;
  text-align: center;
}

.briyaniStats > div {
  border-radius: 8px;
  background: #fff;
  padding: 22px;
  box-shadow: 0 12px 26px rgba(44, 18, 9, 0.08);
}

.briyaniStatNumber {
  color: #6b0f0f;
  font-size: 38px;
  font-weight: 900;
}

.briyaniStats p {
  margin: 8px 0 0;
}

@media (max-width: 900px) {
  .briyaniHero {
    min-height: 560px;
  }

  .briyaniHeroShade {
    background: linear-gradient(180deg, rgba(20, 3, 3, 0.92), rgba(55, 7, 5, 0.72));
  }

  .briyaniHeroContent {
    padding: 44px 24px 82px;
  }

  .briyaniKicker {
    margin-left: 0;
  }

  .briyaniArrowButton {
    width: 42px;
    height: 42px;
    font-size: 38px;
  }

  .briyaniArrowLeft {
    left: 12px;
  }

  .briyaniArrowRight {
    right: 12px;
  }

  .briyaniFeatures,
  .briyaniStats {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 560px) {
  .briyaniHero {
    min-height: 590px;
  }

  .briyaniHeroContent {
    width: 100%;
    padding: 36px 18px 78px;
  }

  .briyaniOfferBox {
    min-height: 104px;
  }

  .briyaniOfferLabel {
    width: 48px;
    font-size: 18px;
  }

  .briyaniOfferBox div {
    padding: 12px 16px;
  }

  .briyaniHeroActions {
    gap: 16px;
  }

  .briyaniFeatures,
  .briyaniStats {
    grid-template-columns: 1fr;
  }
}
`;

export default function TajBiryani({ onAddToCart }) {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = useMemo(
    () => [
      {
        src: slideOne,
        alt: "Royal chicken biryani handi",
      },
      {
        src: slideTwo,
        alt: "Spicy dum biryani platter",
      },
      {
        src: slideThree,
        alt: "Premium veg biryani bowl",
      },
      {
        src: slideFour,
        alt: "Family biryani feast",
      },
    ],
    []
  );

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

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4200);

    return () => clearInterval(timer);
  }, [slides.length]);

  const moveSlide = (direction) => {
    setCurrentSlide((prev) => (prev + direction + slides.length) % slides.length);
  };

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
        {slides.map((slide, index) => (
          <img
            key={slide.alt}
            src={slide.src}
            alt={slide.alt}
            className={`briyaniHeroImage ${
              index === currentSlide ? "briyaniHeroImageActive" : ""
            }`}
          />
        ))}

        <div className="briyaniHeroShade" />

        <div className="briyaniTopBar">
          <button className="briyaniLoginBtn" onClick={() => navigate("/login")}>LOGIN</button>
        </div>

        <button
          type="button"
          className="briyaniArrowButton briyaniArrowLeft"
          aria-label="Previous biryani offer"
          onClick={() => moveSlide(-1)}
        >
          &lt;
        </button>
        <button
          type="button"
          className="briyaniArrowButton briyaniArrowRight"
          aria-label="Next biryani offer"
          onClick={() => moveSlide(1)}
        >
          &gt;
        </button>

      

        <div className="briyaniDots">
          {slides.map((slide, index) => (
            <button
              key={slide.alt}
              type="button"
              aria-label={`Show offer ${index + 1}`}
              className={`briyaniDot ${index === currentSlide ? "briyaniDotActive" : ""}`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </section>

      <div className="briyaniFeatures">
        <div className="briyaniFeatureCard">Expert Chefs</div>
        <div className="briyaniFeatureCard">Premium Spices</div>
        <div className="briyaniFeatureCard">Best Quality</div>
      </div>

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
        <div>
          <div className="briyaniStatNumber">50K+</div>
          <p>Orders Delivered</p>
        </div>
        <div>
          <div className="briyaniStatNumber">20K+</div>
          <p>Happy Customers</p>
        </div>
        <div>
          <div className="briyaniStatNumber">12+</div>
          <p>Branches</p>
        </div>
        <div>
          <div className="briyaniStatNumber">4.8</div>
          <p>Average Rating</p>
        </div>
      </section>
    </div>
  );
}
