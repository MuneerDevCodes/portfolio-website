'use client';

import { skillsSection } from '@/lib/content/skills';

import { Skill, Wrapper } from '@/components';

import { getSectionAnimation } from '@/styles/animations';

import { KeyboardEventHandler, useState } from 'react';

const Skills = () => {
  const { title, skills } = skillsSection;
  const [activeSkillId, setActiveSkillId] = useState(skills[0]?.id ?? '');
  const activeIndex = Math.max(
    0,
    skills.findIndex(({ id }) => id === activeSkillId)
  );
  const activeSkill = skills[activeIndex];
  const technologyCount = skills.reduce(
    (total, skill) => total + skill.softwareSkills.length,
    0
  );

  const handleCategoryKeyDown: KeyboardEventHandler<HTMLDivElement> = (
    event
  ) => {
    if (!(event.target instanceof HTMLButtonElement)) return;

    const tabs = Array.from(
      event.currentTarget.querySelectorAll<HTMLButtonElement>('[role="tab"]')
    );
    const currentIndex = tabs.indexOf(event.target);
    if (currentIndex < 0) return;

    let nextIndex: number;
    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        nextIndex = (currentIndex + 1) % tabs.length;
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
        break;
      case 'Home':
        nextIndex = 0;
        break;
      case 'End':
        nextIndex = tabs.length - 1;
        break;
      default:
        return;
    }

    event.preventDefault();
    tabs[nextIndex].focus();
    setActiveSkillId(skills[nextIndex].id);
  };

  return (
    <Wrapper
      id="skills"
      className="overflow-hidden motion-reduce:!transform-none motion-reduce:!opacity-100"
      {...getSectionAnimation}
    >
      <header className="mb-10 grid gap-8 border-b border-dark-3/50 pb-9 sm:mb-12 sm:pb-11 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
        <div className="max-w-2xl">
          <p className="mb-4 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-accent">
            <span aria-hidden="true" className="h-px w-8 bg-accent" />
            The toolkit <span className="text-text">/ 01—03</span>
          </p>
          <h2 className="text-6xl font-semibold tracking-[-0.06em] text-dark-2 sm:text-7xl lg:text-8xl">
            {title}
            <span aria-hidden="true" className="text-accent">
              .
            </span>
          </h2>
          <p className="mt-4 max-w-xl text-base leading-7 text-text sm:text-lg">
            The technologies and practices I use to shape thoughtful interfaces
            and dependable web applications.
          </p>
        </div>

        <div
          role="group"
          aria-label={`${technologyCount} technologies across ${skills.length} categories`}
          className="flex items-center gap-4 md:mb-1 md:border-l md:border-dark-3/50 md:pl-7"
        >
          <span className="font-mono text-5xl font-medium leading-none tracking-tight text-dark-2">
            {String(technologyCount).padStart(2, '0')}
          </span>
          <span className="font-mono text-[10px] uppercase leading-5 tracking-[0.16em] text-text">
            technologies
            <br />
            across {String(skills.length).padStart(2, '0')} areas
          </span>
        </div>
      </header>

      <div className="grid gap-6 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-10">
        <nav aria-label="Skill categories" className="min-w-0">
          <p className="mb-3 hidden font-mono text-[10px] uppercase tracking-[0.18em] text-text lg:block">
            Explore by focus
          </p>
          <div
            role="tablist"
            aria-label="Skill categories"
            aria-orientation="vertical"
            onKeyDown={handleCategoryKeyDown}
            className="flex min-w-0 gap-2 overflow-x-auto pb-2 lg:block lg:space-y-2 lg:overflow-visible lg:pb-0"
          >
            {skills.map(
              ({ id, title: categoryTitle, softwareSkills }, index) => {
                const isActive = id === activeSkill?.id;

                return (
                  <button
                    key={id}
                    id={`${id}-tab`}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={`${id}-panel`}
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => setActiveSkillId(id)}
                    className={`group flex min-h-14 shrink-0 items-center gap-3 rounded-xl border px-4 py-3 text-left transition duration-200 motion-reduce:transition-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent lg:min-h-0 lg:w-full lg:rounded-none lg:border-0 lg:border-l-2 lg:px-5 lg:py-4 ${
                      isActive
                        ? 'border-accent bg-accent-light text-dark-2 lg:bg-transparent'
                        : 'border-dark-3/50 bg-bg-secondary/60 text-text hover:border-accent/50 hover:text-dark-2 lg:border-dark-3/50 lg:bg-transparent'
                    }`}
                  >
                    <span
                      className={`font-mono text-[10px] transition-colors motion-reduce:transition-none ${
                        isActive ? 'text-accent' : 'text-text'
                      }`}
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="whitespace-nowrap text-sm font-medium sm:text-base lg:whitespace-normal">
                      {categoryTitle}
                    </span>
                    <span className="ml-auto hidden font-mono text-[10px] text-text lg:inline">
                      {String(softwareSkills.length).padStart(2, '0')}
                    </span>
                    <span
                      aria-hidden="true"
                      className={`ml-auto h-1.5 w-1.5 rounded-full transition-colors lg:hidden ${
                        isActive ? 'bg-accent' : 'bg-dark-3'
                      }`}
                    />
                  </button>
                );
              }
            )}
          </div>
          <p className="mt-3 hidden max-w-[13rem] text-xs leading-5 text-text lg:block">
            A mix of application development, data, and digital operations.
          </p>
        </nav>

        {activeSkill && (
          <Skill
            key={activeSkill.id}
            id={activeSkill.id}
            index={activeIndex + 1}
            title={activeSkill.title}
            points={activeSkill.points}
            skills={activeSkill.softwareSkills}
          />
        )}
      </div>
    </Wrapper>
  );
};

export default Skills;
