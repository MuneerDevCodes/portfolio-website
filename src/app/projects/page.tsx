import { seoData } from '@/lib/content/portfolio';

import { Layout } from '@/containers';
import AllProjects from '@/containers/AllProjects';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: `All Projects | ${seoData.author}`,
  description: `A complete collection of web projects built by ${seoData.author} — full-stack applications across the MERN stack, Laravel and Next.js.`,
  alternates: {
    canonical: `${seoData.url}projects`,
  },
};

const AllProjectsPage = () => {
  return (
    <Layout>
      <AllProjects />
    </Layout>
  );
};

export default AllProjectsPage;