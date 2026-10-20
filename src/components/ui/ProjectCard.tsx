'use client';
import { ProjectType } from '@/lib/types';
import { blurImageURL } from '@/lib/utils/config';

import { Icon } from '@iconify/react';
import { motion, MotionProps } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

const ProjectCard = ({
  name,
  url,
  repo,
  year,
  img,
  video,
  tags,
  ...rest
}: ProjectType & MotionProps) => {
  // To avoid hydration failed error
  const [domLoaded, setDomLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  const playVideo = () => {
    // play() returns a promise that can reject (e.g. if the user
    // leaves before playback starts), so swallow the error
    videoRef.current?.play().catch(() => {});
  };

  const pauseVideo = () => {
    videoRef.current?.pause();
  };

  return domLoaded ? (
    <motion.div {...rest} className="w-full max-w-[350px]">
      <button
        onClick={(e) => {
          // Don't run this if the clicked target is an anchor element
          if ((e.target as HTMLElement).closest('a')) return;
          window.open(url);
        }}
        onMouseEnter={playVideo}
        onMouseLeave={pauseVideo}
        onFocus={playVideo}
        onBlur={pauseVideo}
        className="block w-full overflow-hidden transition-all duration-200 rounded-md shadow-xl group bg-bg-secondary dark:shadow-2xl"
      >
        <div className="overflow-hidden h-[200px]">
          {video ? (
            <video
              ref={videoRef}
              src={video}
              poster={img}
              muted
              loop
              playsInline
              preload="metadata"
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
        </div>
      </button>
    </motion.div>
  ) : (
    <></>
  );
};

export default ProjectCard;
