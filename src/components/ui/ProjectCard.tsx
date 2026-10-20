'use client';
import { ProjectType } from '@/lib/types';
import { blurImageURL } from '@/lib/utils/config';

import { Icon } from '@iconify/react';
import { motion, MotionProps } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface Props extends ProjectType, MotionProps {
  onMoreInfo?: (project: ProjectType) => void;
}

const ProjectCard = ({
  id,
  name,
  url,
  repo,
  year,
  img,
  video,
  tags,
  description,
  features,
  onMoreInfo,
  ...rest
}: Props) => {
  // To avoid hydration failed error
  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  return domLoaded ? (
    <motion.div {...rest} className="w-full max-w-[350px]">
      <div
        onClick={(e) => {
          // Don't run this if the clicked target is an anchor or button element
          if ((e.target as HTMLElement).closest('a, button')) return;
          window.open(url);
        }}
        className="block w-full overflow-hidden transition-all duration-200 rounded-md shadow-xl cursor-pointer group bg-bg-secondary dark:shadow-2xl"
      >
        <div className="overflow-hidden h-[200px]">
          {video ? (
            <video
              src={video}
              poster={img}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              className="object-cover w-full h-full transition-all duration-300 group-hover:scale-110 group-focus-visible:scale-110"
            />
          ) : (
            <Image
              src={img}
              alt={name}
              width={300}
              height={300}
              placeholder="blur"
              blurDataURL={blurImageURL}
              className="object-cover w-full h-full transition-all duration-300 group-hover:scale-110 group-focus-visible:scale-110"
            />
          )}
        </div>
        <div className="p-4 py-3 space-y-1">
          <div className="flex items-center justify-between">
            <p className="font-mono text-xs text-left capitalize">
              {tags.join(' | ')}
            </p>
            <div className="flex items-center space-x-1.5">
              {repo && (
                <a href={repo} className="block" target="_blank">
                  <Icon icon="tabler:brand-github" width={20} height={20} />
                </a>
              )}
              <a href={url} className="block" target="_blank">
                <Icon icon="ci:external-link" width={22} height={22} />
              </a>
            </div>
          </div>
          <h4 className="flex justify-between font-medium capitalize duration-200 group-hover:text-accent">
            <span>{name}</span>
            <span className="mr-1">{year}</span>
          </h4>
          {onMoreInfo && (
            <button
              type="button"
              onClick={() =>
                onMoreInfo({
                  id,
                  name,
                  url,
                  repo,
                  year,
                  img,
                  video,
                  tags,
                  description,
                  features,
                })
              }
              className="inline-flex items-center gap-1 font-mono text-xs capitalize duration-200 cursor-pointer text-accent hover:underline"
            >
              <Icon icon="tabler:info-circle" width={14} height={14} />
              more info
            </button>
          )}
        </div>
      </div>
    </motion.div>
  ) : (
    <></>
  );
};

export default ProjectCard;
