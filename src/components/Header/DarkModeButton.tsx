import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { MoonStar, Sun } from "lucide-react";

export default function DarkModeButton() {
  const [mounted, setMounted] = useState(false);
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;

  const toggleTheme = () => {
    theme == "dark" ? setTheme("light") : setTheme("dark");
  }

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div style={{ height: "32px", width: "32px" }} />;
  }

  return (
    <button
      onClick={toggleTheme}
      className={`
        rounded-full text-wine/50 dark:text-bubblegum/50
        hover:text-amber-500 dark:hover:text-slate-300 p-2 transition
        `}
    >
      {currentTheme === "light" ? (
        <Sun />
      ) : (
        <MoonStar />
      )}
    </button>
  );
}
