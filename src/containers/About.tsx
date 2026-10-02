'use client';
import { aboutSection } from '@/lib/content/about';
import { author } from '@/lib/content/portfolio';
import { toId } from '@/lib/utils/helper';

import { AuthorImage, Link, ListItem, Wrapper } from '@/components';

import { getSectionAnimation } from '@/styles/animations';

import { useEffect, useState } from 'react';

const About = () => {
  const { title, img, list } = aboutSection;
  // To avoid hydration error
  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  return domLoaded ? (
  <Wrapper id="about" {...getSectionAnimation}>
  <h2 className="heading-secondary">{title}</h2>

  <main className="flex flex-col items-center gap-16 lg:flex-row lg:items-start">
    <div className="space-y-4 lg:w-3/5">
      <p>
        Hi, I'm <b>Muhammad Muneer</b>, a full-stack web developer who enjoys
        building clean, secure, and reliable web applications.
      </p>

      <p>
        I work primarily with the MERN stack and Laravel, turning ideas
        into practical applications with thoughtful architecture and
        well-structured code.
      </p>

      <p>
        I've gained hands-on experience working in a software house at{' '}
        <Link
          href="https://mavatechnologies.com/"
          target="_blank"
          className="text-accent"
        >
          MAVA Technologies
        </Link>
        , while continuing to strengthen my software engineering skills
        through the{' '}
        <Link
          href="https://aptech-education.com.pk/"
          target="_blank"
          className="text-accent"
        >
          APTECH ACCP Prime 2.0
        </Link>{' '}
        program.
      </p>

      <p>
        I'm currently focused on writing better code, designing scalable
        systems, and growing as a well-rounded software engineer.
      </p>

      {list && (
        <>
          <p>{list.title}</p>
          <ul className="grid w-2/3 grid-cols-2 gap-1 text-sm">
            {list.items.map((item) => (
              <ListItem key={toId(item)}>{item}</ListItem>
            ))}
          </ul>
        </>
      )}
    </div>

    <AuthorImage src={img} alt={author.name} />
  </main>
</Wrapper>
  ) : (
    <></>
  );
};

export default About;
