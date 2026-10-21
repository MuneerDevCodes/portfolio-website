import { RefObject, useEffect } from 'react';

const useShineSweep = (ref: RefObject<HTMLElement>) => {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (!('IntersectionObserver' in window)) {
      element.classList.add('is-visible');
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry) return;
      element.classList.toggle('is-visible', entry.isIntersecting);
    });

    observer.observe(element);
    return () => observer.disconnect();
  }, [ref]);
};

export default useShineSweep;
