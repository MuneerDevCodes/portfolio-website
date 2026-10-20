'use client';
import { projectsSection } from '@/lib/content/projects';
import { ProjectType } from '@/lib/types';
import { sortByYear } from '@/lib/utils/helper';

import { Button, ProjectCard, ProjectModal, Wrapper } from '@/components';

import { getSectionAnimation, projectVariants } from '@/styles/animations';

import { motion } from 'framer-motion';
import { useState } from 'react';

const AllProjects = () => {
  const { projects } = projectsSection;
  const [activeProject, setActiveProject] = useState<ProjectType | null>(null);

  return (
    <Wrapper animate={false} {...getSectionAnimation}>
      <motion.h2 className="heading-secondary text-center !mb-12">
        all projects
      </motion.h2>
      <div className="grid gap-6 grid-cols-auto-250 xs:grid-cols-auto-300 place-items-center">
        {sortByYear(projects).map((project, i) => (
          <ProjectCard
            {...project}
            key={project.id}
            onMoreInfo={setActiveProject}
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
        href="/"
        sameTab
        size="lg"
        className="!mt-20"
        center
      >
        back to home
      </Button>
      <ProjectModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </Wrapper>
  );
};

export default AllProjects;