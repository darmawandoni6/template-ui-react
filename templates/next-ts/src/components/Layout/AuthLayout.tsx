'use client';

import { type FC, type ReactNode, useEffect } from 'react';

import styles from './styles.module.scss';

const AuthLayout: FC<{ children: ReactNode }> = ({ children }) => {
  useEffect(() => {
    console.log('AuthLayout');
  }, []);
  return (
    <main className={styles.main}>
      <div className={styles.__form}>{children}</div>
    </main>
  );
};

export default AuthLayout;
