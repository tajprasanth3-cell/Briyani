import { useState, useMemo } from "react";
import { useQuantityLimit } from "../hooks/useQuantityLimit.js";
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
import logoImg from "./Images/taj_logo.png";
import paneerTikkaImg from "./Images/veg special.jpg";
import eggDumImg from "./Images/bri.jpg";
import prawnsImg from "./Images/ciiii.jpg";
import awadhiImg from "./Images/chicken full.jpg";
import fishTikkaImg from "./Images/Fish Tikka Biryani.jpg";
import iceCreamImg from "./Images/ice_cream.png";
import sodaImg from "./Images/soda.png";
import colaImg from "./Images/cola_img.png";
import lemonSodaImg from "./Images/lemon_soda_img.png";
import orangeSodaImg from "./Images/orange_soda_img.png";
import gingerAleImg from "./Images/ginger_ale_img.png";
import jeeraSodaImg from "./Images/jeera_soda_img.png";
import vanillaIceCreamImg from "./Images/vanilla_ice_cream_img.png";
import chocolateIceCreamImg from "./Images/chocolate_ice_cream_img.png";
import strawberryIceCreamImg from "./Images/strawberry_ice_cream_img.png";
import mangoIceCreamImg from "./Images/mango_ice_cream_img.png";
import pistachioIceCreamImg from "./Images/pistachio_ice_cream_img.png";
import coffeeIceCreamImg from "./Images/coffee_ice_cream_img.png";

