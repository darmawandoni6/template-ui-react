import chalk from 'chalk';

export const actionInfo = packageJson => {
  process.stdout.write(`Name: ${packageJson.name}\n`);
  process.stdout.write(`Version: ${packageJson.version}\n`);
  process.stdout.write(`Author: ${packageJson.author}\n`);
  process.stdout.write(`Description: ${packageJson.description}\n`);
  process.stdout.write(`License: ${packageJson.license}\n`);
  process.stdout.write(`Fund me: ` + chalk.cyan(`https://github.com/darmawandoni6\n\n`));
};
