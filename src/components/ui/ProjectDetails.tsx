'use client';
import { ProjectType } from '@/lib/types';
import { blurImageURL } from '@/lib/utils/config';

import Button from '@/components/buttons/Button';
import Wrapper from '@/components/ui/Wrapper';

import { getSectionAnimation } from '@/styles/animations';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface Props {
  project: ProjectType;
}

const ProjectDetails = ({ project }: Props) => {
  const { name, url, repo, year, img, video, tags, description, features } =
    project;

  // To avoid hydration failed error
  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  return domLoaded ? (
    <Wrapper animate={false} {...getSectionAnimation}>
      <motion.div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <p className="mb-2 font-mono text-xs capitalize text-accent">
            {year} · project details
          </p>
          <h1 className="heading-secondary !mb-0">{name}</h1>
        </div>

        <div className="overflow-hidden rounded-md shadow-xl bg-bg-secondary">
          {video ? (
            <video
              src={video}
              poster={img}
              autoPlay
              muted
              loop
              playsInline
              controls
              preload="auto"
              className="object-cover w-full h-[240px] sm:h-[420px]"
            />
          ) : (
            <Image
              src={img}
              alt={name}
              width={720}
              height={480}
              placeholder="blur"
              blurDataURL={blurImageURL}
              className="object-cover w-full h-[240px] sm:h-[420px]"
            />
          )}
        </div>

        <div className="mt-6 space-y-6">
          <p className="flex flex-wrap items-center gap-x-5 gap-y-1 font-mono text-xs capitalize sm:text-sm text-accent">
            {tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </p>

          <p className="leading-7 text-dark-1">{description}</p>

          {features && features.length > 0 && (
            <div>
              <p className="mb-3 font-mono text-xs capitalize text-accent">
                features / achievements
              </p>
              <ul className="space-y-2 list-disc list-inside text-dark-1">
                {features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex flex-wrap items-center gap-4">
            <Button type="link" href="/" sameTab size="sm">
              back to home
            </Button>
            {repo && (
              <Button type="link" href={repo} size="sm">
                github repo
              </Button>
            )}
            <Button type="link" href={url} size="sm">
              live site
            </Button>
          </div>
        </div>
      </motion.div>
    </Wrapper>
  ) : (
    <></>
  );
};

export default ProjectDetails;