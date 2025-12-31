'use client';

import { useSetStore, useStore } from '../../store/provider';

const SectionIII = () => {
  console.log('SectionIII');

  const store = useStore(state => state.get);
  const setStore = useSetStore();

  return (
    <button
      className="bg-foreground text-background flex h-12 w-full items-center justify-center gap-2 rounded-full px-5 transition-colors hover:bg-[#383838] md:w-[158px] dark:hover:bg-[rgb(204,204,204)]"
      onClick={() => setStore(prev => ({ ...prev, get: prev.get + 1 }))}
    >
      {`Hello + ${store}`}
    </button>
  );
};

export default SectionIII;
