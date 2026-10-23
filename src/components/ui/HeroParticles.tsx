'use client';

import { useEffect, useRef } from 'react';

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  originX: number;
  originY: number;
  phase: number;
};

const HeroParticles = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!root || !canvas || !context) return;

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const pointerQuery = window.matchMedia('(hover: none), (pointer: coarse)');
    const particles: Particle[] = [];
    const pointer = { x: 0, y: 0, active: false };
    let width = 0;
    let height = 0;
    let frame = 0;
    let pixelRatio = 1;
    let accent = '#0ea5e9';
    let lastTime = 0;

    const resize = () => {
      const bounds = root.getBoundingClientRect();
      width = bounds.width;
      height = bounds.height;
      pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

      const count = Math.min(
        76,
        Math.max(34, Math.round((width * height) / 11500))
      );
      particles.length = 0;
      for (let i = 0; i < count; i += 1) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        particles.push({
          x,
          y,
          vx: 0,
          vy: 0,
          originX: x,
          originY: y,
          phase: Math.random() * Math.PI * 2,
        });
      }
    };

    const onPointerMove = (event: PointerEvent) => {
      if (pointerQuery.matches) return;
      const bounds = root.getBoundingClientRect();
      pointer.active =
        event.clientX >= bounds.left &&
        event.clientX <= bounds.right &&
        event.clientY >= bounds.top &&
        event.clientY <= bounds.bottom;
      pointer.x = event.clientX - bounds.left;
      pointer.y = event.clientY - bounds.top;
    };

    const onPointerLeave = (event: PointerEvent) => {
      if (!event.relatedTarget) pointer.active = false;
    };

    const draw = (time: number) => {
      const elapsed = lastTime ? Math.min((time - lastTime) / 16.67, 2) : 1;
      lastTime = time;
      const reducedMotion = motionQuery.matches;
      const drift = reducedMotion ? 0.25 : 1;
      context.clearRect(0, 0, width, height);

      for (const particle of particles) {
        const targetX =
          particle.originX +
          Math.sin(time * 0.00035 + particle.phase) * 12 * drift;
        const targetY =
          particle.originY +
          Math.cos(time * 0.0003 + particle.phase) * 12 * drift;
        particle.vx += (targetX - particle.x) * 0.006 * elapsed;
        particle.vy += (targetY - particle.y) * 0.006 * elapsed;

        if (pointer.active) {
          const dx = pointer.x - particle.x;
          const dy = pointer.y - particle.y;
          const distance = Math.hypot(dx, dy);
          const radius = 190;
          if (distance > 0 && distance < radius) {
            const influence = 1 - distance / radius;
            particle.vx += (dx / distance) * influence * 0.09 * elapsed;
            particle.vy += (dy / distance) * influence * 0.09 * elapsed;
          }
        }

        particle.vx *= 0.94;
        particle.vy *= 0.94;
        particle.x += particle.vx * elapsed;
        particle.y += particle.vy * elapsed;
      }

      for (let i = 0; i < particles.length; i += 1) {
        const particle = particles[i];
        for (let j = i + 1; j < particles.length; j += 1) {
          const other = particles[j];
          const distance = Math.hypot(
            particle.x - other.x,
            particle.y - other.y
          );
          if (distance < 145) {
            context.globalAlpha = (1 - distance / 145) * 0.32;
            context.strokeStyle = accent;
            context.lineWidth = 0.8;
            context.beginPath();
            context.moveTo(particle.x, particle.y);
            context.lineTo(other.x, other.y);
            context.stroke();
          }
        }
      }

      for (const particle of particles) {
        context.globalAlpha = 0.55;
        context.fillStyle = accent;
        context.beginPath();
        context.arc(particle.x, particle.y, 1.6, 0, Math.PI * 2);
        context.fill();
      }

      context.globalAlpha = 1;
      frame = requestAnimationFrame(draw);
    };

    accent =
      getComputedStyle(root).getPropertyValue('--color-accent').trim() ||
      accent;
    resize();
    frame = requestAnimationFrame(draw);
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerout', onPointerLeave);
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(root);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerout', onPointerLeave);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div ref={rootRef} className="hero-particles" aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  );
};

export default HeroParticles;
