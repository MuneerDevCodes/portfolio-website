import { motion, MotionProps } from 'framer-motion';
import { ElementType, HTMLAttributes, ReactNode } from 'react';

interface Props extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  className?: string;
  children: ReactNode;
  id?: string;
  animate?: boolean;
}

const Wrapper = ({
  children,
  as = 'section',
  className = '',
  id = '',
  animate = true,
  ...rest
}: Props & MotionProps) => {
  const classes = `py-24 md:py-32 ${className}`;

  // Use the static motion.section component instead of creating a new
  // motion component type on every render (which remounts the subtree).
  if (as === 'section') {
    return (
      <motion.section id={id} className={classes} {...rest}>
        {children}
      </motion.section>
    );
  }

  if (animate) {
    const MotionTag = motion(as);

    return (
      <MotionTag id={id} className={classes} {...rest}>
        {children}
      </MotionTag>
    );
  }

  const CustomTag = `${as}` as ElementType;

  return (
    <CustomTag id={id} className={classes} {...rest}>
      {children}
    </CustomTag>
  );
};

export default Wrapper;
