'use client';
import { Player } from '@lottiefiles/react-lottie-player';
import { useEffect, useRef, useState } from 'react';

type Props = {
  path: string;
  className?: string;
};

const ShowLottie = ({ path, className = '' }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isNearViewport, setIsNearViewport] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if (!('IntersectionObserver' in window)) {
      setIsNearViewport(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsNearViewport(true);
          observer.disconnect();
        }
      },
      { rootMargin: '300px 0px' }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className={`max-w-sm md:max-w-md ${className}`}>
      {isNearViewport && <Player autoplay loop src={path} />}
    </div>
  );
};

export default ShowLottie;
