"use client";

import { Icon, Text } from "@once-ui-system/core";
import styles from "./TechMarquee.module.scss";

interface TechMarqueeProps {
  items: { name: string; icon?: string }[];
  speed?: number;
}

export const TechMarquee: React.FC<TechMarqueeProps> = ({ items, speed = 45 }) => {
  if (!items || items.length === 0) return null;

  const track = [...items, ...items];

  return (
    <div className={styles.viewport}>
      <div className={styles.track} style={{ animationDuration: `${speed}s` }}>
        {track.map((item, index) => (
          <div className={styles.item} key={`${item.name}-${index}`}>
            {item.icon && <Icon name={item.icon as any} size="l" onBackground="brand-weak" />}
            <Text variant="heading-strong-m">{item.name}</Text>
          </div>
        ))}
      </div>
    </div>
  );
};
