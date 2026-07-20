import { useState, useMemo } from "react";
import chickenImg from "./Images/chicken dum.jpg";
import muttonImg from "./Images/motton bry (1).jpg";
import vegImg from "./Images/veg.jpg";
import familyImg from "./Images/family.jpg";
import specialImg from "./Images/wow.jpg";
import royalImg from "./Images/kolkata.jpg";
import vegspecial from "./Images/two.jpg";
import feastImg from "./Images/gril briyani (1).jpg";
import feastImg3 from "./Images/gril briyani (2).jpg";
import feastImg5 from "./Images/chicken dum.jpg";
import ton from "./Images/ton.jpg";
import feastImg6 from "./Images/veg11.jpg";
import logoImg from "./Images/logo (1).jpg";

const MENU_ITEMS = [
  {
    id: 1,
    name: "Chicken Dum Biryani",
    rating: 4.8,
    reviews: "1.2K",
    price: 599,
    qty: 1,
    category: "Chicken",
    image: chickenImg,
    desc: "Basmati rice cooked with tender chicken.",
  },
  {
    id: 2,
    name: "Mutton Dum Biryani",
    rating: 4.9,
    reviews: "856",
    price: 799,
    qty: 1,
    category: "Mutton",
    image: muttonImg,
    desc: "Perfect blend of mutton and basmati rice.",
  },
  {
    id: 3,
    name: "Veg Dum Biryani",
    rating: 4.7,
    reviews: "623",
    price: 449,
    qty: 1,
    category: "Veg",
    image: vegImg,
    desc: "Flavorful mix of vegetables and spices.",
  },
  {
    id: 4,
    name: "Family Pack Biryani",
    rating: 5.0,
    reviews: "340",
    price: 999,
    qty: 2,
    category: "Family",
    image: familyImg,
    desc: "Best for gatherings & parties.",
  },
  {
    id: 5,
    name: "Hyderabadi Special Biryani",
    rating: 4.9,
    reviews: "2.1K",
    price: 849,
    qty: 1,
    category: "Special",
    image: specialImg,
    desc: "Saffron-rich biryani made with premium spices.",
  },
  {
    id: 6,
    name: "Royal Biryani Feast",
    rating: 5.0,
    reviews: "1.7K",
    price: 1099,
    qty: 2,
    category: "Special",
    image: royalImg,
    desc: "A festive royal platter for family celebrations.",
  },
  {
    id: 7,
    name: "Chef's Signature Biryani",
    rating: 4.8,
    reviews: "930",
    price: 679,
    qty: 1,
    category: "Chicken",
    image: feastImg,
    desc: "Rich, slow-cooked biryani with chef's special masala.",
  },
  {
    id: 8,
    name: "Vegetable Dum Biryani (In Oven)",
    rating: 4.8,
    reviews: "930",
    price: 679,
    qty: 1,
    category: "Veg",
    image: vegspecial,
    desc: "Rich, slow-cooked biryani with chef's special masala.",
  },
  {
    id: 9,
    name: "USA Chicken Biryani",
    rating: 4.8,
    reviews: "930",
    price: 679,
    qty: 1,
    category: "Chicken",
    image: feastImg3,
    desc: "Rich, slow-cooked biryani with chef's special masala.",
  },
  {
    id: 10,
    name: " Chicken Tandoori Masala vs Garam Masala: Are They The Same...",
    rating: 4.8,
    reviews: "930",
    price: 679,
    qty: 1,
    category: "Chicken",
    image: ton,
    desc: "Rich, slow-cooked biryani with chef's special masala.",
  },
  {
    id: 11,
    name: "Chicken Dum Biryani",
    rating: 4.8,
    reviews: "930",
    price: 679,
    qty: 1,
    category: "Chicken",
    image: feastImg5,
    desc: "Rich, slow-cooked biryani with chef's special masala.",
  },
  {
    id: 12,
    name: "Mutton Biryani",
    rating: 4.8,
    reviews: "930",
    price: 679,
    qty: 1,
    category: "Mutton",
    image: feastImg6,
    desc: "Rich, slow-cooked biryani with chef's special masala.",
  },
];

const SECTIONS = [
  {
    title: "Popular Biryani",
    ids: [1, 2, 5, 6],
  },
  {
    title: "Chicken Biryani",
    ids: [7, 9, 10, 11],
  },
  {
    title: "Mutton Biryani",
    ids: [2, 12],
  },
  {
    title: "Veg & Special",
    ids: [3, 8, 4],
  },
];

