import { Column, Heading, Meta, Schema } from "@once-ui-system/core";
import { Mailchimp } from "@/components";
import { Posts } from "@/components/blog/Posts";
import BookCard from "@/components/blog/BookCard";
import { baseURL, blog, person, newsletter } from "@/resources";

export async function generateMetadata() {
  return Meta.generate({
    title: blog.title,
    description: blog.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(blog.title)}`,
    path: blog.path,
  });
}

export default function Blog() {
  return (
    <Column maxWidth="m" paddingTop="24">
      <Schema
        as="blogPosting"
        baseURL={baseURL}
        title={blog.title}
        description={blog.description}
        path={blog.path}
        image={`/api/og/generate?title=${encodeURIComponent(blog.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}/blog`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <Heading marginBottom="l" variant="heading-strong-xl" marginLeft="24">
        {blog.title}
      </Heading>
      {blog.books && blog.books.length > 0 && (
        <Column fillWidth flex={1} gap="m" marginBottom="40">
          <Heading as="h2" variant="heading-strong-xl" marginLeft="l">
            Books
          </Heading>
          {blog.books.map((book) => (
            <BookCard
              key={book.title}
              title={book.title}
              subtitle={book.subtitle}
              description={book.description}
              cover={book.cover}
              pages={book.pages}
              publishedAt={book.publishedAt}
              pdf={book.pdf}
              link={book.link}
            />
          ))}
        </Column>
      )}
      <Column fillWidth flex={1} gap="40">
        <Heading as="h2" variant="heading-strong-xl" marginLeft="l">
          Articles
        </Heading>
        <Posts range={[1, 1]} thumbnail />
        <Posts range={[2, 3]} columns="2" thumbnail direction="column" />
        <Mailchimp marginBottom="l" />
        <Heading as="h2" variant="heading-strong-xl" marginLeft="l">
          Earlier posts
        </Heading>
        <Posts range={[4]} columns="2" />
      </Column>
    </Column>
  );
}
