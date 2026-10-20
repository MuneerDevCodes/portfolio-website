'use client';

import { useEffect, useRef } from 'react';

/**
 * Global glowing-dots background.
 *
 * Renders a fixed, full-screen dot grid behind all content and drives a
 * soft glow that follows the cursor, plus a slow ambient drift that takes
 * over while the pointer is idle.
 *
 * The visuals live entirely in `src/styles/dot-background.css`.
 */

/** How long (ms) without movement before the cursor glow fades out. */
const IDLE_DELAY = 1200;

/** Lerp factor applied each frame. Lower = snappier, higher = softer. */
const FOLLOW_SPEED = 0.16;

/** Ambient glow strength while the cursor is active / idle. */
const AMBIENT_ACTIVE = 0.25;
const AMBIENT_IDLE = 1;

/**
 * Reads the `--ambient-duration` CSS variable so the stylesheet stays the
 * single source of truth for the drift speed.
 */
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
  const glowRef = useRef<HTMLDivElement>(null);
  const haloRef = useRef<HTMLDivElement>(null);
  const ambientRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const glow = glowRef.current;
    const halo = haloRef.current;
    const ambient = ambientRef.current;
    if (!root || !glow || !halo || !ambient) return;

    // Touch devices have no cursor to follow, so only the ambient drift runs.
    const trackCursor = !window.matchMedia(
      '(hover: none), (pointer: coarse)'
    ).matches;

    let duration = readAmbientDuration(root);

    // Re-read the drift speed if the user flips the OS reduced-motion
    // setting while the page is open.
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onMotionChange = () => {
      duration = readAmbientDuration(root);
    };
    motionQuery.addEventListener('change', onMotionChange);

    let raf = 0;
    let running = false;
    let startTime = 0;

    // Target position (latest pointer event) and the smoothed position that
    // is actually written to CSS.
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;

    let lastMove = performance.now();
    let idle = !trackCursor;
    let glowOpacity = trackCursor ? 1 : 0;
    let ambientFactor = trackCursor ? AMBIENT_ACTIVE : AMBIENT_IDLE;

    // Track the last written values so we only touch the DOM when a value
    // actually changes.
    let writtenGlow = -1;
    let writtenAmbient = -1;
    let writtenX = -1;
    let writtenY = -1;
    let writtenAmbientX = '';
    let writtenAmbientY = '';
    let writtenHalo = '';

    const applyState = () => {
      // The cursor mask position drives the glow layer's radial mask. It is
      // scoped to the glow element so the rest of the tree is never
      // invalidated by the per-frame updates.
      if (currentX !== writtenX) {
        glow.style.setProperty('--mouse-x', `${currentX}px`);
        writtenX = currentX;
      }
      if (currentY !== writtenY) {
        glow.style.setProperty('--mouse-y', `${currentY}px`);
        writtenY = currentY;
      }

      // The halo is moved with a transform so the browser can composite it on
      // the GPU without repainting the (large) dot grid behind it.
      const haloTransform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      if (haloTransform !== writtenHalo) {
        halo.style.transform = haloTransform;
        writtenHalo = haloTransform;
      }

      if (glowOpacity !== writtenGlow) {
        root.style.setProperty('--glow-opacity', `${glowOpacity}`);
        writtenGlow = glowOpacity;
      }
      if (ambientFactor !== writtenAmbient) {
        root.style.setProperty('--ambient-factor', `${ambientFactor}`);
        writtenAmbient = ambientFactor;
      }
    };

    const tick = (now: number) => {
      if (!startTime) startTime = now;

      if (trackCursor) {
        // Ease the glow towards the cursor.
        currentX += (targetX - currentX) * FOLLOW_SPEED;
        currentY += (targetY - currentY) * FOLLOW_SPEED;

        // Once the pointer has been idle for a while, fade the cursor glow
        // out and let the ambient glow take over.
        const isIdle = now - lastMove > IDLE_DELAY;
        if (isIdle !== idle) {
          idle = isIdle;
          glowOpacity = isIdle ? 0 : 1;
          ambientFactor = isIdle ? AMBIENT_IDLE : AMBIENT_ACTIVE;
        }
      }

      // Slow, looping lissajous-style drift for the ambient glow.
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

      applyState();
      raf = requestAnimationFrame(tick);
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
    };

    const onMouseMove = (event: MouseEvent) => {
      if (!trackCursor) return;
      targetX = event.clientX;
      targetY = event.clientY;
      lastMove = performance.now();
      if (idle) {
        idle = false;
        glowOpacity = 1;
        ambientFactor = AMBIENT_ACTIVE;
      }
    };

    const onVisibilityChange = () => {
      if (document.hidden) {
        stop();
      } else {
        startTime = 0;
        start();
      }
    };

    if (trackCursor) {
      document.addEventListener('mousemove', onMouseMove, { passive: true });
    }
    document.addEventListener('visibilitychange', onVisibilityChange);

    applyState();
    start();

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
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
      <div ref={glowRef} className="dot-background__glow" />
      <div ref={haloRef} className="dot-background__halo" />
      <div ref={ambientRef} className="dot-background__ambient" />
    </div>
  );
};

export default DotBackground;
