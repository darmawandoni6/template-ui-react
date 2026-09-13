import chalk from 'chalk';
import fs from 'fs';
import inquirer from 'inquirer';
import ora from 'ora';
import path, { dirname } from 'path';
import shell from 'shelljs';
import { fileURLToPath } from 'url';

import { copyYarn } from '../scripts/copy-yarn.js';
import { setupProject } from '../scripts/setup-project.js';
import centerText from '../utils/center-text.js';
import { hasPackageManager } from '../utils/has-pkg-manager.js';
import { runCommandWithBuilder } from '../utils/run-command.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const TEMPLATES_DIR = path.join(__dirname, '../templates');

function getAvailableTemplates() {
  if (!fs.existsSync(TEMPLATES_DIR)) return [];

  return fs.readdirSync(TEMPLATES_DIR).filter(file => {
    const fullPath = path.join(TEMPLATES_DIR, file);
    return fs.statSync(fullPath).isDirectory() && !file.startsWith('.') && file !== 'node_modules';
  });
}

async function askProjectDetails(projectName) {
  const choices = getAvailableTemplates();

  if (choices.length === 0) {
    process.stdout.write(chalk.red('✖ ERROR : No templates found in repository.') + '\n');
    process.exit(1);
  }

  try {
    const answers = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'template',
        message: 'Install React template?',
        default: true,
      },
    ]);

    if (!answers.template) {
      process.stdout.write('\nProgram stopped by user\n');
      process.exit(0);
    }

    const answers_II = await inquirer.prompt([
      {
        type: 'list',
        name: 'project-choice',
        message: 'What project template would you like to generate?',
        choices,
        default: choices.includes('next-ts') ? 'next-ts' : choices[0],
      },
      {
        type: 'confirm',
        name: 'shouldInstall',
        message: 'Do you want to install dependencies now?',
        default: true,
      },
      {
        type: 'list',
        name: 'packageManager',
        message: 'Which package manager do you want to use?',
        choices: ['yarn', 'pnpm', 'npm'],
        default: 'yarn',
        when: answers => answers.shouldInstall === true,
      },
    ]);

    return { projectName, ...answers_II };
  } catch (error) {
    if (error.isTtyError) {
      process.stdout.write('Prompt cannot be displayed on this terminal.\n');
    } else {
      process.stdout.write('\nProgram stopped by user\n');
    }
    process.exit(0);
  }
}

export async function initProject(projectName, title) {
  const targetDir = path.resolve(process.cwd(), projectName);

  if (fs.existsSync(targetDir)) {
    process.stdout.write(chalk.red(`✖ ERROR : Directory "${projectName}" already exists`) + '\n');
    process.exit(1);
  }

  const details = await askProjectDetails(projectName);

  console.log(chalk.green('\nInstallation in progress... ☕\n'));
  const spinner = ora();

  try {
    shell.mkdir('-p', targetDir);
    shell.cd(targetDir);

    // Setup template files
    spinner.text = 'Setting up project files...';
    spinner.start();

    await setupProject(projectName, details['project-choice']);

    spinner.succeed(chalk.green(`Setup project ${projectName} succeeded! 🎉`));

    // Install dependencies
    if (details.shouldInstall) {
      const pm = details.packageManager || 'npm';

      if (hasPackageManager(pm)) {
        if (pm === 'yarn') {
          await copyYarn(details['project-choice']);
        }

        spinner.text = `Installing dependencies using ${pm}...`;
        spinner.start();
        await runCommandWithBuilder(`${pm} install`);
        spinner.succeed(chalk.green(`Installed dependencies successfully! 🎉`));
      } else {
        spinner.info(chalk.yellow(`${pm} is not installed globally. Skipping auto-install.`));
      }
    }

    const runCmd = details.packageManager === 'npm' ? 'npm run dev' : `${details.packageManager || 'npm'} dev`;
    const installCmd = details.packageManager === 'npm' ? 'npm install' : `${details.packageManager || 'npm'} install`;

    process.stdout.write(`\nNext steps:\n`);
    process.stdout.write(chalk.cyan(`\n  cd ${projectName}`));
    if (!details.shouldInstall) {
      process.stdout.write(chalk.cyan(`\n  ${installCmd}`));
    }
    process.stdout.write(chalk.cyan(`\n  ${runCmd}\n\n`));

    process.stdout.write(chalk.green(centerText(`Thank you for using ${title} CLI!`)) + '\n');
    process.stdout.write(chalk.yellow(centerText('Happy coding! 🚀')) + '\n\n');
  } catch (error) {
    spinner.fail(`Failed to create project: ${error.message}`);
    process.exit(1);
  }
}
