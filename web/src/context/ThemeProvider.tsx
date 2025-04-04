"use client";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { getCookie, setCookie } from "cookies-next/client";

type Theme = "light" | "dark" | "rustic";

interface ThemeContextType {
  theme: Theme;
  setTheme: (newTheme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === "undefined") return "light";
    return (getCookie("theme") as Theme) || "light";
  });


  const setCurrentTheme = (newTheme: Theme) => {
    // document.documentElement.classList.remove("light", "dark", "rustic");
    document.documentElement.setAttribute("data-theme", newTheme);
    setCookie("theme", newTheme, { path: "/" });
    setTheme(newTheme);
  };

  useEffect(() => {
    const storedTheme = getCookie("theme") as Theme | null;
    if (storedTheme) {
      setCurrentTheme(storedTheme);
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme: setCurrentTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme debe usarse dentro de un ThemeProvider");
  }
  return context;
};
