import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("taj_darkMode") === "true";
  });

  useEffect(() => {
    localStorage.setItem("taj_darkMode", darkMode);
    document.body.style.background = darkMode ? "#1a0a0a" : "#f8f6f2";
    document.body.style.color = darkMode ? "#f0e6d6" : "#2b140f";
  }, [darkMode]);

  const toggleDark = () => setDarkMode((prev) => !prev);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDark }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
