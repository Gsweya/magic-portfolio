"use client";

import { useState } from "react";
import { Column } from "@once-ui-system/core";
import styles from "./aboutTabs.module.scss";

export interface AboutTab {
  id: string;
  label: string;
  content: React.ReactNode;
}

export const AboutTabs: React.FC<{ tabs: AboutTab[] }> = ({ tabs }) => {
  const [activeId, setActiveId] = useState(tabs[0]?.id ?? "");
  const current = tabs.find((tab) => tab.id === activeId) ?? tabs[0];

  return (
    <Column fillWidth gap="m">
      <div className={styles.tabs} role="tablist">
        {tabs.map((tab) => {
          const isActive = tab.id === current?.id;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={`${styles.tab}${isActive ? ` ${styles.active}` : ""}`}
              onClick={() => setActiveId(tab.id)}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      <Column key={current?.id} fillWidth role="tabpanel">
        {current?.content}
      </Column>
    </Column>
  );
};
