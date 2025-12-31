import { execSync } from 'child_process';

export const hasPackageManager = type => {
  try {
    execSync(`${type} --version`, { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
};
