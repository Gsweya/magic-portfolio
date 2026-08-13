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
  Accordion,
} from "@once-ui-system/core";
import { baseURL, about, person, social } from "@/resources";
import TableOfContents from "@/components/about/TableOfContents";
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
  const structure = [
    {
      title: about.intro.title,
      display: about.intro.display,
      items: [],
    },
    {
      title: about.personalInfo.title,
      display: about.personalInfo.display,
      items: about.personalInfo.items.map((item) => item.label),
    },
    {
      title: about.technical.title,
      display: about.technical.display,
      items: about.technical.skills.flatMap((skill) => (skill.tags ?? []).map((tag) => tag.name)),
    },
    {
      title: about.interests?.title ?? "",
      display: about.interests?.display ?? false,
      items: about.interests?.items.map((item) => item.value) ?? [],
    },
    {
      title: about.work.title,
      display: about.work.display,
      items: about.work.experiences.map((experience) => experience.company),
    },
    {
      title: about.studies.title,
      display: about.studies.display,
      items: about.studies.institutions.map((institution) => institution.name),
    },
    {
      title: about.references?.title ?? "",
      display: about.references?.display ?? false,
      items: about.references?.items.map((item) => item.label) ?? [],
    },
  ];

  const stackItems = (about.technical.skills ?? []).flatMap((skill) =>
    (skill.tags ?? []).map((tag) => ({ name: tag.name, icon: tag.icon })),
  );
  const interestItems = (about.interests?.items ?? []).map((item) => item.value);
  return (
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
      {about.tableOfContent.display && (
        <Column
          left="0"
          style={{ top: "50%", transform: "translateY(-50%)" }}
          position="fixed"
          paddingLeft="24"
          gap="32"
          s={{ hide: true }}
        >
          <TableOfContents structure={structure} about={about} />
        </Column>
      )}
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
            id={about.intro.title}
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

          {(about.technical.display || about.interests?.display) && (
            <Row fillWidth wrap gap="xl" marginBottom="xl" vertical="start" s={{ direction: "column" }}>
              {about.technical.display && (
                <Column flex={1} gap="m">
                  <Heading as="h2" id={about.technical.title} variant="heading-strong-m">
                    {about.technical.title}
                  </Heading>
                  <Row wrap gap="8">
                    {stackItems.map((item, index) => (
                      <Tag key={`${item.name}-${index}`} size="l" prefixIcon={item.icon}>
                        {item.name}
                      </Tag>
                    ))}
                  </Row>
                </Column>
              )}
              {about.interests?.display && (
                <Column flex={1} gap="m">
                  <Heading as="h2" id={about.interests.title} variant="heading-strong-m">
                    {about.interests.title}
                  </Heading>
                  <Row wrap gap="8">
                    {interestItems.map((value, index) => (
                      <Tag key={`${value}-${index}`} size="l">
                        {value}
                      </Tag>
                    ))}
                  </Row>
                </Column>
              )}
            </Row>
          )}

          {about.intro.display && (
            <Column fillWidth gap="m" marginBottom="m">
              <Accordion
                id={about.intro.title}
                title={about.intro.title}
                size="m"
                radius="l"
                open={false}
              >
                <Column paddingY="8" gap="m" textVariant="body-default-l">
                  {about.intro.description}
                </Column>
              </Accordion>
            </Column>
          )}

          {about.personalInfo.display && (
            <Column fillWidth gap="m" marginBottom="40">
              <Accordion
                id={about.personalInfo.title}
                title={about.personalInfo.title}
                size="m"
                radius="l"
                open={false}
              >
                <Column fillWidth gap="l" paddingY="8">
                  {about.personalInfo.items.map((item, index) => (
                    <Row key={`${item.label}-${index}`} fillWidth horizontal="between" gap="l">
                      <Text id={item.label} variant="heading-strong-l" onBackground="neutral-weak">
                        {item.label}
                      </Text>
                      <Text variant="body-default-l">{item.value}</Text>
                    </Row>
                  ))}
                </Column>
              </Accordion>
            </Column>
          )}

          {about.references?.display && (
            <>
              <Heading as="h2" id={about.references.title} variant="display-strong-s" marginBottom="m">
                {about.references.title}
              </Heading>
              <Column fillWidth gap="l" marginBottom="40">
                {about.references.items.map((item, index) => (
                  <Row key={`${item.label}-${index}`} fillWidth horizontal="between" gap="l">
                    <Text id={item.label} variant="heading-strong-l" onBackground="neutral-weak">
                      {item.label}
                    </Text>
                    <Text variant="body-default-l">{item.value}</Text>
                  </Row>
                ))}
              </Column>
            </>
          )}

          {about.work.display && (
            <>
              <Heading as="h2" id={about.work.title} variant="display-strong-s" marginBottom="m">
                {about.work.title}
              </Heading>
              <Column fillWidth gap="l" marginBottom="40">
                {about.work.experiences.map((experience, index) => (
                  <Column key={`${experience.company}-${experience.role}-${index}`} fillWidth>
                    <Row fillWidth horizontal="between" vertical="end" marginBottom="4">
                      <Text id={experience.company} variant="heading-strong-l">
                        {experience.company}
                      </Text>
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
            </>
          )}

          {about.studies.display && (
            <>
              <Heading as="h2" id={about.studies.title} variant="display-strong-s" marginBottom="m">
                {about.studies.title}
              </Heading>
              <Column fillWidth marginBottom="40">
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
                    <Text id={institution.name} variant="body-default-m">
                      {institution.name}
                    </Text>
                    <Text variant="body-default-m" onBackground="neutral-weak">
                      {institution.description}
                    </Text>
                  </Row>
                ))}
              </Column>
            </>
          )}

          {about.technical.display && stackItems.length > 0 && (
            <Column fillWidth gap="m" marginTop="40">
              <Heading as="h2" variant="display-strong-s" align="center">
                Technologies I work with
              </Heading>
              <TechMarquee items={stackItems} />
            </Column>
          )}
        </Column>
      </Row>
    </Column>
  );
}