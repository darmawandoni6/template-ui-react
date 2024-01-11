#!/usr/bin/env node

import inquirer from "inquirer";
import * as fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import createDirectoryContents from "./createDirectoryContents.js";
import { validateNpmName } from "./helpers/validateName.js";
const CURR_DIR = process.cwd();
const __dirname = dirname(fileURLToPath(import.meta.url));

const CHOICES = fs.readdirSync(`${__dirname}/templates`);

const QUESTIONS = [
  {
    name: "project-choice",
    type: "list",
    message: "What project template would you like to generate?",
    choices: CHOICES,
  },
  {
    name: "project-name",
    type: "input",
    message: "Project name:",
    default: "my-app",
    validate: (name) => {
      const validation = validateNpmName(path.basename(path.resolve(name)));
      if (validation.valid) {
        return true;
      }
      console.log(validation);
      return "Invalid project name: " + validation.problems[0];
    },
  },
];

console.log({ QUESTIONS });
inquirer.prompt(QUESTIONS).then((answers) => {
  try {
    const projectChoice = answers["project-choice"];

    let projectName = answers["project-name"];
    const templatePath = `${__dirname}/templates/${projectChoice}`;
    let route = `${CURR_DIR}/${projectName}`;

    if (answers["project-name"] === ".") {
      const name = CURR_DIR.match(/([^\/]*)\/*$/)[1];
      projectName = name;
      route = CURR_DIR;
    } else {
      fs.mkdirSync(route);
    }

    createDirectoryContents(templatePath, projectName, route);

    console.log(`cd ${projectName} && npm install`);
  } catch (error) {
    console.log(error.message);
    return error.message;
  }
});
