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
import { TechMarquee } from "@/components/TechMarquee";
import { Metadata } from "next";
import { Projects } from "@/components/work/Projects";

const stackIcons: Record<string, string> = {
  "spring boot": "spring",
  spring: "spring",
  go: "go",
  supabase: "supabase",
  "fly.io": "rocket",
  docker: "docker",
  postgresql: "postgresql",
  redis: "redis",
  java: "java",
  javascript: "javascript",
  python: "python",
  react: "react",
  typescript: "typescript",
  "rest apis": "openLink",
  vite: "rocket",
  azampay: "openLink",
  "wati.io": "openLink",
  wati: "openLink",
  twilio: "openLink",
  "beem africa": "openLink",
  beem: "openLink",
  "c++": "document",
  mobile: "document",
  "event infrastructure": "document",
  "rag automations": "openai",
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
    <Column fillWidth>
      <Column as="section" maxWidth="m" horizontal="center" gap="m">
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
        {post.metadata.images.length > 0 && (
          <img
            src={post.metadata.images[0]}
            alt={post.metadata.title}
            width={40}
            height={40}
            style={{ objectFit: "contain", display: "block" }}
          />
        )}
        <Heading variant="display-strong-m">{post.metadata.title}</Heading>
        {post.metadata.type && (
          <Tag
            size="m"
            variant={post.metadata.type === "client" ? "brand" : "neutral"}
            prefixIcon={post.metadata.type === "client" ? "world" : "person"}
            label={post.metadata.type === "client" ? "Client project" : "Personal project"}
          />
        )}
        <Text variant="body-default-xs" onBackground="neutral-weak">
          {post.metadata.publishedAt &&
            `Built ${formatDate(post.metadata.publishedAt).toLowerCase()}`}
        </Text>
      </Column>
      <Row marginBottom="24" horizontal="center">
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
        <Row fillWidth horizontal="center" marginBottom="24">
          <Button href={post.metadata.link} variant="secondary" size="s" arrowIcon>
            Open live site
          </Button>
        </Row>
      )}
      <Column style={{ margin: "auto" }} as="article" maxWidth="xs">
        <CustomMDX source={post.content} />
      </Column>
      <Column fillWidth gap="40" horizontal="center" marginTop="16">
        <Line maxWidth="40" />
        <Heading as="h2" variant="heading-strong-l" marginBottom="24">
          Related projects
        </Heading>
        <Projects exclude={[post.slug]} range={[2]} />
      </Column>
      <ScrollToHash />
      </Column>
      {(post.metadata.stack?.length ?? 0) > 0 && (
        <Column fillWidth gap="m" marginTop="40">
          <Heading as="h2" variant="display-strong-xs" align="center">
            Tech stack
          </Heading>
          <TechMarquee
            items={(post.metadata.stack ?? []).map((s) => ({ name: s, icon: stackIcon(s) }))}
          />
        </Column>
      )}
    </Column>
  );
}