import kadaiVegImg from "./Images/Kadai Vegetable.jpg";
import paneerButterImg from "./Images/Paneer Butter Masala.jpg";
import soyaChaapImg from "./Images/Soya Chaap Biryani.jpg";
import mushroomDumImg from "./Images/Mushroom Dum Biryani.jpg";
import newFishTikkaImg from "./Images/Fish Tikka Biryani.jpg";
import newEggDumImg from "./Images/Egg Dum Biryani.jpg";
import roganJoshImg from "./Images/Mutton Rogan Josh.jpg";
import pepperFryImg from "./Images/Mutton Pepper Fry.jpg";
import keemaImg from "./Images/Keema Biryani.jpg";
import tandooriImg from "./Images/Tandoori Chicken Biryani.jpg";
import afghaniImg from "./Images/Murgh Afghani Biryani.jpg";
import tikkaDumImg from "./Images/Chicken Tikka Dum Biryani.jpg";
import tikkaMasalaImg from "./Images/Chicken Tikka Masala.jpg";
import butterChickenImg from "./Images/Butter Chicken.jpg";

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
    image: vegspecial,
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
    image: feastImg,
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
    image: feastImg5,
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
    image: ton,
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
  {
    id: 13,
    name: "Paneer Tikka Biryani",
    rating: 4.6,
    reviews: "450",
    price: 399,
    qty: 1,
    category: "Veg",
    image: paneerTikkaImg,
    desc: "Smoky paneer tikka layered with aromatic basmati rice.",
  },
  {
    id: 14,
    name: "Egg Dum Biryani",
    rating: 4.5,
    reviews: "320",
    price: 299,
    qty: 1,
    category: "Special",
    image: newEggDumImg,
    desc: "Spiced boiled eggs nestled in flavorful saffron rice.",
  },
  {
    id: 15,
    name: "Prawns Biryani",
    rating: 4.9,
    reviews: "890",
    price: 799,
    qty: 1,
    category: "Special",
    image: prawnsImg,
    desc: "Fresh prawns marinated in coastal spices cooked with dum.",
  },
  {
    id: 16,
    name: "Awadhi Chicken Biryani",
    rating: 4.8,
    reviews: "1.1K",
    price: 649,
    qty: 1,
    category: "Chicken",
    image: awadhiImg,
    desc: "Mildly spiced, aromatic biryani from the Nawabs of Lucknow.",
  },
  {
    id: 17,
    name: "Fish Tikka Biryani",
    rating: 4.7,
    reviews: "560",
    price: 749,
    qty: 1,
    category: "Special",
    image: newFishTikkaImg,
    desc: "Juicy fish tikka chunks cooked with fragrant basmati rice.",
  },
  {
    id: 18,
    name: "Mushroom Dum Biryani",
    rating: 4.6,
    reviews: "210",
    price: 349,
    qty: 1,
    category: "Veg",
    image: mushroomDumImg,
    desc: "Fresh mushrooms cooked with aromatic spices and basmati rice.",
  },
  {
    id: 19,
    name: "Soya Chaap Biryani",
    rating: 4.5,
    reviews: "180",
    price: 329,
    qty: 1,
    category: "Veg",
    image: soyaChaapImg,
    desc: "Protein-rich soya chaap layered with spicy rice.",
  },
  {
    id: 20,
    name: "Keema Biryani",
    rating: 4.8,
    reviews: "670",
    price: 699,
    qty: 1,
    category: "Mutton",
    image: keemaImg,
    desc: "Minced mutton cooked with aromatic spices and layered with rice.",
  },
  {
    id: 21,
    name: "Ambur Mutton Biryani",
    rating: 4.9,
    reviews: "950",
    price: 849,
    qty: 1,
    category: "Mutton",
    image: familyImg,
    desc: "Famous South Indian biryani made with seeraga samba rice.",
  },
  {
    id: 22,
    name: "Tandoori Chicken Biryani",
    rating: 4.7,
    reviews: "820",
    price: 599,
    qty: 1,
    category: "Chicken",
    image: tandooriImg,
    desc: "Smoky tandoori chicken pieces in flavorful biryani rice.",
  },
  {
    id: 23,
    name: "Sindhi Chicken Biryani",
    rating: 4.8,
    reviews: "540",
    price: 649,
    qty: 1,
    category: "Chicken",
    image: royalImg,
    desc: "Spicy and tangy biryani with potatoes and dried plums.",
  },
  {
    id: 24,
    name: "Kalyani Biryani",
    rating: 4.6,
    reviews: "410",
    price: 499,
    qty: 1,
    category: "Special",
    image: vegspecial,
    desc: "A flavorful and affordable alternative to the traditional biryani.",
  },
  {
    id: 25,
    name: "Thalappakatti Biryani",
    rating: 4.9,
    reviews: "1.2K",
    price: 799,
    qty: 1,
    category: "Special",
    image: feastImg,
    desc: "Signature biryani from Dindigul made with short-grain rice.",
  },
  {
    id: 26,
    name: "Malabar Roast Biryani",
    rating: 4.8,
    reviews: "880",
    price: 749,
    qty: 1,
    category: "Special",
    image: feastImg3,
    desc: "Kerala style biryani with roasted spices and ghee rice.",
  },
  {
    id: 27,
    name: "Chicken Tikka Dum Biryani",
    rating: 4.9,
    reviews: "1.5K",
    price: 689,
    qty: 1,
    category: "Chicken",
    image: tikkaDumImg,
    desc: "Spicy chicken tikka pieces layered with dum cooked rice.",
  },
  {
    id: 28,
    name: "Murgh Afghani Biryani",
    rating: 4.7,
    reviews: "920",
    price: 729,
    qty: 1,
    category: "Chicken",
    image: afghaniImg,
    desc: "Creamy, mild chicken cooked in rich Afghani style.",
  },
  { id: 29, name: "Classic Vanilla Ice Cream", rating: 4.8, reviews: "320", price: 149, qty: 1, category: "Dessert", image: vanillaIceCreamImg, desc: "Rich and creamy classic vanilla bean ice cream." },
  { id: 30, name: "Belgian Chocolate Ice Cream", rating: 4.9, reviews: "510", price: 179, qty: 1, category: "Dessert", image: chocolateIceCreamImg, desc: "Decadent dark chocolate ice cream made with Belgian cocoa." },
  { id: 31, name: "Strawberry Ripple Ice Cream", rating: 4.6, reviews: "280", price: 159, qty: 1, category: "Dessert", image: strawberryIceCreamImg, desc: "Fresh strawberry ice cream with real fruit chunks." },
  { id: 32, name: "Alphonso Mango Ice Cream", rating: 4.9, reviews: "640", price: 189, qty: 1, category: "Dessert", image: mangoIceCreamImg, desc: "Seasonal special ice cream made with real Alphonso mangoes." },
  { id: 33, name: "Pistachio Nut Ice Cream", rating: 4.7, reviews: "390", price: 199, qty: 1, category: "Dessert", image: pistachioIceCreamImg, desc: "Premium pistachio ice cream with roasted nuts." },
  { id: 34, name: "Butterscotch Ice Cream", rating: 4.8, reviews: "450", price: 169, qty: 1, category: "Dessert", image: coffeeIceCreamImg, desc: "Classic butterscotch with crunchy praline bits." },
  { id: 35, name: "Cookies & Cream", rating: 4.8, reviews: "520", price: 179, qty: 1, category: "Dessert", image: vanillaIceCreamImg, desc: "Vanilla ice cream loaded with chocolate cookie chunks." },
  { id: 36, name: "Mint Chocolate Chip", rating: 4.5, reviews: "210", price: 169, qty: 1, category: "Dessert", image: pistachioIceCreamImg, desc: "Refreshing mint ice cream with dark chocolate chips." },
  { id: 37, name: "Coffee Mocha Ice Cream", rating: 4.7, reviews: "340", price: 189, qty: 1, category: "Dessert", image: coffeeIceCreamImg, desc: "Espresso infused ice cream with chocolate swirls." },
  { id: 38, name: "Rocky Road Ice Cream", rating: 4.6, reviews: "290", price: 199, qty: 1, category: "Dessert", image: chocolateIceCreamImg, desc: "Chocolate ice cream with marshmallows and nuts." },
  { id: 39, name: "Mutton Rogan Josh", rating: 4.8, reviews: "410", price: 449, qty: 1, category: "Mutton", image: roganJoshImg, desc: "Slow-cooked Kashmiri style mutton curry." },
  { id: 40, name: "Mutton Pepper Fry", rating: 4.9, reviews: "520", price: 429, qty: 1, category: "Mutton", image: pepperFryImg, desc: "Spicy South Indian style dry mutton fry." },
  { id: 41, name: "Paneer Butter Masala", rating: 4.7, reviews: "630", price: 299, qty: 1, category: "Veg", image: paneerButterImg, desc: "Rich and creamy tomato gravy with soft paneer cubes." },
  { id: 42, name: "Kadai Vegetable", rating: 4.6, reviews: "380", price: 249, qty: 1, category: "Veg", image: kadaiVegImg, desc: "Mixed vegetables cooked in a spicy kadai masala." },
  { id: 43, name: "Chicken Tikka Masala", rating: 4.8, reviews: "750", price: 349, qty: 1, category: "Chicken", image: tikkaMasalaImg, desc: "Roasted chicken chunks in a spicy, creamy sauce." },
  { id: 44, name: "Butter Chicken", rating: 4.9, reviews: "890", price: 379, qty: 1, category: "Chicken", image: butterChickenImg, desc: "Classic mildly spiced chicken in a rich tomato and butter gravy." },
  { id: 45, name: "Classic Cola", rating: 4.7, reviews: "450", price: 60, qty: 1, category: "Beverage", image: colaImg, desc: "Refreshing classic cola to beat the heat." },
  { id: 46, name: "Lemon Soda", rating: 4.8, reviews: "380", price: 70, qty: 1, category: "Beverage", image: lemonSodaImg, desc: "Chilled fresh lemon soda with a hint of mint." },
  { id: 47, name: "Orange Fizz", rating: 4.6, reviews: "290", price: 65, qty: 1, category: "Beverage", image: orangeSodaImg, desc: "Sparkling orange soda, sweet and tangy." },
  { id: 48, name: "Ginger Ale", rating: 4.5, reviews: "190", price: 80, qty: 1, category: "Beverage", image: gingerAleImg, desc: "Crisp and dry ginger ale." },
  { id: 49, name: "Masala Jeera Soda", rating: 4.9, reviews: "610", price: 75, qty: 1, category: "Beverage", image: jeeraSodaImg, desc: "Spiced cumin soda, perfect after a heavy biryani." },
];

