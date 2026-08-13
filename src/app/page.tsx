import {
  Heading,
  Text,
  Button,
  Avatar,
  RevealFx,
  Column,
  Badge,
  Row,
  Schema,
  Meta,
  Line,
  SmartLink,
} from "@once-ui-system/core";
import { home, about, blog, work, person, baseURL, routes } from "@/resources";
import { Mailchimp } from "@/components";
import { Logo } from "@/components/Logo";
import { Projects } from "@/components/work/Projects";
import { Posts } from "@/components/blog/Posts";

export async function generateMetadata() {
  return Meta.generate({
    title: home.title,
    description: home.description,
    baseURL: baseURL,
    path: home.path,
    image: home.image,
  });
}

export default function Home() {
  return (
    <Column maxWidth="m" gap="xl" paddingY="12" horizontal="center">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={home.path}
        title={home.title}
        description={home.description}
        image={`/api/og/generate?title=${encodeURIComponent(home.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <Column fillWidth horizontal="center" gap="m">
        <Column maxWidth="s" horizontal="center" align="center">
          <RevealFx translateY="4" fillWidth horizontal="center" paddingBottom="16">
            <Logo width={112} style={{ margin: "0 auto" }} />
          </RevealFx>
          {home.featured.display && (
            <RevealFx
              fillWidth
              horizontal="center"
              paddingTop="16"
              paddingBottom="32"
              paddingLeft="12"
            >
              <Badge
                background="brand-alpha-weak"
                paddingX="12"
                paddingY="4"
                onBackground="neutral-strong"
                textVariant="label-default-s"
                arrow={false}
                href={home.featured.href}
              >
                <Row paddingY="2">{home.featured.title}</Row>
              </Badge>
            </RevealFx>
          )}
          <RevealFx translateY="4" fillWidth horizontal="center" paddingBottom="16">
            <Heading wrap="balance" variant="display-strong-l">
              {home.headline}
            </Heading>
          </RevealFx>
          <RevealFx translateY="8" delay={0.2} fillWidth horizontal="center" paddingBottom="32">
            <Text wrap="balance" onBackground="neutral-weak" variant="heading-default-xl">
              {home.subline}
            </Text>
          </RevealFx>
          <RevealFx paddingTop="12" delay={0.4} horizontal="center" paddingLeft="12">
            <Button
              id="about"
              data-border="rounded"
              href={about.path}
              variant="secondary"
              size="m"
              weight="default"
              arrowIcon
            >
              <Row gap="8" vertical="center" paddingRight="4">
                {about.avatar.display && (
                  <Avatar
                    marginRight="8"
                    style={{ marginLeft: "-0.75rem" }}
                    src={person.avatar}
                    size="m"
                  />
                )}
                {about.title}
              </Row>
            </Button>
          </RevealFx>
        </Column>
      </Column>

      {home.manifesto && home.manifesto.length > 0 && (
        <RevealFx translateY="16" fillWidth>
          <Column fillWidth maxWidth="s" horizontal="center" gap="m" paddingY="xl">
            {home.manifesto.map((paragraph, index) => (
              <Text
                key={index}
                wrap="balance"
                variant="body-default-l"
                onBackground="neutral-weak"
                style={{ lineHeight: 1.7 }}
              >
                {paragraph}
              </Text>
            ))}
          </Column>
        </RevealFx>
      )}

      {routes["/work"] && (
        <RevealFx translateY="16" delay={0.6} fillWidth>
          <Column fillWidth gap="24">
            <Row fillWidth horizontal="between" vertical="center" paddingX="l">
              <Heading as="h2" variant="display-strong-xs">
                Selected Work
              </Heading>
              <SmartLink href={work.path}>
                <Text variant="body-default-m">View all works</Text>
              </SmartLink>
            </Row>
            <Projects range={[1, 1]} />
          </Column>
        </RevealFx>
      )}

      {routes["/blog"] && (
        <Column fillWidth gap="24" marginBottom="l">
          <Row fillWidth paddingRight="64">
            <Line maxWidth={48} />
          </Row>
          <Row fillWidth horizontal="between" vertical="center" paddingX="l" marginTop="40">
            <Heading as="h2" variant="display-strong-xs">
              Recent Writings
            </Heading>
            <SmartLink href={blog.path}>
              <Text variant="body-default-m">View all writings</Text>
            </SmartLink>
          </Row>
          <Row flex={3} paddingX="20">
            <Posts range={[1, 2]} columns="2" thumbnail />
          </Row>
          <Row fillWidth paddingLeft="64" horizontal="end">
            <Line maxWidth={48} />
          </Row>
        </Column>
      )}
      <Mailchimp />
    </Column>
  );
}
