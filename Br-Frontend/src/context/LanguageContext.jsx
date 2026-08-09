import { createContext, useContext, useState, useEffect } from "react";

const translations = {
  en: {
    home: "Home",
    menu: "Menu",
    cart: "Cart",
    checkout: "Checkout",
    trackOrder: "Track Order",
    login: "Login",
    register: "Register",
    profile: "Profile",
    orders: "Orders",
    logout: "Logout",
    addToCart: "Add to Cart",
    search: "Search for biryani...",
    cartSummary: "Cart Summary",
    itemsAdded: "{count} item(s) added to cart for {location}.",
    quantity: "Quantity",
    total: "Total",
    placeOrder: "Place Order",
    orderConfirmed: "Order Confirmed!",
    darkMode: "Dark Mode",
    lightMode: "Light Mode",
    backToHome: "Back to Home",
    pageNotFound: "Page Not Found",
    pageNotFoundDesc: "The page you're looking for doesn't exist or has been moved.",
  },
  hi: {
    home: "घर",
    menu: "मेनू",
    cart: "कार्ट",
    checkout: "चेकआउट",
    trackOrder: "ऑर्डर ट्रैक",
    login: "लॉगिन",
    register: "रजिस्टर",
    profile: "प्रोफाइल",
    orders: "ऑर्डर",
    logout: "लॉगआउट",
    addToCart: "कार्ट में जोड़ें",
    search: "बिरयानी खोजें...",
    cartSummary: "कार्ट सारांश",
    itemsAdded: "{location} के लिए {count} आइटम कार्ट में जोड़े गए।",
    quantity: "मात्रा",
    total: "कुल",
    placeOrder: "ऑर्डर दें",
    orderConfirmed: "ऑर्डर की पुष्टि हो गई!",
    darkMode: "डार्क मोड",
    lightMode: "लाइट मोड",
    backToHome: "घर वापस जाएं",
    pageNotFound: "पृष्ठ नहीं मिला",
    pageNotFoundDesc: "आप जो पृष्ठ खोज रहे हैं वह मौजूद नहीं है या स्थानांतरित हो गया है।",
  },
  ur: {
    home: "گھر",
    menu: "مینو",
    cart: "کارٹ",
    checkout: "چیک آؤٹ",
    trackOrder: "آرڈر ٹریک",
    login: "لاگ ان",
    register: "رجسٹر",
    profile: "پروفائل",
    orders: "آرڈرز",
    logout: "لاگ آؤٹ",
    addToCart: "کارٹ میں شامل کریں",
    search: "بریانی تلاش کریں...",
    cartSummary: "کارٹ خلاصہ",
    itemsAdded: "{location} کے لیے {count} آئٹمز کارٹ میں شامل کیے گئے۔",
    quantity: "مقدار",
    total: "کل",
    placeOrder: "آرڈر دیں",
    orderConfirmed: "آرڈر کی تصدیق ہو گئی!",
    darkMode: "ڈارک موڈ",
    lightMode: "لائٹ موڈ",
    backToHome: "گھر واپس جائیں",
    pageNotFound: "صفحہ نہیں ملا",
    pageNotFoundDesc: "آپ جو صفحہ تلاش کر رہے ہیں وہ موجود نہیں ہے یا منتقل ہو گیا ہے۔",
  },
};

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem("taj_language") || "en";
  });

  useEffect(() => {
    localStorage.setItem("taj_language", language);
    document.documentElement.lang = language;
  }, [language]);

  const t = (key, replacements = {}) => {
    let text = translations[language]?.[key] || translations.en[key] || key;
    for (const [placeholder, value] of Object.entries(replacements)) {
      text = text.replace(new RegExp(`\\{${placeholder}\\}`, 'g'), value);
    }
    return text;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
