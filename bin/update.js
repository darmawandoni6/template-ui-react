import { exec } from 'child_process';
import ora from 'ora';

export const updateVersion = packageJson => {
  const spinner = ora('Checking for updates...☕').start();
  const command = `npm install -g ${packageJson.name}`;

  spinner.text = 'Express JS CLI is updating....';

  exec(command, error => {
    if (error) {
      spinner.fail('Failed to update Express JS CLI ❌');
    } else {
      spinner.succeed('Express JS CLI successfully updated! 🚀');
    }
  });
};
