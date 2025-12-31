import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

import { copySetup } from '../utils/copy-file.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

export const setupProject = async (projectName, template) => {
  const templatePath = path.join(__dirname, `../templates/${template}`);

  await copySetup(templatePath, '.');
  const filePath = 'package.json';

  const packageJsonPath = 'package.json';
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

  packageJson.name = projectName;
  packageJson.version = '0.0.1';
  packageJson.description = `This is a ${projectName} project`;

  fs.writeFileSync(filePath, JSON.stringify(packageJson, null, 2));
};
