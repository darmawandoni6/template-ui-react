import type { FC, ReactNode } from 'react';

import styles from './styles.module.scss';

const AuthLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <main className={styles.main}>
      <div className={styles.__form}>{children}</div>
    </main>
  );
};

export default AuthLayout;
