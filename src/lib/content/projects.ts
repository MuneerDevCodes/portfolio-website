import { ProjectType } from '@/lib/types';
import { ProjectsSectionType } from '@/lib/types/sections';
import { toId } from '@/lib/utils/helper';

const projects: Omit<ProjectType, 'id'>[] = [
  {
    name: 'Event Management System',
    url: 'https://github.com/MuneerDevCodes',
    img: 'https://placehold.co/600x400/png?text=EventSphere',
    year: 2025,
    tags: ['MongoDB', 'Express', 'React', 'Node.js'],
  },
  {
    name: 'Covid Booking System',
    url: 'https://github.com/MuneerDevCodes',
    img: 'https://placehold.co/600x400/png?text=Covid+19',
    video: '/Projectvideos/Covid19.mp4',
    year: 2025,
    tags: ['Laravel', 'MySQL'],
  },
  {
    name: 'orthocare Dentist',
    url: 'https://orthocare-dentist.vercel.app',
    img: 'https://placehold.co/600x400/png?text=OrthoCare',
    video: '/Projectvideos/OralCare.mp4',
    year: 2025,
    tags: ['Next.js', 'React', 'TypeScript', 'TailwindCSS'],
  },
  {
    name: 'Hotel Management System',
    url: 'https://github.com/MuneerDevCodes',
    img: 'https://placehold.co/600x400/png?text=Hotel',
    year: 2024,
    tags: ['MongoDB', 'Express', 'React', 'Node.js'],
  },
  {
    name: 'Maverick Ecommerce',
    url: 'https://github.com/MuneerDevCodes',
    img: 'https://placehold.co/600x400/png?text=Ecommerce',
    year: 2024,
    tags: ['HTML5', 'CSS3', 'JS', 'Bootstrap'],
  },
];

export const projectsSection: ProjectsSectionType = {
  title: 'my projects',
  projects: projects.map((project, i) => ({
    ...project,
    id: toId(project.name, i),
  })),
};
