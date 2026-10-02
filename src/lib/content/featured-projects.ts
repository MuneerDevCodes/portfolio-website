import { FeaturedProjectType } from '@/lib/types';
import { FeaturedProjectsSectionType } from '@/lib/types/sections';
import { toId } from '@/lib/utils/helper';

const projects: Omit<FeaturedProjectType, 'id'>[] = [
  {
    name: 'EventSphere',
    description:
      'An expo management platform for organizers, exhibitors, and attendees.',
    tasks:
      'Architected a 3-role platform (Admin / Exhibitor / Attendee) with exhibitor application and approval workflow, dynamic booth allocation from an interactive floor plan, session scheduling with 5+ configurable time slots, and access control enforced at the API level rather than the UI alone.',
    url: 'https://github.com/MuneerDevCodes',
    img: 'https://placehold.co/720x480/png?text=EventSphere',
    tags: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'JWT'],
  },
  {
    name: 'Covid Test & Vaccination Booking System',
    description:
      'An appointment platform for booking COVID tests and vaccinations.',
    tasks:
      'Built a 3-role appointment system (Admin / Hospital / Patient) handling end-to-end patient flow, including booking requests, hospital approvals, test result updates, vaccination status tracking, and exportable date/week/month-wise reports.',
    url: 'https://github.com/MuneerDevCodes',
    img: 'https://placehold.co/720x480/png?text=Covid+Booking+System',
    tags: [ 'Laravel', 'MySQL'],
  },
  {
    name: 'Hotel Management System',
    description:
      'A real-time hotel operations platform with role-based dashboards.',
    tasks:
      'Developed a real-time hotel operations platform with 2 role-based dashboards (Admin and Staff), live room availability tracking, full booking management, and a JWT-secured API layer with modular backend architecture.',
    url: 'https://github.com/MuneerDevCodes',
    img: 'https://placehold.co/720x480/png?text=Hotel+Management',
    tags: ['MongoDB', 'Express.js', 'React.js', 'Node.js'],
  },
];

const featuredProjectsSection: FeaturedProjectsSectionType = {
  title: "projects i've worked on",
  projects: projects.map((project, i) => ({
    ...project,
    id: toId(project.name, i),
  })),
};

export default featuredProjectsSection;