const menuStyles = `
.menuContainer {
  padding: 20px 2%;
}

.menuBrandSection {
  display: flex;
  align-items: center;
  gap: 18px;
  margin-bottom: 24px;
  padding: 20px 24px;
  background: linear-gradient(135deg, #6b0f0f, #8b1a1a);
  border-radius: 20px;
  color: #fff;
}

.menuLogoImg {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #f7c66b;
  flex-shrink: 0;
}

.menuBrandTitle {
  margin: 0;
  font-size: 26px;
  font-weight: 800;
  letter-spacing: 1px;
  color: #f7c66b;
}

.menuBrandSub {
  margin: 2px 0 0;
  font-size: 13px;
  opacity: 0.85;
  color: #fff;
}

.menuSearchFilterSection {
  margin-bottom: 10px;
  display: flex;
  gap:13px;
  flex-wrap: wrap;
  align-items: center;
}

.menuSearchInputWrapper,
.menuLocationSelectWrapper {
  box-sizing: border-box;
  flex: 1;
  min-width: 240px;
  background: #fff;
  border-radius: 18px;
  padding: 16px;
  box-shadow: 0 12px 25px rgba(0, 0, 0, 0.06);
}

.menuLocationSelectWrapper {
  min-width: 180px;
}

.menuSearchInput,
.menuLocationSelect {
  width: 90%;
  padding: 14px 18px;
  border-radius: 14px;
  border: 1px solid #ddd;
  outline: none;
}

.menuLocationSelect {
  width: 100%;
  background: #fff;
  cursor: pointer;
}

.menuSection {
  margin-bottom: 40px;
}

.menuSectionHeader {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 20px;
}

.menuSectionTitle {
  margin: 0;
  color: #6b0f0f;
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(24px, 3vw, 32px);
}

.menuSectionLine {
  flex: 1;
  height: 2px;
  background: linear-gradient(90deg, #6b0f0f, transparent);
  border: none;
}

.menuItemCard {
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 14px 32px rgba(44, 18, 9, 0.12);
  height: 100%;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  width: 100%;
}

.menuItemCard:hover {
  transform: translateY(-3px);
  box-shadow: 0 18px 40px rgba(44, 18, 9, 0.16);
}

.menuItemImage {
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  display: block;
  transition: transform 0.4s ease;
}

.menuItemCard:hover .menuItemImage {
  transform: scale(1.05);
}

.menuItemCard {
  overflow: hidden;
}

.menuItemBody {
  padding: 18px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.menuItemTitle {
  min-height: 52px;
  margin: 0 0 8px;
  color: #5f0e0b;
  font-size: 20px;
  line-height: 1.25;
}

.menuItemPrice {
  color: #b27414;
  font-size: 19px;
  font-weight: 800;
}

.menuItemDescription {
  margin: 0 0 16px;
  color: #666;
  font-size: 14px;
  min-height: 40px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.menuItemActions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
}

.menuQuantityControlGroup {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.menuQuantityControl {
  display: flex;
  align-items: center;
  background: #f0f0f0;
  border-radius: 8px;
  padding: 2px;
}

.menuQuantityButton {
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px 10px;
  font-weight: bold;
}

.menuQuantityDisplay {
  width: 25px;
  text-align: center;
  font-size: 14px;
  font-weight: 700;
}

.menuAddToCartButton {
  background: #6b0f0f;
  color: #fff;
  border: none;
  padding: 12px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 800;
}

.menuProductGrid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

@media (max-width: 1024px) {
  .menuProductGrid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .menuProductGrid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .menuProductGrid {
    grid-template-columns: 1fr;
  }
}

.menuCartSummary {
  margin-top: 24px;
  background: #fff;
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.06);
}

.menuCartSummaryTitle {
  margin: 0 0 15px;
  color: #6b0f0f;
}

.menuCartSummaryText {
  margin: 0;
  color: #555;
}

@media (max-width: 1024px) {
  .menuBrandSection {
    padding: 16px 18px;
  }

  .menuBrandTitle {
    font-size: 22px;
  }

  .menuContainer {
    padding: 16px 1%;
  }
}

@media (max-width: 768px) {
  .menuBrandSection {
    flex-direction: column;
    text-align: center;
    padding: 16px;
  }

  .menuSearchFilterSection {
    flex-direction: column;
    align-items: stretch;
  }

  .menuSearchInputWrapper,
  .menuLocationSelectWrapper {
    min-width: unset;
    width: 100%;
  }

  .menuSearchInput {
    width: 100%;
  }

  .menuItemActions {
    flex-direction: column;
    gap: 10px;
    align-items: stretch;
  }

  .menuQuantityControlGroup {
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .menuAddToCartButton {
    width: 100%;
  }

  .menuItemTitle {
    font-size: 17px;
    min-height: auto;
  }

  .menuItemBody {
    padding: 14px;
  }
}

@media (max-width: 480px) {
  .menuContainer {
    padding: 12px 1%;
  }

  .menuBrandTitle {
    font-size: 20px;
  }

  .menuItemPrice {
    font-size: 16px;
  }
}
`;

