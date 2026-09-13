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

async function askProjectDetails(projectName, options = {}) {
  const choices = getAvailableTemplates();

  if (choices.length === 0) {
    process.stdout.write(chalk.red('✖ ERROR : No templates found in repository.') + '\n');
    process.exit(1);
  }

  // Validate template option if provided
  if (options.template && !choices.includes(options.template)) {
    process.stdout.write(
      chalk.red(`✖ ERROR : Template "${options.template}" not found. Available templates: ${choices.join(', ')}`) +
        '\n',
    );
    process.exit(1);
  }

  // Validate package manager option if provided
  const validPms = ['yarn', 'pnpm', 'npm'];
  if (options.packageManager && !validPms.includes(options.packageManager)) {
    process.stdout.write(
      chalk.red(`✖ ERROR : Invalid package manager "${options.packageManager}". Supported: ${validPms.join(', ')}`) +
        '\n',
    );
    process.exit(1);
  }

  // Check if non-interactive mode should be used
  const isNonInteractive =
    Boolean(options.yes) || Boolean(options.template && (options.packageManager || options.install === false));

  if (isNonInteractive) {
    const selectedTemplate = options.template || (choices.includes('next-ts') ? 'next-ts' : choices[0]);
    const shouldInstall = options.install !== false;
    const packageManager = options.packageManager || 'yarn';

    return {
      projectName,
      'project-choice': selectedTemplate,
      shouldInstall,
      packageManager,
    };
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

    const prompts = [];

    if (!options.template) {
      prompts.push({
        type: 'list',
        name: 'project-choice',
        message: 'What project template would you like to generate?',
        choices,
        default: choices.includes('next-ts') ? 'next-ts' : choices[0],
      });
    }

    if (options.install === undefined) {
      prompts.push({
        type: 'confirm',
        name: 'shouldInstall',
        message: 'Do you want to install dependencies now?',
        default: true,
      });
    }

    if (!options.packageManager) {
      prompts.push({
        type: 'list',
        name: 'packageManager',
        message: 'Which package manager do you want to use?',
        choices: validPms,
        default: 'yarn',
        when: answers => (options.install !== undefined ? options.install : answers.shouldInstall) === true,
      });
    }

    const answers_II = prompts.length > 0 ? await inquirer.prompt(prompts) : {};

    return {
      projectName,
      'project-choice': options.template || answers_II['project-choice'],
      shouldInstall: options.install !== undefined ? options.install : answers_II.shouldInstall,
      packageManager: options.packageManager || answers_II.packageManager || 'yarn',
    };
  } catch (error) {
    if (error.isTtyError) {
      process.stdout.write(
        chalk.yellow('Prompt cannot be displayed on non-interactive terminal. Use flags (e.g. -t <template> -y).\n'),
      );
    } else {
      process.stdout.write('\nProgram stopped by user\n');
    }
    process.exit(0);
  }
}

export async function initProject(projectName, title, options = {}) {
  const targetDir = path.resolve(process.cwd(), projectName);

  if (fs.existsSync(targetDir)) {
    process.stdout.write(chalk.red(`✖ ERROR : Directory "${projectName}" already exists`) + '\n');
    process.exit(1);
  }

  const details = await askProjectDetails(projectName, options);

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
