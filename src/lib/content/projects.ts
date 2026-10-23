import { ProjectType } from '@/lib/types';
import { ProjectsSectionType } from '@/lib/types/sections';
import { toId } from '@/lib/utils/helper';

const projects: Omit<ProjectType, 'id'>[] = [
  {
    name: 'NeoCart',
    img: 'https://placehold.co/600x400/png?text=NeoCart',
    tags: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
    description:
      'A responsive e-commerce workflow demo with a searchable catalog, persistent cart and wishlist, simulated checkout, and local order history. Built with Next.js, React, and TypeScript, it uses localStorage and IndexedDB without requiring a backend or account.',
    features: [
      'Searchable catalog of 50 products across five categories, with filtering and sorting',
      'Product details, featured products, category browsing, wishlist, and recently viewed items',
      'Persistent cart with quantity management and buy-now checkout',
      'Validated checkout with delivery estimates and optional saved shipping details',
      'Simulated Cash on Delivery orders with order history, cancellation, and stock restoration',
      'Responsive layouts with light and dark themes',
      'Contact page that saves message drafts locally; messages are not transmitted',
    ],
  },
  {
    name: 'Event Management System',
    url: 'https://github.com/MuneerDevCodes',
    img: 'https://placehold.co/600x400/png?text=EventSphere',
    year: 2025,
    tags: ['MongoDB', 'Express', 'React', 'Node.js'],
    description:
      'EventSphere is a full-stack expo management platform that connects admins, exhibitors and attendees, covering the complete journey from exhibitor application and approval to booth allocation and session scheduling.',
    features: [
      '3-role architecture (Admin / Exhibitor / Attendee) with access control enforced at the API level',
      'Exhibitor application review and approval workflow for the admin',
      'Dynamic booth allocation on an interactive expo floor plan',
      'Session scheduling with 5+ configurable time slots',
      'Attendee registration, session bookings and role-based dashboards',
    ],
  },
  {
    name: 'Covid Booking System',
    url: 'https://github.com/MuneerDevCodes',
    img: 'https://placehold.co/600x400/png?text=Covid+19',
    video: '/Projectvideos/Covid19.mp4',
    year: 2025,
    tags: ['Laravel', 'MySQL'],
    description:
      'An appointment platform for booking COVID tests and vaccinations, handling the complete patient journey from booking request to result delivery.',
    features: [
      '3-role system (Admin / Hospital / Patient) with end-to-end patient flow',
      'Booking requests with hospital approvals and slot management',
      'Test result updates and vaccination status tracking',
      'Exportable date, week and month-wise reports',
      'Built with Laravel MVC architecture and a normalized MySQL schema',
    ],
  },
  {
    name: 'orthocare Dentist',
    url: 'https://orthocare-dentist.vercel.app',
    img: 'https://placehold.co/600x400/png?text=OrthoCare',
    video: '/Projectvideos/OralCare.mp4',
    year: 2025,
    tags: ['Next.js', 'React', 'TypeScript', 'TailwindCSS'],
    description:
      'A production-grade marketing and online booking website for an orthodontic and dental care clinic, built entirely with Next.js 14 and TailwindCSS and deployed on Vercel.',
    features: [
      'Multi-step appointment booking form with a downloadable PNG / JPG / PDF receipt',
      'Before-and-after treatment image comparison slider',
      'Three service categories: General, Cosmetic and Surgical dentistry',
      'About, team, testimonials, pricing and contact pages',
      'SEO-friendly setup with a dynamic sitemap, robots.txt and canonical metadata',
      'Fully mobile-first responsive layout with a mobile navigation toggle',
    ],
  },
  {
    name: 'Hotel Management System',
    url: 'https://github.com/MuneerDevCodes',
    img: 'https://placehold.co/600x400/png?text=Hotel',
    year: 2024,
    tags: ['MongoDB', 'Express', 'React', 'Node.js'],
    description:
      'A real-time hotel operations platform with role-based dashboards for admins and staff, covering the full booking lifecycle with a JWT-secured API layer.',
    features: [
      '2 role-based dashboards (Admin and Staff)',
      'Live room availability tracking and full booking management',
      'JWT-secured API layer with modular backend architecture',
      'Built with MongoDB, Express.js, React.js and Node.js',
    ],
  },
  {
    name: 'Maverick Ecommerce',
    url: 'https://github.com/MuneerDevCodes',
    img: 'https://placehold.co/600x400/png?text=Ecommerce',
    year: 2024,
    tags: ['HTML5', 'CSS3', 'JS', 'Bootstrap'],
    description:
      'A fully responsive single-page eCommerce website for a school uniform manufacturer, showcasing the complete product catalogue and outlet locations.',
    features: [
      '10 product categories presented in a smooth single-page layout',
      'Embedded Google Maps for outlet store locations',
      'Live visitor counter',
      'Smooth animated navigation built with vanilla JavaScript and Bootstrap',
    ],
  },
];

export const projectsSection: ProjectsSectionType = {
  title: 'my projects',
  projects: projects.map((project, i) => ({
    ...project,
    id: toId(project.name, i),
  })),
};
