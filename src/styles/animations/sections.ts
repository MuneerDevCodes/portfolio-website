import { slideUp } from '.';
import { Variants } from 'framer-motion';

export const sectionVariants = slideUp({
  delay: 0.1,
  duration: 0.5,
  offset: 30,
});

export const getSectionAnimation = {
  variants: sectionVariants,
  initial: 'hidden',
  whileInView: 'show',
  viewport: { once: true },
};

export const projectVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      type: 'tween',
      ease: 'easeOut',
      duration: 0.5,
      delay: 0.05 * i,
    },
  }),
};
