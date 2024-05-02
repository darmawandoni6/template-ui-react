import type { FC, ReactNode } from 'react';

import AuthLayout from '@src/components/Layout/AuthLayout';

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  return <AuthLayout>{children}</AuthLayout>;
};

export default Layout;
