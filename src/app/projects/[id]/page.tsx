import { seoData } from '@/lib/content/portfolio';
import { projectsSection } from '@/lib/content/projects';

import ProjectDetails from '@/components/ui/ProjectDetails';
import { Layout } from '@/containers';

import { Metadata } from 'next';
import { notFound } from 'next/navigation';

interface Props {
  params: {
    id: string;
  };
}

export const generateStaticParams = () => {
  return projectsSection.projects.map(({ id }) => ({ id }));
};

export const generateMetadata = ({ params }: Props): Metadata => {
  const project = projectsSection.projects.find(({ id }) => id === params.id);

  if (!project) {
    return { title: `Project not found | ${seoData.author}` };
  }

  return {
    title: `${project.name} | ${seoData.author}`,
    description: project.description,
    alternates: {
      canonical: `${seoData.url}projects/${project.id}`,
    },
  };
};

const ProjectDetailPage = ({ params }: Props) => {
  const project = projectsSection.projects.find(({ id }) => id === params.id);

  if (!project) notFound();

  return (
    <Layout>
      <ProjectDetails project={project} />
    </Layout>
  );
};

export default ProjectDetailPage;