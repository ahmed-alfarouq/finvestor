"use client";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

const DarkModeToggle = () => {
  const [isClient, setIsClient] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => setIsClient(true), []);

  if (!isClient) return;

  return (
    <button
      type="button"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="bg-default-black dark:bg-white shadow-md dark:shadow-cyan-500/50 py-1 px-2.5 rounded-full transition"
    >
      {theme === "dark" ? (
        <Sun className="text-yellow-600" />
      ) : (
        <Moon className="text-white" />
      )}
    </button>
  );
};

export default DarkModeToggle;
