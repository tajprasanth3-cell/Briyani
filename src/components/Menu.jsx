import { useState } from "react";
import chickenImg from "./Images/chicken dum.jpg";
import muttonImg from "./Images/motton bry (1).jpg";
import vegImg from "./Images/veg.jpg";
import familyImg from "./Images/family.jpg";
import specialImg from "./Images/gemi1.png";
import royalImg from "./Images/be9c5060a8bf1bfbaf2afb514808bf4f.jpg";
import feastImg from "./Images/gemi1.png";

const menuStyles = `
.menuContainer {
  padding: 20px 0;
}

.menuSearchFilterSection {
  margin-bottom: 24px;
  display: flex;
  gap: 16px;
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

.menuCategorySection {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 24px;
}

.menuCategoryButton {
  padding: 12px 18px;
  border-radius: 14px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  background: #fff;
  color: #333;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
  transition: background-color 0.3s ease, color 0.3s ease;
}

.menuItemCard {
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 14px 32px rgba(44, 18, 9, 0.12);
  height: 100%;
}

.menuItemImage {
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  display: block;
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
  padding: 12px; /* Changed from 10px 16px */
  border-radius: 6px; /* Changed from 12px */
  cursor: pointer;
  font-weight: 800; /* Added */
}

.menuProductGrid { /* Added this new class */
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 24px;
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

@media (max-width: 768px) {
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

  .menuCategorySection {
    justify-content: center;
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
}
`;

export default function Menu({
  searchQuery = "",
  onSearchChange,
  onAddToCart,
  cartCount = 0,
}) {
  const [location, setLocation] = useState("Mumbai");
  const [activeCategory, setActiveCategory] = useState("All");

  const [items, setItems] = useState([
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
      category: "Chef",
      image: feastImg,
      desc: "Rich, slow-cooked biryani with chef's special masala.",
    },
     {
      id: 8,
      name: "Chef's Signature Biryani",
      rating: 4.8,
      reviews: "930",
      price: 679,
      qty: 1,
      category: "Chef",
      image: feastImg,
      desc: "Rich, slow-cooked biryani with chef's special masala.",
    },
     {
      id: 9,
      name: "Chef's Signature Biryani",
      rating: 4.8,
      reviews: "930",
      price: 679,
      qty: 1,
      category: "Chef",
      image: feastImg,
      desc: "Rich, slow-cooked biryani with chef's special masala.",
    }, {
      id: 10,
      name: "Chef's Signature Biryani",
      rating: 4.8,
      reviews: "930",
      price: 679,
      qty: 1,
      category: "Chef",
      image: feastImg,
      desc: "Rich, slow-cooked biryani with chef's special masala.",
    }, {
      id: 11,
      name: "Chicken Dum Biryani",
      rating: 4.8,
      reviews: "930",
      price: 679,
      qty: 1,
      category: "Chef",
      image: feastImg,
      desc: "Rich, slow-cooked biryani with chef's special masala.",
    },
     {
      id:12,
      name: "Chef's Signature Biryani",
      rating: 4.8,
      reviews: "930",
      price: 679,
      qty: 1,
      category: "Chef",
      image: feastImg,
      desc: "Rich, slow-cooked biryani with chef's special masala.",
    },
  ]);

  const categories = ["All", "Chicken", "Mutton", "Veg", "Family"];

  const updateQty = (id, action) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        if (action === "plus") {
          return { ...item, qty: item.qty + 1 };
        }
        if (action === "minus" && item.qty > 1) {
          return { ...item, qty: item.qty - 1 };
        }
        return item;
      })
    );
  };

  const addToCart = (item) => {
    const product = {
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: item.qty || 1,
      image: item.image,
      description: item.desc,
    };

    if (typeof onAddToCart === "function") {
      onAddToCart(product);
    }
  };

  const filteredItems = items.filter((item) => {
    const matchSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCategory =
      activeCategory === "All" ? true : item.category === activeCategory;
    return matchSearch && matchCategory;
  });

  return (
    <div className="menuContainer">
      <style>{menuStyles}</style>

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

      <section className="menuCategorySection">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`menuCategoryButton ${
              activeCategory === category ? "menuActiveCategory" : ""
            }`}
          >
            {category}
          </button>
        ))}
      </section>

      <section className="menuProductGrid"> {/* Changed className and removed inline style */}
        {filteredItems.map((item) => (
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
                    <span className="menuQuantityDisplay">{item.qty}</span>
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
        ))}
      </section>

      <div className="menuCartSummary">
        <h2 className="menuCartSummaryTitle">Cart Summary</h2>
        <p className="menuCartSummaryText">
          {cartCount} item(s) added to cart for {location}.
        </p>
      </div>
    </div>
  );
}
