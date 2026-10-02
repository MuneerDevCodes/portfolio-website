import { HeroSectionType } from '@/lib/types/sections';
import { resumeFileName } from '@/lib/utils/config';

export const heroSection: HeroSectionType = {
  subtitle: 'Hi, my name is',
  title: 'muhammad muneer.',
  tagline: 'I build secure, full-stack web applications.',
  description:
    "I'm a Junior Web Developer with hands-on experience across the MERN stack and PHP Laravel, building role-based platforms with secure, JWT-authenticated APIs.",
  specialText: 'Currently open to new opportunities',
  cta: {
    title: 'see my resume',
    url: `/${resumeFileName}`,
    hideInDesktop: true,
  },
};
