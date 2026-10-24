'use client';

import { useEffect, useRef } from 'react';

const FRAME_INTERVAL = 1000 / 30;

const readAmbientDuration = (root: HTMLElement): number => {
  const raw = window
    .getComputedStyle(root)
    .getPropertyValue('--ambient-duration')
    .trim();

  if (raw.endsWith('ms')) return parseFloat(raw) || 18000;
  if (raw.endsWith('s')) return (parseFloat(raw) || 18) * 1000;
  return 18000;
};
type Props = {
  className?: string;
};

const DotBackground = ({ className = '' }: Props) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const ambientRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const ambient = ambientRef.current;
    if (!root || !ambient) return;

    let duration = readAmbientDuration(root);
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onMotionChange = () => {
      duration = readAmbientDuration(root);
    };
    motionQuery.addEventListener('change', onMotionChange);

    let raf = 0;
    let timeout = 0;
    let running = false;
    let startTime = 0;
    let writtenAmbientX = '';
    let writtenAmbientY = '';

    const tick = (now: number) => {
      if (!startTime) startTime = now;

      const progress = ((now - startTime) % duration) / duration;
      const angle = progress * Math.PI * 2;
      const x = `${50 + Math.cos(angle) * 34}%`;
      const y = `${50 + Math.sin(angle * 0.6) * 30}%`;

      if (x !== writtenAmbientX) {
        ambient.style.setProperty('--ambient-x', x);
        writtenAmbientX = x;
      }
      if (y !== writtenAmbientY) {
        ambient.style.setProperty('--ambient-y', y);
        writtenAmbientY = y;
      }

      timeout = window.setTimeout(() => {
        raf = requestAnimationFrame(tick);
      }, FRAME_INTERVAL);
    };

    const start = () => {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(tick);
    };

    const stop = () => {
      if (!running) return;
      running = false;
      cancelAnimationFrame(raf);
      window.clearTimeout(timeout);
    };

    const onVisibilityChange = () => {
      if (document.hidden) {
        stop();
      } else {
        startTime = 0;
        start();
      }
    };

    document.addEventListener('visibilitychange', onVisibilityChange);
    start();

    return () => {
      document.removeEventListener('visibilitychange', onVisibilityChange);
      motionQuery.removeEventListener('change', onMotionChange);
      stop();
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className={`dot-background ${className}`}
      aria-hidden="true"
    >
      <div className="dot-background__dots" />
      <div ref={ambientRef} className="dot-background__ambient" />
    </div>
  );
};

export default DotBackground;
