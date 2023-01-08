import * as fs from "fs";
import * as ejs from "ejs";

const CURR_DIR = process.cwd();

export function render(content, data) {
  return ejs.render(content, data);
}

const createDirectoryContents = (templatePath, newProjectPath, route) => {
  const filesToCreate = fs.readdirSync(templatePath);
  filesToCreate.forEach((file) => {
    const origFilePath = `${templatePath}/${file}`;

    // get stats about the current file
    const stats = fs.statSync(origFilePath);

    if (stats.isFile()) {
      let contents = fs.readFileSync(origFilePath, "utf8");
      contents = render(contents, { projectName: newProjectPath });

      // Rename
      if (file === ".npmignore") file = ".gitignore";

      const writePath = `${route}/${file}`;
      fs.writeFileSync(writePath, contents, "utf8");
    } else if (stats.isDirectory()) {
      fs.mkdirSync(`${route}/${file}`, { recursive: true });

      // recursive call
      createDirectoryContents(
        `${templatePath}/${file}`,
        `${newProjectPath}/${file}`,
        `${route}/${file}`
      );
    }
  });
};

export default createDirectoryContents;
