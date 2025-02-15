"use client";

import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";

const DarkModeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <button
      type="button"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="bg-white text-secondary-color dark:bg-primary dark:text-white shadow-md h-12 px-4 py-2 rounded transition"
    >
      {theme === "dark" ? "Light Mode 🌞" : "Dark Mode 🌙"}
    </button>
  );
};

export default DarkModeToggle;
