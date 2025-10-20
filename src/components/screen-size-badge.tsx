"use client";
import { useEffect, useState } from "react";

const breakpoints = [
  { max: 640, label: "xs" },
  { max: 768, label: "sm" },
  { max: 1024, label: "md" },
  { max: 1280, label: "lg" },
  { max: 1536, label: "xl" },
];

const ScreenSizeBadge = () => {
  const [size, setSize] = useState("");

  useEffect(() => {
    const handleSize = () => {
      const width = window.innerWidth;
      const bp = breakpoints.find((b) => width < b.max);
      setSize(bp ? bp.label : "2xl+");
    };
    handleSize();
    window.addEventListener("resize", handleSize);
    return () => window.removeEventListener("resize", handleSize);
  }, []);

  return (
    <div className="z-50 fixed bottom-5 left-16 w-22 px-4 py-2 rounded-md bg-primary text-white font-bold uppercase text-center shadow-md">
      {size}
    </div>
  );
};

export default ScreenSizeBadge;
