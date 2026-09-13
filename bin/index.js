#!/usr/bin/env node
import { Command } from 'commander';
import fs from 'fs';

import { actionInfo } from './info.js';
import { initProject } from './init-project.js';
import { updateVersion } from './update.js';

const program = new Command();
const packageJson = JSON.parse(fs.readFileSync(new URL('../package.json', import.meta.url), 'utf8'));

// init new project
program
  .command('new <project-name>')
  .description('Create a new template project')
  .option('-t, --template <template-name>', 'Specify project template (e.g. next-ts, next-dashboard)')
  .option('--pm, --package-manager <package-manager>', 'Specify package manager (yarn, pnpm, npm)')
  .option('-y, --yes', 'Skip interactive prompts and use default settings')
  .option('--no-install', 'Skip installing dependencies')
  .action((projectName, options) => initProject(projectName, packageJson.name, options));

// information cli
program.option('-i, --info', `Display information about ${packageJson.name}`).action(() => actionInfo(packageJson));

// update cli to latest
program
  .command('update')
  .description(`Update ${packageJson.name} to the latest version`)
  .action(() => updateVersion(packageJson));

// version cli
program.version(packageJson.version, '-v, --version', `Display the current version of ${packageJson.name}`);

program.parse(process.argv);