const SECTIONS = [
  {
    title: "Popular Biryani",
    ids: [1, 2, 5, 6, 15, 24, 25, 26],
  },
  {
    title: "Chicken Biryani & Curries",
    ids: [7, 9, 10, 11, 16, 22, 23, 27, 28, 43, 44],
  },
  {
    title: "Mutton Biryani & Curries",
    ids: [2, 12, 20, 21, 39, 40],
  },
  {
    title: "Veg & Special",
    ids: [3, 8, 4, 13, 14, 17, 18, 19, 41, 42],
  },
  {
    title: "Ice Cream & Desserts",
    ids: [29, 30, 31, 32, 33, 34, 35, 36, 37, 38],
  },
  {
    title: "Beverages & Sodas",
    ids: [45, 46, 47, 48, 49],
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
  position: relative;
  z-index: 50;
}

@keyframes popInBar {
  from { opacity: 0; transform: scale(0.95) translateY(-10px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
}

.menuSearchInputWrapper,
.menuLocationSelectWrapper {
  box-sizing: border-box;
  flex: 1;
  min-width: 240px;
  background: #fff;
  border-radius: 18px;
  padding: 6px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
  animation: popInBar 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.menuSearchInputWrapper:focus-within,
.menuLocationSelectWrapper:focus-within,
.menuSearchInputWrapper:hover,
.menuLocationSelectWrapper:hover {
  transform: translateY(-2px);
  box-shadow: 0 16px 32px rgba(107, 15, 15, 0.12);
}

.menuLocationSelectWrapper {
  min-width: 180px;
}

.menuSearchInput {
  width: 100%;
  padding: 12px 16px;
  border-radius: 12px;
  border: none;
  background: transparent;
  outline: none;
  box-sizing: border-box;
}

.menuCustomDropdown {
  position: relative;
  width: 100%;
}

.menuDropdownButton {
  width: 100%;
  padding: 12px 16px;
  border-radius: 12px;
  border: none;
  background: transparent;
  outline: none;
  box-sizing: border-box;
  text-align: left;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  color: #333;
}

.menuDropdownList {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background: #fff;
  border-radius: 12px;
  margin-top: 6px;
  padding: 8px 0;
  box-shadow: 0 12px 30px rgba(0,0,0,0.1);
  z-index: 100;
  animation: dropDownFadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.menuDropdownItem {
  padding: 10px 16px;
  cursor: pointer;
  color: #333;
  transition: background 0.2s, color 0.2s;
}

.menuDropdownItem:hover {
  background: #fff6eb;
  color: #b27414;
}

@keyframes dropDownFadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
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

@keyframes slideUpMenu {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
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
  opacity: 0;
  animation: slideUpMenu 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
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
  .menuBrandSection { padding: 16px 18px; }
  .menuBrandTitle { font-size: 22px; }
  .menuContainer { padding: 16px 2%; }
}

@media (max-width: 768px) {
  .menuProductGrid {
    grid-template-columns: repeat(2, 1fr);
    gap: 14px;
  }
  .menuBrandSection {
    flex-direction: column;
    text-align: center;
    padding: 16px;
    border-radius: 16px;
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
  .menuSearchInput { width: 100%; }
  .menuCartItemActions {
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
  .menuAddToCartButton { width: 100%; gap:16px }
  .menuItemTitle { font-size: 15px; min-height: auto; }
  .menuItemBody { padding: 12px; }
  .menuItemDescription { font-size: 12px; min-height: auto; }
  .menuContainer { padding: 12px 2%; }
  .menuSection { margin-bottom: 28px; }
}

@media (max-width: 480px) {
  .menuProductGrid {
    grid-template-columns: 1fr;
    gap: 14px;
  }
  .menuContainer { padding: 12px 2%; }
  .menuBrandTitle { font-size: 20px; }
  .menuItemPrice { font-size: 16px; }
  .menuSectionTitle { font-size: 20px; }
  .menuItemBody { padding: 16px; }
  .menuBrandSection { padding: 12px 14px; border-radius: 14px; }
  .menuLogoImg { width: 50px; height: 50px; }
  .menuItemActions { margin-top: 20px; gap: 12px; }
  .menuAddToCartButton { padding: 14px; flex: 1; }
}
`;

export default function Menu({
  searchQuery = "",
  onSearchChange,
  onAddToCart,
  cartCount = 0,
}) {
  const [location, setLocation] = useState("Mumbai");
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const locations = ["Mumbai", "Hyderabad", "Delhi", "Bangalore"];
  const { getQty, updateQty, isAtMax, isAtMin } = useQuantityLimit(10);

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

  const renderItem = (item, index) => (
    <div key={item.id} className="menuItemCard" role="article" aria-label={item.name} style={{ animationDelay: `${index * 0.1}s` }}>
      <img src={item.image} alt={item.name} className="menuItemImage" loading="lazy" />
      <div className="menuItemBody">
        <h3 className="menuItemTitle">{item.name}</h3>
        <p className="menuItemDescription">{item.desc}</p>
        <div className="menuItemActions">
          <div className="menuQuantityControlGroup">
            <strong className="menuItemPrice">Rs. {item.price}</strong>
            <div className="menuQuantityControl" role="group" aria-label={`Quantity controls for ${item.name}`}>
              <button
                onClick={() => updateQty(item.id, "minus")}
                className="menuQuantityButton"
                disabled={isAtMin(item.id)}
                aria-label="Decrease quantity"
              >
                -
              </button>
              <span className="menuQuantityDisplay" aria-label={`Quantity: ${getQty(item.id)}`}>{getQty(item.id)}</span>
              <button
                onClick={() => updateQty(item.id, "plus")}
                className="menuQuantityButton"
                disabled={isAtMax(item.id)}
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          </div>
          <button
            onClick={() => addToCart(item)}
            className="menuAddToCartButton"
            aria-label={`Add ${item.name} to cart`}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="menuContainer" role="region" aria-label="Menu">
      <style>{menuStyles}</style>

      <div className="menuBrandSection">
        <img src={logoImg} alt="Taj Biryani" className="menuLogoImg" loading="eager" />
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
            aria-label="Search menu items"
            role="searchbox"
          />
        </div>

        <div className="menuLocationSelectWrapper">
          <div className="menuCustomDropdown">
            <button
              className="menuDropdownButton"
              onClick={() => setIsLocationOpen(!isLocationOpen)}
              aria-label="Select location"
            >
              {location}
              <span style={{ fontSize: "10px", transition: "transform 0.3s", transform: isLocationOpen ? "rotate(180deg)" : "rotate(0deg)" }}>▼</span>
            </button>
            {isLocationOpen && (
              <div className="menuDropdownList">
                {locations.map((loc) => (
                  <div
                    key={loc}
                    className="menuDropdownItem"
                    onClick={() => {
                      setLocation(loc);
                      setIsLocationOpen(false);
                    }}
                  >
                    {loc}
                  </div>
                ))}
              </div>
            )}
          </div>
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
