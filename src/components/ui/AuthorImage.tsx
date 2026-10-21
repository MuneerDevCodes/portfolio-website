'use client';

import useShineSweep from '@/lib/hooks/use-shine-sweep';

import Image from 'next/image';
import { useRef } from 'react';

type Props = { src: string; alt: string };

const AuthorImage = ({ src, alt }: Props) => {
  const shineRef = useRef<HTMLDivElement>(null);

  useShineSweep(shineRef);

  return (
    <div className="relative w-64 h-64 group sm:w-auto sm:h-auto">
      <div
        ref={shineRef}
        className="shine-sweep overflow-hidden rounded shadow-xl"
      >
        <Image
          src={src}
          alt={alt}
          width={300}
          height={300}
          sizes="(max-width: 640px) 256px, 300px"
          className="block h-auto w-full"
        />
      </div>
      <div className="absolute inset-0 border-[3px] z-[-1] rounded border-accent translate-x-6 translate-y-6 group-hover:translate-x-4 group-hover:translate-y-4 duration-150 hidden sm:block"></div>
    </div>
  );
};

export default AuthorImage;
