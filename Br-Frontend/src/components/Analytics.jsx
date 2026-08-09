import { useEffect } from "react";

const GA_ID = import.meta.env.VITE_GA_ID || "";

export function initGA() {
  if (!GA_ID || typeof window === "undefined") return;
  if (window.gtag) return;

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", GA_ID, { send_page_view: false });
}

export function trackPageView(path, title) {
  if (typeof window.gtag === "function") {
    window.gtag("event", "page_view", { page_path: path, page_title: title });
  }
}

export function trackEvent(category, action, label, value) {
  if (typeof window.gtag === "function") {
    window.gtag("event", action, { event_category: category, event_label: label, value });
  }
}

export function usePageTracking(path, title) {
  useEffect(() => {
    trackPageView(path, title);
  }, [path, title]);
}

export default function Analytics() {
  useEffect(() => {
    initGA();
  }, []);
  return null;
}
