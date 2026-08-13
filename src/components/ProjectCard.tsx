"use client";

import { Card, Column, Media, Row, Avatar, Text, SmartLink } from "@once-ui-system/core";
import { person } from "@/resources";

interface ProjectCardProps {
  href: string;
  priority?: boolean;
  images: string[];
  title: string;
  content: string;
  description: string;
  avatars: { src: string }[];
  link: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  href,
  priority,
  images = [],
  title,
  content,
  description,
  avatars,
  link,
}) => {
  return (
    <Card
      fillWidth
      transition="micro-medium"
      direction="column"
      border="transparent"
      background="transparent"
      padding="4"
      radius="l-4"
      s={{ direction: "column" }}
    >
      {images.length > 0 && (
        <Media
          priority={priority}
          sizes="(max-width: 768px) 100vw, 640px"
          border="neutral-alpha-weak"
          radius="l"
          aspectRatio="16 / 9"
          objectFit="contain"
          background="neutral-alpha-weak"
          alt={"Thumbnail of " + title}
          src={images[0]}
        />
      )}
      <Row fillWidth>
        <Column maxWidth={28} paddingY="24" paddingX="l" gap="20" vertical="center">
          <Row gap="24" vertical="center">
            <Row vertical="center" gap="16">
              <Avatar src={avatars[0]?.src ?? person.avatar} size="s" />
              <Text variant="label-default-s">{person.name}</Text>
            </Row>
          </Row>
          <Text variant="heading-strong-l" wrap="balance">
            {title}
          </Text>
          {description?.trim() && (
            <Text variant="body-default-s" onBackground="neutral-weak" wrap="balance">
              {description}
            </Text>
          )}
          <Row gap="24" wrap>
            {content?.trim() && (
              <SmartLink
                suffixIcon="arrowRight"
                style={{ margin: "0", width: "fit-content" }}
                href={href}
              >
                <Text variant="body-default-s">Read case study</Text>
              </SmartLink>
            )}
            {link && (
              <SmartLink
                suffixIcon="arrowUpRightFromSquare"
                style={{ margin: "0", width: "fit-content" }}
                href={link}
              >
                <Text variant="body-default-s">View project</Text>
              </SmartLink>
            )}
          </Row>
        </Column>
      </Row>
    </Card>
  );
};