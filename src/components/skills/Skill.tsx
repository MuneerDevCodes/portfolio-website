'use client';

import { SoftwareSkillType } from '@/lib/types';
import { toId } from '@/lib/utils/helper';

import { SkillIcon } from '@/components';

import { motion, useReducedMotion } from 'framer-motion';

type Props = {
  id: string;
  index: number;
  title: string;
  points: string[];
  skills: SoftwareSkillType[];
};

const Skill = ({ id, index, title, skills, points }: Props) => {
  const reduceMotion = useReducedMotion();
  const sectionId = id;

  return (
    <motion.article
      id={`${sectionId}-panel`}
      role="tabpanel"
      tabIndex={0}
      aria-labelledby={`${sectionId}-tab`}
      className="relative isolate min-w-0 overflow-hidden rounded-3xl border border-dark-3/50 bg-bg-secondary p-5 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent motion-reduce:!transform-none motion-reduce:!opacity-100 sm:p-8 lg:p-10"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.3, ease: 'easeOut' }}
    >
      <div className="relative">
        <div className="mb-8 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.17em] text-text sm:mb-10">
          <span className="grid h-7 w-7 place-items-center rounded-full border border-accent/40 text-accent">
            {String(index).padStart(2, '0')}
          </span>
          Capability{' '}
          <span aria-hidden="true" className="text-dark-3">
            /
          </span>{' '}
          {String(skills.length).padStart(2, '0')} technologies
        </div>

        <div className="grid gap-8 xl:grid-cols-[minmax(0,0.85fr)_minmax(18rem,1.15fr)] xl:gap-12">
          <div className="min-w-0">
            <h3 className="max-w-lg text-3xl font-semibold leading-tight tracking-tight text-dark-2 sm:text-4xl">
              {title}
            </h3>
            <div className="mt-7 h-px w-full bg-dark-3/50" />
            <p className="mb-3 mt-5 font-mono text-[10px] uppercase tracking-[0.16em] text-text">
              In practice
            </p>
            <ul
              aria-label={`${title} in practice`}
              className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1"
            >
              {points.map((point, pointIndex) => (
                <li
                  key={toId(point, pointIndex)}
                  className="flex gap-3 text-sm leading-6 text-text"
                >
                  <span
                    aria-hidden="true"
                    className="mt-[0.65rem] h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                  />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="min-w-0 xl:border-l xl:border-dark-3/40 xl:pl-8">
            <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.16em] text-text">
              Technologies
            </p>
            <ul
              aria-label={`${title} technologies`}
              className="grid grid-cols-2 gap-x-5 sm:grid-cols-3 xl:grid-cols-2"
            >
              {skills.map(({ name, icon }, skillIndex) => (
                <motion.li
                  key={toId(name)}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="motion-reduce:!transform-none motion-reduce:!opacity-100"
                  transition={{
                    duration: reduceMotion ? 0 : 0.25,
                    delay: reduceMotion ? 0 : 0.06 + skillIndex * 0.045,
                    ease: 'easeOut',
                  }}
                >
                  <SkillIcon src={icon} name={name} />
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.article>
  );
};

export default Skill;
