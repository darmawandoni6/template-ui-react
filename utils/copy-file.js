import fs from 'fs';
import path from 'path';

const IGNORED_FILES = new Set(['node_modules', '.next', 'dist', 'build', 'coverage', '.DS_Store', 'yarn.lock']);

/**
 * Recursively copy template files to target directory
 */
export const copySetup = async (templatePath, currentDir) => {
  if (!fs.existsSync(templatePath)) {
    throw new Error(`Template directory "${templatePath}" does not exist`);
  }

  const filesToCreate = fs.readdirSync(templatePath);

  for (const file of filesToCreate) {
    if (IGNORED_FILES.has(file)) continue;

    const origFilePath = path.join(templatePath, file);
    const targetPath = path.join(currentDir, file);
    const stats = fs.statSync(origFilePath);

    if (stats.isDirectory()) {
      fs.mkdirSync(targetPath, { recursive: true });
      await copySetup(origFilePath, targetPath);
    } else {
      fs.mkdirSync(path.dirname(targetPath), { recursive: true });
      fs.copyFileSync(origFilePath, targetPath);
    }
  }
};
