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
      <main className="flex flex-col items-center gap-16 lg:items-start lg:flex-row">
        <div className="space-y-4 lg:w-3/5">
          <p>
            Hi, my name is Muhammad Muneer, a Junior Web Developer with
            practical experience across the MERN stack and PHP Laravel. I've
            built 4 complete web applications, including role-based platforms
            with secure, JWT-authenticated APIs, and I'm currently deepening my
            software engineering skills through the{' '}
            <Link
              href="https://aptech-education.com.pk/"
              target="_blank"
              className="text-accent"
            >
              APTECH ACCP Prime 2.0
            </Link>{' '}
            track.
          </p>
          <p>
            Fast-forward to today, and I've had the privilege of working at a
            software house -{' '}
            <Link
              href="https://mavatechnologies.com/"
              target="_blank"
              className="text-accent"
            >
              MAVA Technologies
            </Link>
            .
          </p>
          <p>
            My main focus these days is mastering MVC architecture and database
            design while building scalable full-stack applications.
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
