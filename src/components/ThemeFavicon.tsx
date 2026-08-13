"use client";

import { useEffect } from "react";

export const ThemeFavicon: React.FC = () => {
  useEffect(() => {
    const apply = () => {
      const theme = document.documentElement.getAttribute("data-theme") || "light";
      const href = theme === "dark" ? "/images/logo-white.png" : "/images/logo-black.png";

      const links = document.querySelectorAll<HTMLLinkElement>('link[rel~="icon"]');
      if (links.length > 0) {
        links.forEach((link) => {
          link.href = href;
          link.type = "image/png";
        });
      } else {
        const link = document.createElement("link");
        link.rel = "icon";
        link.href = href;
        link.type = "image/png";
        document.head.appendChild(link);
      }
    };

    apply();

    const observer = new MutationObserver(apply);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  return null;
};
