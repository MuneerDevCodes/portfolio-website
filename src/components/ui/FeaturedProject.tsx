import { FeaturedProjectType } from '@/lib/types';
import { blurImageURL } from '@/lib/utils/config';
import { cn } from '@/lib/utils/helper';

import { Icon } from '@iconify/react';
import { motion, MotionProps } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

interface Props extends FeaturedProjectType, MotionProps {
  align?: 'left' | 'right';
}

const FeaturedProject = ({
  img,
  video,
  name,
  url,
  repo,
  description,
  tasks,
  tags,
  align = 'left',
  ...rest
}: Props) => {
  const desktopVideoRef = useRef<HTMLVideoElement>(null);
  const mobileVideoRef = useRef<HTMLVideoElement>(null);
  const [autoplayFailed, setAutoplayFailed] = useState(false);

  useEffect(() => {
    const videos = [desktopVideoRef.current, mobileVideoRef.current].filter(
      (element): element is HTMLVideoElement => element !== null
    );

    if (videos.length === 0) return;

    const playVideo = (element: HTMLVideoElement) => {
      element.muted = true;
      element.play().catch((error: unknown) => {
        if (!(error instanceof DOMException && error.name === 'AbortError')) {
          setAutoplayFailed(true);
        }
      });
    };

    if (!('IntersectionObserver' in window)) {
      videos.forEach(playVideo);
      return () => videos.forEach((element) => element.pause());
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!(entry.target instanceof HTMLVideoElement)) return;

          if (entry.isIntersecting) {
            playVideo(entry.target);
          } else {
            entry.target.pause();
          }
        });
      },
      { threshold: 0.25 }
    );

    videos.forEach((element) => observer.observe(element));

    return () => {
      observer.disconnect();
      videos.forEach((element) => element.pause());
    };
  }, [video]);

  return (
    <>
      <motion.div
        className={cn(
          'relative hidden lg:block  min-h-[280px] sm:min-h-[360px] h-full overflow-hidden lg:overflow-visible rounded-lg lg:rounded-xl shadow-lg lg:shadow-none text-center lg:text-right',
          align === 'left' && 'lg:text-left'
        )}
        {...rest}
      >
        <div
          className={cn(
            'w-full lg:max-w-[60%] absolute inset-0 h-full -z-20 lg:z-0 lg:object-contain rounded overflow-hidden shadow-2xl group',
            align === 'left' && 'ml-auto'
          )}
        >
          {video ? (
            <>
              <video
                ref={desktopVideoRef}
                src={video}
                poster={img}
                controls
                muted
                playsInline
                preload="metadata"
                aria-label={`${name} project video`}
                className="object-cover w-full h-full"
              />
              {autoplayFailed && (
                <p
                  role="status"
                  className="absolute inset-x-3 bottom-3 z-20 rounded bg-black/70 p-2 text-center text-xs text-white"
                >
                  Autoplay unavailable. Press play to watch.
                </p>
              )}
            </>
          ) : (
            <>
              <Image
                src={img}
                alt={name}
                width={720}
                height={480}
                className="object-cover w-full h-full transition-transform duration-200 group-hover:scale-105"
                placeholder="blur"
                blurDataURL={blurImageURL}
              />
              <Link
                href={url}
                target="_blank"
                className="absolute inset-0 z-10 block bg-transparent"
              />
            </>
          )}
        </div>
        <div
          className={cn(
            'lg:max-w-[45%] space-y-2 lg:space-y-5 w-full h-full p-5 lg:p-0',
            'absolute lg:top-1/2 lg:-translate-y-1/2 lg:right-0',
            'lg:h-auto left-0 lg:left-auto top-0 right-auto lg:bg-none lg:text-inherit',
            'flex flex-col justify-end',
            'bg-gradient-to-t from-black/80 group-hover:from-accent group-focus-visible:from-accent',
            align === 'left' && 'lg:left-0'
          )}
        >
          <div>
            <div className="font-mono hidden lg:block text-accent capitalize text-xs lg:mb-2.5">
              featured project
            </div>
            <h2 className="heading-tertiary inline-block !text-white lg:!text-dark-2 !font-semibold lg:!font-normal !normal-case">
              <Link href={url} className="block" target="_blank">
                {name}
              </Link>
            </h2>
          </div>

          <div className="rounded-sm lg:bg-bg-secondary lg:shadow-lg lg:p-5">
            <div
              className={cn(
                'lg:max-w-sm text-dark-1 lg:text-inherit text-sm lg:text-base',
                align === 'right' && 'ml-auto'
              )}
            >
              <p className="text-dark-1">{description}</p>
              <div className="hidden my-3 font-mono text-xs capitalize lg:block text-accent lg:my-2 lg:mt-3">
                tasks / achievements
              </div>
              <div className="hidden text-base lg:block lg:text-sm">
                {tasks}
              </div>
            </div>
          </div>

          <p
            className={cn(
              'font-mono text-[10px] text-accent lg:text-accent lg:text-xs justify-center capitalize flex flex-wrap gap-2 lg:gap-x-5 items-center lg:justify-end',
              align === 'left' && 'lg:justify-start'
            )}
          >
            {tags.map((tag) => (
              <span key={tag.replaceAll(' ', '')}>{tag}</span>
            ))}
          </p>

          {repo && (
            <div
              className={cn(
                'flex lg:justify-end items-center gap-3',
                align === 'left' && 'lg:justify-start'
              )}
            >
              <a href={repo} className="block" target="_blank">
                <Icon icon="tabler:brand-github" width={22} height={22} />
              </a>
              <a href={url} className="block" target="_blank">
                <Icon icon="ci:external-link" width={24} height={24} />
              </a>
            </div>
          )}
        </div>
      </motion.div>

      {/* For mobile */}
      <motion.div
        className={cn(
          'relative lg:hidden min-h-[300px] h-full rounded-xl shadow-lg lg:shadow-none text-center'
        )}
        {...rest}
      >
        {/* Image Header */}
        <header className={cn('relative w-full')}>
          {video ? (
            <>
              <video
                ref={mobileVideoRef}
                src={video}
                poster={img}
                controls
                muted
                playsInline
                preload="metadata"
                aria-label={`${name} project video`}
                className="object-cover w-full h-full"
              />
              {autoplayFailed && (
                <p
                  role="status"
                  className="absolute inset-x-3 bottom-3 z-20 rounded bg-black/70 p-2 text-center text-xs text-white"
                >
                  Autoplay unavailable. Press play to watch.
                </p>
              )}
            </>
          ) : (
            <>
              <Image
                src={img}
                alt={name}
                width={720}
                height={480}
                className="object-cover w-full h-full transition-transform duration-200 group-hover:scale-105"
                placeholder="blur"
                blurDataURL={blurImageURL}
              />
              <Link
                href={url}
                target="_blank"
                className="absolute inset-0 z-10 block bg-transparent"
              />
            </>
          )}
        </header>

        <div className={cn('bg-bg-secondary p-5 space-y-2')}>
          <div>
            {/* <div className="font-mono text-accent capitalize text-xs lg:mb-2.5">
              featured project
            </div> */}
            <h2 className="heading-tertiary !text-white !font-semibold !normal-case">
              <a href={url} className="block" target="_blank">
                {name}
              </a>
            </h2>
          </div>

          <div className={cn('text-dark-1 space-y-2 text-sm')}>
            <p className="text-base text-dark-1">{description}</p>
            <div className="hidden my-3 font-mono text-xs capitalize lg:block text-accent lg:my-2 lg:mt-3">
              tasks / achievements
            </div>
            <div className="mb-2 space-y-1">
              {tasks?.split(',').map((task) => (
                <div key={task.slice(0, 10)}>{task}</div>
              ))}
            </div>
          </div>

          <p
            className={cn(
              'font-mono text-[10px] text-accent lg:text-accent lg:text-xs justify-center capitalize flex flex-wrap gap-2 lg:gap-x-5 items-center lg:justify-end',
              align === 'left' && 'lg:justify-start'
            )}
          >
            {tags.map((tag) => (
              <span key={tag.replaceAll(' ', '')}>{tag}</span>
            ))}
          </p>

          {repo && (
            <div
              className={cn(
                'flex lg:justify-end items-center gap-3',
                align === 'left' && 'lg:justify-start'
              )}
            >
              <a href={repo} className="block duration-200" target="_blank">
                <Icon icon="tabler:brand-github" width={22} height={22} />
              </a>
              <a href={url} className="block duration-200" target="_blank">
                <Icon icon="ci:external-link" width={24} height={24} />
              </a>
            </div>
          )}
        </div>
      </motion.div>
    </>
  );
};

export default FeaturedProject;
