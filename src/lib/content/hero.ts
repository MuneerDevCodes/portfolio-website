import { HeroSectionType } from '@/lib/types/sections';
import { resumeFileName } from '@/lib/utils/config';

export const heroSection: HeroSectionType = {
  subtitle: 'Hi, my name is',
  title: 'Muhammad Muneer.',
  tagline: 'I build modern, responsive, and user-friendly web applications.',
  description:
    'Full-stack web developer experienced in MERN and Laravel, focused on creating clean and dependable digital experiences.',
  specialText: 'Let’s build something great',
  cta: {
    title: 'See My Resume',
    url: `/${resumeFileName}`,
    hideInDesktop: true,
  },
};
