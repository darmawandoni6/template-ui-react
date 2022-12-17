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

inquirer.prompt(QUESTIONS).then((answers) => {
  try {
    const name = __dirname.match(/([^\/]*)\/*$/)[1];

    const projectChoice = answers["project-choice"];
    const projectName =
      answers["project-name"] === "." ? name : answers["project-name"];
    const templatePath = `${__dirname}/templates/${projectChoice}`;
    fs.mkdirSync(`${CURR_DIR}/${projectName}`);
    createDirectoryContents(templatePath, projectName);
    console.log(`cd ${projectName} && npm install`);
  } catch (error) {
    console.log(error.message);
    return error.message;
  }
});
