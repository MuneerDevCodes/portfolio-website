import { ProjectType } from '@/lib/types';
import { ProjectsSectionType } from '@/lib/types/sections';
import { toId } from '@/lib/utils/helper';

const projects: Omit<ProjectType, 'id'>[] = [
  {
    name: 'eventsphere',
    url: 'https://github.com/MuneerDevCodes',
    img: 'https://placehold.co/600x400/png?text=EventSphere',
    year: 2025,
    tags: ['MongoDB', 'Express', 'React', 'Node.js'],
  },
  {
    name: 'covid booking system',
    url: 'https://github.com/MuneerDevCodes',
    img: 'https://placehold.co/600x400/png?text=Covid+Booking+System',
    year: 2025,
    tags: ['PHP', 'Laravel', 'MySQL'],
  },
  {
    name: 'hotel management system',
    url: 'https://github.com/MuneerDevCodes',
    img: 'https://placehold.co/600x400/png?text=Hotel+Management',
    year: 2024,
    tags: ['MongoDB', 'Express', 'React', 'Node.js'],
  },
  {
    name: 'maverick dresses',
    url: 'https://github.com/MuneerDevCodes',
    img: 'https://placehold.co/600x400/png?text=Maverick+Dresses',
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