import { useState, useEffect, useCallback } from "react";

export function useOffline() {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [cachedMenu, setCachedMenu] = useState(null);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const cacheMenu = useCallback(async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5001/api"}/menu`);
      const data = await res.json();
      if (data.success) {
        localStorage.setItem("taj_cached_menu", JSON.stringify(data.data));
        setCachedMenu(data.data);
      }
    } catch {
      const cached = localStorage.getItem("taj_cached_menu");
      if (cached) setCachedMenu(JSON.parse(cached));
    }
  }, []);

  const getCachedMenu = useCallback(() => {
    const cached = localStorage.getItem("taj_cached_menu");
    if (cached) {
      setCachedMenu(JSON.parse(cached));
      return JSON.parse(cached);
    }
    return null;
  }, []);

  useEffect(() => {
    cacheMenu();
  }, [cacheMenu]);

  return { isOffline, cachedMenu, cacheMenu, getCachedMenu };
}
