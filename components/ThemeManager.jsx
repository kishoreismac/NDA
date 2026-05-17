"use client";
import { useEffect } from "react";

const KEY = "clm.theme.v1";

export function getStoredTheme() {
  if (typeof window === "undefined") return "dark";
  try {
    return window.localStorage.getItem(KEY) || "dark";
  } catch {
    return "dark";
  }
}

export function setStoredTheme(theme) {
  try {
    window.localStorage.setItem(KEY, theme);
  } catch {}
  applyTheme(theme);
  // Notify any listeners on the page
  window.dispatchEvent(new CustomEvent("clm:theme", { detail: theme }));
}

export function applyTheme(theme) {
  if (typeof document === "undefined") return;
  const html = document.documentElement;
  if (theme === "light") {
    html.setAttribute("data-theme", "light");
  } else {
    html.removeAttribute("data-theme");
  }
}

export default function ThemeManager() {
  useEffect(() => {
    applyTheme(getStoredTheme());
  }, []);
  return null;
}
