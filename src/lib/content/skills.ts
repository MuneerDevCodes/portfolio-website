import { SkillsSectionType, SkillType } from '@/lib/types/sections';
import { toId } from '@/lib/utils/helper';

const skills: Omit<SkillType, 'id'>[] = [
  {
    title: 'full stack development',
    // animation lottie file: https://lottiefiles.com/
    lottie: {
      light: '/lotties/frontend.json',
      dark: '/lotties/frontend-dark.json',
    },
    points: [
      'Building full-stack web applications using the MERN stack (MongoDB, Express.js, React.js, Node.js)',
      'Developing role-based platforms with secure, JWT-authenticated REST APIs',
      'Building server-rendered applications with Laravel following MVC architecture',
    ],
    softwareSkills: [
      // iconify icons: https://icon-sets.iconify.design/
      { name: 'html-5', icon: 'vscode-icons:file-type-html' },
      { name: 'CSS-3', icon: 'vscode-icons:file-type-css' },
      { name: 'javaScript', icon: 'vscode-icons:file-type-js-official' },
      { name: 'bootstrap', icon: 'logos:bootstrap' },
      { name: 'reactjs', icon: 'logos:react' },
      { name: 'nodejs', icon: 'logos:nodejs-icon' },
      { name: 'expressjs', icon: 'simple-icons:express' },
      { name: 'laravel', icon: 'logos:laravel' },
      { name: 'php', icon: 'logos:php' },
      { name: 'tailwindcss', icon: 'logos:tailwindcss-icon' },
      { name: 'MongoDB', icon: 'logos:mongodb-icon' },
      { name: 'mysql', icon: 'logos:mysql' },
      { name: 'postgresql', icon: 'logos:postgresql' },
    ],
  },
  {
    title: 'CMS & eCommerce',
    lottie: {
      light: '/lotties/designing.json',
      dark: '/lotties/designing-dark.json',
    },
    points: [
      'Building and customizing websites with WordPress',
      'Setting up and managing online stores with Shopify',
      'Version control and collaboration using Git and GitHub',
    ],
    softwareSkills: [
      { name: 'wordpress', icon: 'logos:wordpress-icon' },
      { name: 'shopify', icon: 'logos:shopify' },
      { name: 'git', icon: 'logos:git-icon' },
      { name: 'github', icon: 'logos:github-icon' },
    ],
  },
];

export const skillsSection: SkillsSectionType = {
  title: 'what i do',
  skills: skills.map((skill, i) => ({ ...skill, id: toId(skill.title, i) })),
};
