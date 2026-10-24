import { Icon } from '@iconify/react';

type Props = {
  src: string;
  name: string;
};

const SkillIcon = ({ src, name }: Props) => {
  return (
    <div className="group/technology flex min-w-0 items-center gap-3 border-b border-dark-3/35 py-3 transition-colors duration-200 motion-reduce:transition-none hover:border-accent/50">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-dark-3/40 bg-bg text-dark-2 transition duration-200 motion-reduce:transition-none group-hover/technology:border-accent/40 group-hover/technology:text-accent">
        <Icon aria-hidden="true" icon={src} width="20" height="20" />
      </span>
      <span className="min-w-0 truncate text-sm font-medium capitalize text-dark-2 transition-colors motion-reduce:transition-none group-hover/technology:text-accent sm:text-base">
        {name}
      </span>
    </div>
  );
};

export default SkillIcon;
