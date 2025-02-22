"use client";

import React from "react";
import { useTheme } from "next-themes";

const DarkModeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="bg-default-black dark:bg-white shadow-md dark:shadow-cyan-500/50 py-1 px-2 rounded-full transition"
    >
      {theme === "dark" ? "🌞" : "🌙"}
    </button>
  );
};

export default DarkModeToggle;