export default function Menu({
  searchQuery = "",
  onSearchChange,
  onAddToCart,
  cartCount = 0,
}) {
  const [location, setLocation] = useState("Mumbai");
  const [qtyMap, setQtyMap] = useState({});

  const updateQty = (id, action) => {
    setQtyMap((prev) => {
      const current = prev[id] ?? 1;
      let next = current;
      if (action === "plus") next = current + 1;
      if (action === "minus" && current > 1) next = current - 1;
      return { ...prev, [id]: next };
    });
  };

  const getQty = (id) => qtyMap[id] ?? 1;

  const addToCart = (item) => {
    const product = {
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: getQty(item.id),
      image: item.image,
      description: item.desc,
    };

    if (typeof onAddToCart === "function") {
      onAddToCart(product);
    }
  };

  const q = searchQuery.toLowerCase();

  const sections = useMemo(() => {
    return SECTIONS.map((section) => ({
      ...section,
      items: MENU_ITEMS.filter(
        (item) =>
          section.ids.includes(item.id) &&
          item.name.toLowerCase().includes(q)
      ),
    })).filter((section) => section.items.length > 0);
  }, [q]);

  const renderItem = (item) => (
    <div key={item.id} className="menuItemCard">
      <img src={item.image} alt={item.name} className="menuItemImage" />
      <div className="menuItemBody">
        <h3 className="menuItemTitle">{item.name}</h3>
        <p className="menuItemDescription">{item.desc}</p>
        <div className="menuItemActions">
          <div className="menuQuantityControlGroup">
            <strong className="menuItemPrice">Rs. {item.price}</strong>
            <div className="menuQuantityControl">
              <button
                onClick={() => updateQty(item.id, "minus")}
                className="menuQuantityButton"
              >
                -
              </button>
              <span className="menuQuantityDisplay">{getQty(item.id)}</span>
              <button
                onClick={() => updateQty(item.id, "plus")}
                className="menuQuantityButton"
              >
                +
              </button>
            </div>
          </div>
          <button
            onClick={() => addToCart(item)}
            className="menuAddToCartButton"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="menuContainer">
      <style>{menuStyles}</style>

      <div className="menuBrandSection">
        <img src={logoImg} alt="Taj Biryani" className="menuLogoImg" />
        <div>
          <h1 className="menuBrandTitle">TAJ BIRYANI</h1>
          <p className="menuBrandSub">Authentic Dum Biryani Since 1998</p>
        </div>
      </div>

      <section className="menuSearchFilterSection">
        <div className="menuSearchInputWrapper">
          <input
            value={searchQuery}
            onChange={(event) => {
              if (onSearchChange) onSearchChange(event.target.value);
            }}
            placeholder="Search for biryani..."
            className="menuSearchInput"
          />
        </div>

        <div className="menuLocationSelectWrapper">
          <select
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            className="menuLocationSelect"
          >
            <option>Mumbai</option>
            <option>Hyderabad</option>
            <option>Delhi</option>
            <option>Bangalore</option>
          </select>
        </div>
      </section>

      {sections.map((section) => (
        <section key={section.title} className="menuSection">
          <div className="menuSectionHeader">
            <h2 className="menuSectionTitle">{section.title}</h2>
            <hr className="menuSectionLine" />
          </div>
          <div className="menuProductGrid">
            {section.items.map(renderItem)}
          </div>
        </section>
      ))}

      <div className="menuCartSummary">
        <h2 className="menuCartSummaryTitle">Cart Summary</h2>
        <p className="menuCartSummaryText">
          {cartCount} item(s) added to cart for {location}.
        </p>
      </div>
    </div>
  );
}
