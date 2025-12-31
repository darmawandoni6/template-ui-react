import chalk from 'chalk';
import fs from 'fs';
import inquirer from 'inquirer';
import ora from 'ora';
import path from 'path';
import shell from 'shelljs';

import { copyYarn } from '../scripts/copy-yarn.js';
import { setupProject } from '../scripts/setup-project.js';
import centerText from '../utils/center-text.js';
import { hasPackageManager } from '../utils/has-pkg-manager.js';
import { runCommandWithBuilder } from '../utils/run-command.js';

const CHOICES = fs.readdirSync(path.join(process.cwd(), '/templates'));

async function askProjectDetails(projectName) {
  try {
    const answers = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'template',
        message: 'install template react?',
        default: true,
      },
    ]);
    if (!answers.template) {
      process.stdout.write('\nProgram is stopped by user\n');
      process.exit(0);
    }

    const answers_II = await inquirer.prompt([
      {
        type: 'list',
        name: 'project-choice',
        message: 'What project template would you like to generate?',
        choices: CHOICES,
      },
      {
        type: 'confirm',
        name: 'shouldInstall',
        message: 'Do you want to install dependencies now, or did you just copy the template?',
        default: true,
      },
      {
        type: 'list',
        name: 'packageManager',
        message: 'Which package manager do you want to use?',
        choices: ['npm', 'yarn', 'pnpm'],
        default: 'yarn',
        when: answers => answers.shouldInstall === true,
      },
    ]);

    return { projectName, ...answers_II };
  } catch (error) {
    if (error.isTtyError) {
      process.stdout.write('Prompt cannot be displayed on this terminal.');
    } else {
      process.stdout.write('\nProgram is stopped by user\n');
    }
    process.exit(0);
  }
}

export async function initProject(projectName, title) {
  if (fs.existsSync(projectName)) {
    process.stdout.write(chalk.red('✖ ERROR : Project already exists') + `\n`);
    process.exit(1);
  }

  const details = await askProjectDetails(projectName);

  console.log(chalk.green('Installation in progress... ☕'));
  const spinner = ora();

  try {
    shell.mkdir(projectName);

    shell.cd(projectName);

    // setup project
    spinner.text = 'setup project...';
    spinner.start();

    await setupProject(projectName, details['project-choice']);

    spinner.succeed(chalk.green(`Setup project ${projectName} success! 🎉`));

    // Install dependencies ONLY if user confirms
    if (details.shouldInstall) {
      if (hasPackageManager(details.packageManager)) {
        // Copy yarn.lock ONLY if yarn is selected
        if (details.packageManager === 'yarn') {
          await copyYarn(details['project-choice']);
        }

        spinner.text = 'install all dependencies...';
        spinner.start();
        await runCommandWithBuilder(`${details.packageManager} install`);
        spinner.succeed(chalk.green(`install dependencies success! 🎉`));
      } else {
        details.shouldInstall = true;
        spinner.info(chalk.yellow(`${details.packageManager} is not installed. Skipping install.`));
      }
    }

    process.stdout.write(`\nNext steps:\n`);
    process.stdout.write(chalk.cyan(`\n$ cd ${projectName}`));
    if (!details.shouldInstall) {
      process.stdout.write(chalk.cyan(`\n$ yarn install`));
    }
    process.stdout.write(chalk.cyan(`\n$ yarn dev\n`));

    process.stdout.write('\n\n');
    process.stdout.write(chalk.green(centerText(`Thank you for using ${title} CLI!`)) + '\n');
    process.stdout.write(chalk.yellow(centerText('Happy coding! 🚀')) + '\n\n');
  } catch (error) {
    spinner.fail(`Failed to create project: ${error.message}`);
    process.exit(1);
  }
}
