import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export const copyYarn = async template => {
  const file = 'yarn.lock';

  const src = path.join(__dirname, `../templates/${template}/${file}`);
  const dest = path.join(process.cwd(), file);

  fs.mkdirSync(path.dirname(dest), { recursive: true });
  const content = fs.readFileSync(src, 'utf-8');
  fs.writeFileSync(dest, content, 'utf-8');
};
