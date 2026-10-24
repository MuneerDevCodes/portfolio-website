import { SkillsSectionType, SkillType } from '@/lib/types/sections';
import { toId } from '@/lib/utils/helper';

const skills: Omit<SkillType, 'id'>[] = [
  {
    title: 'Frontend & UI',
    points: [
      'Developing responsive web pages using HTML5, CSS3, JavaScript, React.js, and Tailwind CSS.',
    ],
    softwareSkills: [
      // iconify icons: https://icon-sets.iconify.design/
      { name: 'html-5', icon: 'vscode-icons:file-type-html' },
      { name: 'CSS-3', icon: 'vscode-icons:file-type-css' },
      { name: 'javaScript', icon: 'vscode-icons:file-type-js-official' },
      { name: 'bootstrap', icon: 'logos:bootstrap' },
      { name: 'reactjs', icon: 'logos:react' },
      { name: 'Next.js', icon: 'logos:nextjs-icon' },
      { name: 'tailwindcss', icon: 'logos:tailwindcss-icon' },
    ],
  },
  {
    title: 'Backend & Data Base',
    points: [
      'Building full-stack web applications using the MERN stack (MongoDB, Express.js, React.js, Node.js).',
      'Developing secure, role-based platforms with JWT authentication and REST APIs.',
      'Building server-rendered applications with Laravel following MVC architecture.',
      'Managing databases and data records using MongoDB, MySQL, and PostgreSQL.',
    ],
    softwareSkills: [
      { name: 'nodejs', icon: 'logos:nodejs-icon' },
      { name: 'expressjs', icon: 'simple-icons:express' },
      { name: 'laravel', icon: 'logos:laravel' },
      { name: 'php', icon: 'logos:php' },
      { name: 'MongoDB', icon: 'logos:mongodb-icon' },
      { name: 'mysql', icon: 'logos:mysql' },
      { name: 'postgresql', icon: 'logos:postgresql' },
    ],
  },
  {
    title: 'CMS & Digital Operations',
    wide: true,
    points: [
      'Building and customizing websites using WordPress and managing online stores with Shopify.',
      'Planning and executing email marketing campaigns alongside web development activities.',
      'Managing website content and supporting content execution for digital marketing campaigns.',
      'Using Git and GitHub for version control, team collaboration, and project management.',
      'Preparing documents, spreadsheets, presentations, and reports using Microsoft Word, Excel, PowerPoint, Google Docs, and Google Sheets.',
      'Handling data management, record keeping, and office documentation with accuracy and attention to detail.',
      'Applying problem-solving, organization, and teamwork skills to meet project requirements and deadlines.',
    ],
    softwareSkills: [
      { name: 'wordpress', icon: 'logos:wordpress-icon' },
      { name: 'shopify', icon: 'logos:shopify' },
      { name: 'git', icon: 'logos:git-icon' },
      { name: 'github', icon: 'logos:github-icon' },
      { name: 'Office Automation', icon: 'simple-icons:microsoftoffice' },
      { name: 'Email Marketing', icon: 'mdi:email-newsletter' },
    ],
  },
];

export const skillsSection: SkillsSectionType = {
  title: 'Skills',
  skills: skills.map((skill, i) => ({
    ...skill,
    id: toId(skill.title, i),
  })),
};
