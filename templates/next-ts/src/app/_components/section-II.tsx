'use client';

import { useStore } from '../../store/provider';

const SectionII = () => {
  const store = useStore(state => state.counter);

  console.log('SectionI');

  return (
    <button className="bg-foreground text-background flex h-12 w-full items-center justify-center gap-2 rounded-full px-5 transition-colors hover:bg-[#383838] md:w-[158px] dark:hover:bg-[rgb(204,204,204)]">
      {store}
    </button>
  );
};

export default SectionII;
