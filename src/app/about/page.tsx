import {
  Avatar,
  Button,
  Column,
  Heading,
  Icon,
  IconButton,
  Media,
  Tag,
  Text,
  Meta,
  Schema,
  Row,
} from "@once-ui-system/core";
import { baseURL, about, person, social } from "@/resources";
import { AboutTabs } from "@/components/about/AboutTabs";
import { TechMarquee } from "@/components/TechMarquee";
import styles from "@/components/about/about.module.scss";
import React from "react";

export async function generateMetadata() {
  return Meta.generate({
    title: about.title,
    description: about.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(about.title)}`,
    path: about.path,
  });
}

export default function About() {
  const stackItems = (about.technical.skills ?? []).flatMap((skill) =>
    (skill.tags ?? []).map((tag) => ({ name: tag.name, icon: tag.icon })),
  );

  const tabs: { id: string; label: string; content: React.ReactNode }[] = [];

  if (about.intro.display) {
    tabs.push({
      id: "note",
      label: about.intro.title,
      content: (
        <Column fillWidth gap="m" paddingY="8">
          <Text variant="body-default-l">{about.intro.description}</Text>
        </Column>
      ),
    });
  }

  if (about.personalInfo.display) {
    tabs.push({
      id: "info",
      label: about.personalInfo.title,
      content: (
        <Column fillWidth gap="l" paddingY="8">
          {about.personalInfo.items.map((item, index) => (
            <Row key={`${item.label}-${index}`} fillWidth horizontal="between" gap="l">
              <Text variant="heading-strong-l" onBackground="neutral-weak">
                {item.label}
              </Text>
              <Text variant="body-default-l">{item.value}</Text>
            </Row>
          ))}
        </Column>
      ),
    });
  }

  if (about.interests?.display) {
    tabs.push({
      id: "interests",
      label: about.interests.title,
      content: (
        <Column fillWidth gap="m" paddingY="8">
          <Row wrap gap="8">
            {about.interests.items.map((item, index) => (
              <Tag key={`${item.value}-${index}`} size="l">
                {item.value}
              </Tag>
            ))}
          </Row>
        </Column>
      ),
    });
  }

  if (about.work.display) {
    tabs.push({
      id: "work",
      label: about.work.title,
      content: (
        <Column fillWidth gap="l" paddingY="8">
          {about.work.experiences.map((experience, index) => (
            <Column key={`${experience.company}-${experience.role}-${index}`} fillWidth>
              <Row fillWidth horizontal="between" vertical="end" marginBottom="4">
                <Text variant="heading-strong-l">{experience.company}</Text>
                <Text variant="heading-default-xs" onBackground="neutral-weak">
                  {experience.timeframe}
                </Text>
              </Row>
              <Text variant="body-default-s" onBackground="brand-weak" marginBottom="m">
                {experience.role}
              </Text>
              <Column as="ul" gap="16">
                {experience.achievements.map(
                  (achievement: React.ReactNode, index: number) => (
                    <Text
                      as="li"
                      variant="body-default-m"
                      key={`${experience.company}-${index}`}
                    >
                      {achievement}
                    </Text>
                  ),
                )}
              </Column>
              {experience.images && experience.images.length > 0 && (
                <Row fillWidth paddingTop="m" paddingLeft="40" gap="12" wrap>
                  {experience.images.map((image, index) => (
                    <Row
                      key={index}
                      border="neutral-medium"
                      radius="m"
                      minWidth={image.width}
                      height={image.height}
                    >
                      <Media
                        enlarge
                        radius="m"
                        sizes={image.width.toString()}
                        alt={image.alt}
                        src={image.src}
                      />
                    </Row>
                  ))}
                </Row>
              )}
            </Column>
          ))}
        </Column>
      ),
    });
  }

  if (about.studies.display) {
    tabs.push({
      id: "education",
      label: about.studies.title,
      content: (
        <Column fillWidth paddingY="8">
          <Row
            fillWidth
            paddingY="m"
            paddingX="s"
            borderBottom="neutral-medium"
            gap="l"
            horizontal="between"
          >
            <Text variant="label-strong-s" onBackground="neutral-weak">
              Institution
            </Text>
            <Text variant="label-strong-s" onBackground="neutral-weak">
              Details
            </Text>
          </Row>
          {about.studies.institutions.map((institution, index) => (
            <Row
              key={`${institution.name}-${index}`}
              fillWidth
              paddingY="m"
              paddingX="s"
              borderBottom="neutral-alpha-medium"
              gap="l"
              horizontal="between"
              vertical="center"
            >
              <Text variant="body-default-m">{institution.name}</Text>
              <Text variant="body-default-m" onBackground="neutral-weak">
                {institution.description}
              </Text>
            </Row>
          ))}
        </Column>
      ),
    });
  }

  return (
    <Column fillWidth>
      <Column maxWidth="m">
        <Schema
          as="webPage"
          baseURL={baseURL}
          title={about.title}
          description={about.description}
          path={about.path}
          image={`/api/og/generate?title=${encodeURIComponent(about.title)}`}
          author={{
            name: person.name,
            url: `${baseURL}${about.path}`,
            image: `${baseURL}${person.avatar}`,
          }}
        />
        <Row fillWidth s={{ direction: "column"}} horizontal="center">
          {about.avatar.display && (
            <Column
              className={styles.avatar}
              top="64"
              fitHeight
              position="sticky"
              s={{ position: "relative", style: { top: "auto" } }}
              xs={{ style: { top: "auto" } }}
              minWidth="160"
              paddingX="l"
              paddingBottom="xl"
              gap="m"
              flex={3}
              horizontal="center"
            >
              <Avatar src={person.avatar} size="xl" />
              <Row gap="8" vertical="center">
                <Icon onBackground="accent-weak" name="globe" />
                {person.displayLocation ?? person.location}
              </Row>
              {person.languages && person.languages.length > 0 && (
                <Row wrap gap="8">
                  {person.languages.map((language, index) => (
                    <Tag key={index} size="l">
                      {language}
                    </Tag>
                  ))}
                </Row>
              )}
            </Column>
          )}
          <Column className={styles.blockAlign} flex={9} maxWidth={40}>
            <Column
              fillWidth
              minHeight="160"
              vertical="center"
              marginBottom="32"
            >
              {about.calendar.display && (
                <Row
                  fitWidth
                  border="brand-alpha-medium"
                  background="brand-alpha-weak"
                  radius="full"
                  padding="4"
                  gap="8"
                  marginBottom="m"
                  vertical="center"
                  className={styles.blockAlign}
                  style={{
                    backdropFilter: "blur(var(--static-space-1))",
                  }}
                >
                  <Icon paddingLeft="12" name="calendar" onBackground="brand-weak" />
                  <Row paddingX="8">Schedule a call</Row>
                  <IconButton
                    href={about.calendar.link}
                    data-border="rounded"
                    variant="secondary"
                    icon="chevronRight"
                  />
                </Row>
              )}
              <Heading className={styles.textAlign} variant="display-strong-xl">
                {person.name}
              </Heading>
              <Text
                className={styles.textAlign}
                variant="display-default-xs"
                onBackground="neutral-weak"
              >
                {person.role}
              </Text>
              {social.length > 0 && (
                <Row
                  className={styles.blockAlign}
                  paddingTop="20"
                  paddingBottom="8"
                  gap="8"
                  wrap
                  horizontal="center"
                  fitWidth
                  data-border="rounded"
                >
                  {social
                    .filter((item) => item.essential)
                    .map(
                      (item) =>
                        item.link && (
                          <React.Fragment key={item.name}>
                            <Row s={{ hide: true }}>
                              <Button
                                key={item.name}
                                href={item.link}
                                prefixIcon={item.icon}
                                label={item.name}
                                size="s"
                                weight="default"
                                variant="secondary"
                              />
                            </Row>
                            <Row hide s={{ hide: false }}>
                              <IconButton
                                size="l"
                                key={`${item.name}-icon`}
                                href={item.link}
                                icon={item.icon}
                                variant="secondary"
                              />
                            </Row>
                          </React.Fragment>
                        ),
                    )}
                </Row>
              )}
            </Column>

            <AboutTabs tabs={tabs} />
          </Column>
        </Row>
      </Column>
      {about.technical.display && stackItems.length > 0 && (
        <Column fillWidth gap="m" marginTop="40">
          <Heading as="h2" variant="display-strong-s" align="center">
            Technologies I work with
          </Heading>
          <TechMarquee items={stackItems} />
        </Column>
      )}
    </Column>
  );
}