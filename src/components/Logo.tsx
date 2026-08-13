"use client";

import { useEffect, useState } from "react";

interface LogoProps {
  width?: number;
  height?: number;
  style?: React.CSSProperties;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ width = 96, height, style, className }) => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const apply = () =>
      setTheme(document.documentElement.getAttribute("data-theme") || "light");

    apply();

    const observer = new MutationObserver(apply);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  const src = theme === "dark" ? "/images/logo-white.png" : "/images/logo-black.png";

  return (
    <img
      src={src}
      alt="Galanda John Sweya"
      width={width}
      height={height ?? Math.round((width * 597) / 512)}
      className={className}
      style={{
        objectFit: "contain",
        display: "block",
        ...style,
      }}
    />
  );
};
