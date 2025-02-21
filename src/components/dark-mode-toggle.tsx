"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";

const DarkModeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const updateTheme = (theme: string) => {
    setTheme(theme);
    document.cookie = `theme=${theme}`;
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <button
      type="button"
      onClick={() => updateTheme(theme === "dark" ? "light" : "dark")}
      className="bg-default-black dark:bg-white shadow-md dark:shadow-cyan-500/50 py-1 px-2 rounded-full transition"
    >
      {theme === "dark" ? "🌞" : "🌙"}
    </button>
  );
};

export default DarkModeToggle;
