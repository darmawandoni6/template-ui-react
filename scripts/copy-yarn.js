import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export const copyYarn = async template => {
  const file = 'yarn.lock';
  const src = path.join(__dirname, `../templates/${template}/${file}`);
  const dest = path.join(process.cwd(), file);

  if (fs.existsSync(src)) {
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.copyFileSync(src, dest);
  }
};
