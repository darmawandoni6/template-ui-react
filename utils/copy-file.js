import fs from 'fs';
import path from 'path';

export const copySetup = async (templatePath, currentDir) => {
  const filesToCreate = fs.readdirSync(templatePath);

  for (const file of filesToCreate) {
    if (['node_modules', '.next', 'yarn.lock'].includes(file)) continue;

    const origFilePath = path.join(templatePath, file);
    const targetPath = path.join(currentDir, file);
    const stats = fs.statSync(origFilePath);

    if (stats.isDirectory()) {
      fs.mkdirSync(targetPath, { recursive: true });
      copySetup(origFilePath, targetPath);
    } else {
      fs.mkdirSync(path.dirname(targetPath), { recursive: true });
      fs.copyFileSync(origFilePath, targetPath);
    }
  }
};
