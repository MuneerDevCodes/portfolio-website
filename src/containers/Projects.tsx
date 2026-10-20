'use client';
import { projectsSection } from '@/lib/content/projects';
import { PROJECTS_INITIALLY } from '@/lib/utils/config';
import { sortByYear } from '@/lib/utils/helper';

import { Button, ProjectCard, Wrapper } from '@/components';

import { getSectionAnimation, projectVariants } from '@/styles/animations';

import { motion } from 'framer-motion';

const Projects = () => {
  const { projects, title } = projectsSection;
  const visibleProjects = projects.slice(0, PROJECTS_INITIALLY);

  return (
    <Wrapper animate={false} {...getSectionAnimation}>
      <motion.h2 className="heading-secondary text-center !mb-12">
        {title}
      </motion.h2>
      <div className="grid gap-6 grid-cols-auto-250 xs:grid-cols-auto-300 place-items-center">
        {sortByYear(visibleProjects).map((project, i) => (
          <ProjectCard
            {...project}
            key={project.id}
            variants={projectVariants}
            initial="hidden"
            whileInView="show"
            custom={i}
            viewport={{ once: true }}
          />
        ))}
      </div>
      <Button
        type="link"
        href="/projects"
        sameTab
        size="lg"
        className="!mt-20"
        center
      >
        show more projects
      </Button>
    </Wrapper>
  );
};

export default Projects;
