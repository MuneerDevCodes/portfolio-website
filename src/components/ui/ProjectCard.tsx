'use client';
import useShineSweep from '@/lib/hooks/use-shine-sweep';
import { ProjectType } from '@/lib/types';
import { blurImageURL } from '@/lib/utils/config';

import { Icon } from '@iconify/react';
import { motion, MotionProps } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

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
  const [isVideoVisible, setIsVideoVisible] = useState(false);
  const [showVideoControls, setShowVideoControls] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const shineRef = useRef<HTMLDivElement>(null);

  useShineSweep(shineRef);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    if (!('IntersectionObserver' in window)) {
      setIsVideoVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        setIsVideoVisible(entry.isIntersecting);
        if (!entry.isIntersecting) {
          videoElement.pause();
          return;
        }

        videoElement.preload = 'metadata';
        videoElement.play().catch((error: unknown) => {
          if (!(error instanceof DOMException && error.name === 'AbortError')) {
            setShowVideoControls(true);
          }
        });
      },
      { rootMargin: '200px 0px' }
    );

    observer.observe(videoElement);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div {...rest} className="w-full max-w-[350px]">
      <div
        ref={shineRef}
        onClick={(e) => {
          // Don't run this if the clicked target is an anchor or button element
          if ((e.target as HTMLElement).closest('a, button, video[controls]'))
            return;
          window.open(url);
        }}
        className="shine-sweep block w-full overflow-hidden transition-all duration-200 rounded-md shadow-xl cursor-pointer group bg-bg-secondary dark:shadow-2xl"
      >
        <div className="overflow-hidden h-[200px]">
          {video ? (
            <video
              ref={videoRef}
              src={video}
              poster={img}
              autoPlay={isVideoVisible}
              muted
              loop
              playsInline
              controls={showVideoControls}
              preload={isVideoVisible ? 'metadata' : 'none'}
              className="object-cover w-full h-full transition-all duration-300 group-hover:scale-110 group-focus-visible:scale-110"
            />
          ) : (
            <Image
              src={img}
              alt={name}
              width={300}
              height={300}
              sizes="(max-width: 350px) 100vw, 350px"
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
  );
};

export default ProjectCard;
