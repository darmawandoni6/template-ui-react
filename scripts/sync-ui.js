import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const SOURCE_UI_DIR = path.resolve(__dirname, '../packages/ui');

/**
 * Manifest defining which UI components are required by each template.
 * Source of truth is always `packages/ui/`.
 */
const TEMPLATE_COMPONENTS = {
  'next-ts': [
    'alert-dialog.tsx',
    'badge.tsx',
    'button.tsx',
    'card.tsx',
    'checkbox.tsx',
    'dialog.tsx',
    'error-form.tsx',
    'input.tsx',
    'label.tsx',
  ],
  'next-dashboard': [
    'alert-dialog.tsx',
    'avatar.tsx',
    'badge.tsx',
    'breadcrumb.tsx',
    'button.tsx',
    'card.tsx',
    'checkbox.tsx',
    'dialog.tsx',
    'dropdown-menu.tsx',
    'error-form.tsx',
    'input.tsx',
    'label.tsx',
    'separator.tsx',
    'sheet.tsx',
    'sidebar.tsx',
    'skeleton.tsx',
    'table.tsx',
    'tooltip.tsx',
  ],
};

export function syncUI() {
  if (!fs.existsSync(SOURCE_UI_DIR)) {
    console.error(`[sync-ui] Source UI directory not found at: ${SOURCE_UI_DIR}`);
    process.exit(1);
  }

  for (const [template, components] of Object.entries(TEMPLATE_COMPONENTS)) {
    const destDir = path.resolve(__dirname, `../templates/${template}/src/components/ui`);
    fs.mkdirSync(destDir, { recursive: true });

    // Clean up any stale component files that this template does not use
    const existingFiles = fs.readdirSync(destDir);
    const targetFiles = new Set([...components, 'index.ts']);

    for (const file of existingFiles) {
      if (!targetFiles.has(file)) {
        fs.unlinkSync(path.join(destDir, file));
      }
    }

    // Copy required component files from canonical packages/ui
    const exportedModules = [];
    for (const componentFile of components) {
      const srcFile = path.join(SOURCE_UI_DIR, componentFile);
      const destFile = path.join(destDir, componentFile);

      if (!fs.existsSync(srcFile)) {
        console.warn(`[sync-ui] Warning: Component ${componentFile} not found in packages/ui`);
        continue;
      }

      fs.copyFileSync(srcFile, destFile);
      const moduleName = componentFile.replace(/\.(tsx|ts)$/, '');
      exportedModules.push(moduleName);
    }

    // Auto-generate template-specific index.ts
    const indexContent = exportedModules
      .sort()
      .map(mod => `export * from './${mod}';`)
      .join('\n')
      .concat('\n');

    fs.writeFileSync(path.join(destDir, 'index.ts'), indexContent, 'utf-8');

    console.log(`✓ Synced ${exportedModules.length} UI components to templates/${template}/src/components/ui`);
  }
}

// Run directly when executed from CLI
if (process.argv[1] === __filename) {
  syncUI();
}
