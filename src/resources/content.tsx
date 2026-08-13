import {
  About,
  Blog,
  Gallery,
  Home,
  Newsletter,
  Person,
  Social,
  Work,
} from "@/types";
import { Row, Text } from "@once-ui-system/core";

const person: Person = {
  firstName: "Galanda",
  lastName: "John Sweya",
  name: `Galanda John Sweya`,
  role: "Software Engineer",
  avatar: "/images/avatar.jpg",
  email: "sweya.galanda@gmail.com",
  location: "Africa/Dar_es_Salaam", // Expecting the IANA time zone identifier, e.g., 'Europe/Vienna'
  languages: ["English", "Swahili"], // optional: Leave the array empty if you don't want to display languages
  locale: "en", // BCP 47 language tag for the HTML lang attribute, e.g., 'en', 'ja', 'zh-TW'
};

const newsletter: Newsletter = {
  display: false,
  title: <>Subscribe to {person.firstName}'s Newsletter</>,
  description: <>My weekly newsletter about creativity and engineering</>,
};

const social: Social = [
  // Links are automatically displayed.
  // Import new icons in /resources/icons.ts
  // Set essentials: true for links you want to show on the about page
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/Gsweya",
    essential: true,
  },
  {
    name: "Email",
    icon: "email",
    link: `mailto:${person.email}`,
    essential: true,
  },
  {
    name: "Instagram",
    icon: "instagram",
    link: "https://instagram.com/gamicsprime",
    essential: false,
  },
];

const home: Home = {
  path: "/",
  image: "/images/og/home.jpg",
  label: "Home",
  title: `${person.name}'s Portfolio`,
  description: `Portfolio website showcasing my work as a ${person.role}`,
  headline: <>Technology shapes the way we live</>,
  featured: {
    display: true,
    title: (
      <Row gap="12" vertical="center">
        <strong className="ml-4">Xhubantu</strong>{" "}
        <Text marginRight="4" onBackground="brand-medium">
          Featured work
        </Text>
      </Row>
    ),
    href: "/work/xhubantu",
  },
  subline: (
    <>
      I'm {person.firstName}, a {person.role.toLowerCase()} at{" "}
      <Text as="span" size="xl" weight="strong">Xhubantu</Text>, where I build event-based social
      software. Every line of code is an argument for how the future should function.
    </>
  ),
};

const about: About = {
  path: "/about",
  label: "About",
  title: `About – ${person.name}`,
  description: `Meet ${person.name}, ${person.role} from Tanzania`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: false,
    link: "https://cal.com",
  },
  intro: {
    display: true,
    title: "A Personal Note",
    description: (
      <>
        I prefer to see the world in its practical and often difficult reality rather than through
        idealized or imaginary expectations, that it is a construction that has come from the choice
        of us humans. Because through that I can answer why I do what I do, as I do it to create
        personal fulfilment through solving problems for other people through the skills I have
        acquired. I like working with difficult challenges, learning through failure, and
        continuously growing with my skills to retain long value.
      </>
    ),
  },
  personalInfo: {
    display: true,
    title: "Personal Information",
    items: [
      { label: "Full Name", value: "Galanda John Sweya" },
      { label: "Date of Birth", value: "8 April 2006" },
      { label: "Place of Birth", value: "Mwanza, Tanzania" },
      { label: "Home Region", value: "Simiyu" },
      { label: "Nationality", value: "Tanzanian" },
      { label: "Languages", value: "English, Swahili" },
    ],
  },
  work: {
    display: true, // set to false to hide this section
    title: "Work Experience",
    experiences: [
      {
        company: "Xhubantu",
        timeframe: "2025 - Present",
        role: "Co-founder & Developer",
        achievements: [
          <>
            Building an event-based social networking platform bringing together event discovery,
            ticketing, and content media sharing into one hub.
          </>,
          <>
            Founded on the belief that the next wave of social media will be event apps that enable
            people to connect in physical and genuine meetups.
          </>,
        ],
        images: [],
      },
      {
        company: "Codert",
        timeframe: "2025",
        role: "Backend Developer",
        achievements: [
          <>
            Developed a coding platform for students to automate grading during first-year
            industrial practical training at UDOM.
          </>,
          <>
            Rewrote the system from Java Servlet to Spring Boot, powering automated grading for C++,
            JavaScript, Java and Python with Supabase and Fly.io.
          </>,
        ],
        images: [],
      },
    ],
  },
  studies: {
    display: true, // set to false to hide this section
    title: "Studies",
    institutions: [
      {
        name: "University of Dodoma",
        description: <>BSc Computer Science (2024 – Present).</>,
      },
      {
        name: "Mzumbe Secondary School",
        description: <>Advanced Level, PCM (2022 – 2024).</>,
      },
      {
        name: "John Merlini Secondary School",
        description: <>O-Level (2018 – 2021).</>,
      },
      {
        name: "Martin Luther Primary School",
        description: <>Primary Education (2015 – 2017).</>,
      },
    ],
  },
  technical: {
    display: true, // set to false to hide this section
    title: "Technical skills",
    skills: [
      {
        title: "Programming Languages",
        description: <>Languages I use to build reliable, secure and scalable software.</>,
        tags: [
          {
            name: "Python",
            icon: "python",
          },
          {
            name: "JavaScript",
            icon: "javascript",
          },
          {
            name: "TypeScript",
            icon: "typescript",
          },
          {
            name: "Java",
            icon: "java",
          },
        ],
        images: [],
      },
      {
        title: "Frameworks & Technologies",
        description: <>The tools and infrastructure I reach for when building real systems.</>,
        tags: [
          {
            name: "Spring Boot",
            icon: "spring",
          },
          {
            name: "React",
            icon: "react",
          },
          {
            name: "REST APIs",
            icon: "openLink",
          },
          {
            name: "Git & GitHub",
            icon: "github",
          },
        ],
        images: [],
      },
      {
        title: "Other Skills",
        description: (
          <>Secondary craft that informs my work and interests.</>
        ),
        tags: [
          {
            name: "Graphics Design",
            icon: "figma",
          },
        ],
        images: [],
      },
    ],
  },
};

const blog: Blog = {
  path: "/blog",
  label: "Writings",
  title: "Writings",
  description: `Essays and reflections on technology, economics, and the nature of work`,
  // Create new blog posts by adding a new .mdx file to app/blog/posts
  // All posts will be listed on the /blog route
};

const work: Work = {
  path: "/work",
  label: "Works",
  title: "Works",
  description: `Projects by ${person.name}`,
  // Create new project pages by adding a new .mdx file to app/work/projects
  // All projects will be listed on the /home and /work routes
};

const gallery: Gallery = {
  path: "/gallery",
  label: "Gallery",
  title: `Photo gallery – ${person.name}`,
  description: `A photo collection by ${person.name}`,
  images: [
    {
      src: "/images/cover-page-web.jpg",
      alt: "Cover page",
      orientation: "horizontal",
    },
  ],
};

export { person, social, newsletter, home, about, blog, work, gallery };