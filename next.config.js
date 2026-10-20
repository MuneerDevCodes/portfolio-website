/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'user-images.githubusercontent.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'journally-kv.vercel.app',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'life-kit.vercel.app',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.valuemetrix.io',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'psyconnect.co.in',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'github-production-user-asset-6210df.s3.amazonaws.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.postimg.cc',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'buttons-animations-kv.vercel.app',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'getlifegard.vercel.app',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
        pathname: '/**',
      },
    ],
  },
};

// `next dev` and `next build`/`next start` both write to the same `.next`
// directory by default. Running a production build while a dev server is live
// overwrites the dev server's compiled chunks with production artifacts, which
// makes the dev server return 500s for every JS/CSS asset it serves.
//
// Pointing only the dev server at its own dist directory keeps the two fully
// isolated. Production deliberately keeps the default `.next` so that
// `next start` and hosting providers (e.g. Vercel) are unaffected.
const DEV_DIST_DIR = '.next-dev';

module.exports = (phase) => ({
  ...nextConfig,
  distDir: phase === 'phase-development-server' ? DEV_DIST_DIR : '.next',
});

