import { notFound } from "next/navigation";
import { getPosts } from "@/utils/utils";
import {
  Meta,
  Schema,
  AvatarGroup,
  Button,
  Column,
  Flex,
  Heading,
  Media,
  Text,
  SmartLink,
  Row,
  Avatar,
  Line,
  Tag,
} from "@once-ui-system/core";
import { baseURL, about, person, work } from "@/resources";
import { formatDate } from "@/utils/formatDate";
import { ScrollToHash, CustomMDX } from "@/components";
import { Metadata } from "next";
import { Projects } from "@/components/work/Projects";

function domainOf(url: string): string {
  try {
    return new URL(url).hostname;
  } catch {
    return url;
  }
}

const stackIcons: Record<string, string> = {
  "spring boot": "spring",
  spring: "spring",
  supabase: "supabase",
  "fly.io": "rocket",
  java: "java",
  javascript: "javascript",
  python: "python",
  react: "react",
  typescript: "typescript",
  "rest apis": "openLink",
  "c++": "document",
  mobile: "document",
  "event infrastructure": "document",
};

function stackIcon(name: string): string {
  return stackIcons[name.toLowerCase()] || "document";
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const posts = getPosts(["src", "app", "work", "projects"]);
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string | string[] }>;
}): Promise<Metadata> {
  const routeParams = await params;
  const slugPath = Array.isArray(routeParams.slug)
    ? routeParams.slug.join("/")
    : routeParams.slug || "";

  const posts = getPosts(["src", "app", "work", "projects"]);
  let post = posts.find((post) => post.slug === slugPath);

  if (!post) return {};

  return Meta.generate({
    title: post.metadata.title,
    description: post.metadata.summary,
    baseURL: baseURL,
    image: post.metadata.image || `/api/og/generate?title=${post.metadata.title}`,
    path: `${work.path}/${post.slug}`,
  });
}

export default async function Project({
  params,
}: {
  params: Promise<{ slug: string | string[] }>;
}) {
  const routeParams = await params;
  const slugPath = Array.isArray(routeParams.slug)
    ? routeParams.slug.join("/")
    : routeParams.slug || "";

  let post = getPosts(["src", "app", "work", "projects"]).find((post) => post.slug === slugPath);

  if (!post) {
    notFound();
  }

  const avatars =
    post.metadata.team?.map((person) => ({
      src: person.avatar,
    })) || [];

  return (
    <Column as="section" maxWidth="m" horizontal="center" gap="l">
      <Schema
        as="blogPosting"
        baseURL={baseURL}
        path={`${work.path}/${post.slug}`}
        title={post.metadata.title}
        description={post.metadata.summary}
        datePublished={post.metadata.publishedAt}
        dateModified={post.metadata.publishedAt}
        image={
          post.metadata.image || `/api/og/generate?title=${encodeURIComponent(post.metadata.title)}`
        }
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <Column maxWidth="s" gap="16" horizontal="center" align="center">
        <SmartLink href="/work">
          <Text variant="label-strong-m">Projects</Text>
        </SmartLink>
        <Text variant="body-default-xs" onBackground="neutral-weak" marginBottom="12">
          {post.metadata.publishedAt && formatDate(post.metadata.publishedAt)}
        </Text>
        <Heading variant="display-strong-m">{post.metadata.title}</Heading>
      </Column>
      <Row marginBottom="32" horizontal="center">
        <Row gap="16" vertical="center">
          {post.metadata.team && <AvatarGroup reverse avatars={avatars} size="s" />}
          <Text variant="label-default-m" onBackground="brand-weak">
            {post.metadata.team?.map((member, idx) => (
              <span key={idx}>
                {idx > 0 && (
                  <Text as="span" onBackground="neutral-weak">
                    ,{" "}
                  </Text>
                )}
                <SmartLink href={member.linkedIn}>{member.name}</SmartLink>
              </span>
            ))}
          </Text>
        </Row>
      </Row>
      {post.metadata.link && (
        <Column fillWidth gap="m" marginBottom="32">
          <Row fillWidth horizontal="between" vertical="center" gap="m" wrap>
            <Row gap="12" vertical="center">
              <img
                src={`https://www.google.com/s2/favicons?domain=${domainOf(post.metadata.link)}&sz=64`}
                alt=""
                width={28}
                height={28}
                style={{ borderRadius: 6, flexShrink: 0 }}
              />
              <Text variant="label-strong-m">Live preview</Text>
            </Row>
            <Button href={post.metadata.link} variant="secondary" size="s" arrowIcon>
              Open live site
            </Button>
          </Row>
          {post.metadata.preview !== false ? (
            <div
              style={{
                position: "relative",
                width: "100%",
                height: 480,
                overflow: "hidden",
                borderRadius: "var(--radius-m)",
                border: "1px solid var(--neutral-alpha-medium)",
              }}
            >
              <iframe
                src={post.metadata.link}
                title={`${post.metadata.title} live preview`}
                style={{ width: "100%", height: "100%", border: "none" }}
                loading="lazy"
                sandbox="allow-scripts allow-same-origin allow-forms"
                referrerPolicy="no-referrer"
              />
            </div>
          ) : (
            <Column
              fillWidth
              gap="m"
              padding="xl"
              border="neutral-alpha-medium"
              radius="m"
              background="neutral-alpha-weak"
              align="center"
            >
              <Text variant="body-default-m" onBackground="neutral-weak">
                This site blocks in-page previews, but it&apos;s live — open it to explore.
              </Text>
            </Column>
          )}
        </Column>
      )}
      {post.metadata.images.length > 0 && (
        <Media priority aspectRatio="16 / 9" radius="m" alt="image" src={post.metadata.images[0]} />
      )}
      <Column style={{ margin: "auto" }} as="article" maxWidth="xs">
        <CustomMDX source={post.content} />
      </Column>
      {(post.metadata.stack?.length ?? 0) > 0 && (
        <Column fillWidth gap="m" marginTop="32">
          <Heading as="h2" variant="display-strong-xs">
            Stack
          </Heading>
          <Row wrap gap="8">
            {post.metadata.stack?.map((s) => (
              <Tag key={s} size="l" prefixIcon={stackIcon(s)}>
                {s}
              </Tag>
            ))}
          </Row>
        </Column>
      )}
      <Column fillWidth gap="40" horizontal="center" marginTop="40">
        <Line maxWidth="40" />
        <Heading as="h2" variant="heading-strong-xl" marginBottom="24">
          Related projects
        </Heading>
        <Projects exclude={[post.slug]} range={[2]} />
      </Column>
      <ScrollToHash />
    </Column>
  );
}
