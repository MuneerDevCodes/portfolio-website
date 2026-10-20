'use client';
import { ProjectType } from '@/lib/types';
import { blurImageURL } from '@/lib/utils/config';

import Button from '@/components/buttons/Button';

import { Icon } from '@iconify/react';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import Image from 'next/image';
import { useEffect } from 'react';

interface Props {
  project: ProjectType | null;
  onClose: () => void;
}

const backdropVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
  exit: { opacity: 0 },
};

const panelVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'tween', ease: 'easeOut', duration: 0.25 },
  },
  exit: {
    opacity: 0,
    y: 20,
    scale: 0.97,
    transition: { type: 'tween', ease: 'easeIn', duration: 0.2 },
  },
};

const ProjectModal = ({ project, onClose }: Props) => {
  // Close on Escape key and lock the body scroll while the modal is open
  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          variants={backdropVariants}
          initial="hidden"
          animate="show"
          exit="exit"
          onClick={onClose}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
        >
          <motion.div
            variants={panelVariants}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={project.name}
            className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-lg shadow-2xl bg-bg-secondary"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close project details"
              className="absolute top-3 right-3 z-10 p-1 duration-150 rounded-full text-dark-1 bg-bg-secondary/80 hover:text-accent"
            >
              <Icon icon="tabler:x" width={22} height={22} />
            </button>

            {/* Media */}
            <div className="h-[240px] sm:h-[320px] overflow-hidden">
              {project.video ? (
                <video
                  src={project.video}
                  poster={project.img}
                  autoPlay
                  muted
                  loop
                  playsInline
                  controls
                  preload="auto"
                  className="object-cover w-full h-full"
                />
              ) : (
                <Image
                  src={project.img}
                  alt={project.name}
                  width={720}
                  height={480}
                  placeholder="blur"
                  blurDataURL={blurImageURL}
                  className="object-cover w-full h-full"
                />
              )}
            </div>

            {/* Content */}
            <div className="p-5 space-y-4 sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="heading-tertiary">{project.name}</h3>
                <span className="font-mono text-sm text-accent">
                  {project.year}
                </span>
              </div>

              <p className="text-sm leading-6 sm:text-base text-dark-1">
                {project.description}
              </p>

              {project.features && project.features.length > 0 && (
                <div>
                  <p className="font-mono text-xs capitalize text-accent">
                    features / achievements
                  </p>
                  <ul className="mt-2 space-y-1.5 text-sm list-disc list-inside text-dark-1">
                    {project.features.map((feature) => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>
                </div>
              )}

              <p className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[11px] capitalize sm:text-xs text-accent">
                {project.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </p>

              <div className="flex flex-wrap items-center gap-4">
                {project.repo && (
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-mono text-sm capitalize duration-150 text-dark-1 hover:text-accent"
                  >
                    <Icon icon="tabler:brand-github" width={18} height={18} />
                    github
                  </a>
                )}
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-mono text-sm capitalize duration-150 text-dark-1 hover:text-accent"
                >
                  <Icon icon="ci:external-link" width={18} height={18} />
                  live site
                </a>
              </div>

              <div className="!pt-2">
                <Button
                  type="link"
                  href={`/projects/${project.id}`}
                  sameTab
                  size="sm"
                >
                  view full details
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;