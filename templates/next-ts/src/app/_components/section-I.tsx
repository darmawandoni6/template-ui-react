'use client';

import { useSetStore } from '../../store/provider';

const SectionI = () => {
  const setStore = useSetStore();
  console.log('SectionI');

  return (
    <button
      className="bg-foreground text-background flex h-12 w-full items-center justify-center gap-2 rounded-full px-5 transition-colors hover:bg-[#383838] md:w-[158px] dark:hover:bg-[rgb(204,204,204)]"
      onClick={() => setStore(prev => ({ counter: prev.counter + 1 }))}
    >
      Counter
    </button>
  );
};

export default SectionI;
