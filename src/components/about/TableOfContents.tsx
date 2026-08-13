"use client";

import React, { useEffect, useState } from "react";
import { Column, Flex, Text } from "@once-ui-system/core";
import styles from "./about.module.scss";

interface TableOfContentsProps {
  structure: {
    title: string;
    display: boolean;
    items: string[];
  }[];
  about: {
    tableOfContent: {
      display: boolean;
      subItems: boolean;
    };
  };
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ structure, about }) => {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const visible = structure.filter((section) => section.display);

    const updateActive = () => {
      let current = "";
      for (const section of visible) {
        const element = document.getElementById(section.title);
        if (element && element.getBoundingClientRect().top <= 140) {
          current = section.title;
        }
      }
      if (current === "" && visible.length > 0) {
        current = visible[0].title;
      }
      setActiveId(current);
    };

    updateActive();
    window.addEventListener("scroll", updateActive, { passive: true });
    return () => window.removeEventListener("scroll", updateActive);
  }, [structure]);

  const scrollTo = (id: string, offset: number) => {
    const element = document.getElementById(id);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  if (!about.tableOfContent.display) return null;

  return (
    <Column
      left="0"
      style={{
        top: "50%",
        transform: "translateY(-50%)",
        whiteSpace: "nowrap",
      }}
      position="fixed"
      paddingLeft="24"
      gap="32"
      m={{ hide: true }}
    >
      {structure
        .filter((section) => section.display)
        .map((section, sectionIndex) => {
          const isActive = activeId === section.title;

          return (
            <Column key={sectionIndex} gap="12">
              <Flex
                cursor="interactive"
                className={styles.hover}
                gap="8"
                vertical="center"
                padding="8"
                paddingX="12"
                radius="full"
                {...(isActive
                  ? {
                      background: "surface",
                      shadow: "s",
                      style: {
                        backdropFilter: "blur(16px)",
                        WebkitBackdropFilter: "blur(16px)",
                      },
                    }
                  : {})}
                onClick={() => scrollTo(section.title, 80)}
              >
                <Flex
                  height="1"
                  minWidth="16"
                  background={isActive ? "brand-strong" : "neutral-strong"}
                ></Flex>
                <Text {...(isActive ? { onBackground: "brand-strong" } : {})}>
                  {section.title}
                </Text>
              </Flex>
              {about.tableOfContent.subItems && (
                <>
                  {section.items.map((item, itemIndex) => (
                    <Flex
                      l={{ hide: true }}
                      key={itemIndex}
                      style={{ cursor: "pointer" }}
                      className={styles.hover}
                      gap="12"
                      paddingLeft="24"
                      vertical="center"
                      onClick={() => scrollTo(item, 80)}
                    >
                      <Flex height="1" minWidth="8" background="neutral-strong"></Flex>
                      <Text>{item}</Text>
                    </Flex>
                  ))}
                </>
              )}
            </Column>
          );
        })}
    </Column>
  );
};

export default TableOfContents;