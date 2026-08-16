"use client";

import { Card, Column, Media, Row, Text, SmartLink, Badge } from "@once-ui-system/core";
import { person } from "@/resources";
import { formatDate } from "@/utils/formatDate";

interface BookCardProps {
  title: string;
  subtitle?: string;
  description: React.ReactNode;
  cover?: string;
  pages?: number;
  publishedAt?: string;
  pdf?: string;
  link?: string;
}

export default function BookCard({
  title,
  subtitle,
  description,
  cover,
  pages,
  publishedAt,
  pdf,
  link,
}: BookCardProps) {
  return (
    <Card
      fillWidth
      transition="micro-medium"
      direction="row"
      border="transparent"
      background="transparent"
      padding="4"
      radius="l-4"
      gap="24"
      s={{ direction: "column" }}
    >
      {cover && (
        <Media
          priority
          sizes="(max-width: 768px) 100vw, 300px"
          border="neutral-alpha-weak"
          radius="l"
          src={cover}
          alt={`Cover of ${title}`}
          aspectRatio="3 / 4"
          style={{ minWidth: "220px", maxWidth: "260px" }}
        />
      )}
      <Column fillWidth maxWidth={40} paddingY="24" paddingX="l" gap="20" vertical="center">
        <Row gap="12" wrap vertical="center">
          <Badge
            background="brand-alpha-weak"
            paddingX="12"
            paddingY="4"
            onBackground="neutral-strong"
            textVariant="label-default-s"
            arrow={false}
          >
            Pinned
          </Badge>
          {publishedAt && (
            <Text variant="body-default-xs" onBackground="neutral-weak">
              {formatDate(publishedAt, false)}
            </Text>
          )}
          {pages && (
            <Text variant="body-default-xs" onBackground="neutral-weak">
              {pages} pages
            </Text>
          )}
        </Row>
        <Column gap="8">
          <Text variant="heading-strong-l" wrap="balance">
            {title}
          </Text>
          {subtitle && (
            <Text variant="heading-default-xs" onBackground="neutral-weak">
              {subtitle}
            </Text>
          )}
        </Column>
        {description && (
          <Text variant="body-default-s" onBackground="neutral-weak" wrap="balance">
            {description}
          </Text>
        )}
        <Row gap="24" wrap>
          {pdf && (
            <SmartLink
              suffixIcon="arrowUpRightFromSquare"
              style={{ margin: "0", width: "fit-content" }}
              href={pdf}
            >
              <Text variant="body-default-s">Read the book</Text>
            </SmartLink>
          )}
          {link && (
            <SmartLink
              suffixIcon="arrowUpRightFromSquare"
              style={{ margin: "0", width: "fit-content" }}
              href={link}
            >
              <Text variant="body-default-s">Open in Google Drive</Text>
            </SmartLink>
          )}
        </Row>
        <Row gap="24" vertical="center" paddingTop="8">
          <Text variant="body-default-xs" onBackground="neutral-weak">
            by {person.name}
          </Text>
        </Row>
      </Column>
    </Card>
  );
}
