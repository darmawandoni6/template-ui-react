import { useContext } from 'react';

import { Context } from './ContexProvider';

const useProviders = () => {
  const ct = useContext(Context);

  if (!ct) {
    throw new Error('Mising context providers');
  }

  return ct;
};

export default useProviders;
