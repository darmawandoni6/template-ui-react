import * as fs from "fs";
import * as ejs from "ejs";

export function render(content, data) {
  return ejs.render(content, data);
}

const createDirectoryContents = (templatePath, newProjectPath, route) => {
  const filesToCreate = fs.readdirSync(templatePath);
  filesToCreate.forEach((file) => {
    const origFilePath = `${templatePath}/${file}`;

    // get stats about the current file
    const stats = fs.statSync(origFilePath);
    let opt = "utf8";

    if (stats.isFile()) {
      if (/\.(gif|jpe?g|tiff?|png|webp|bmp)$/i.test(file)) {
        opt = { encoding: "binary" };
      }

      let contents = fs.readFileSync(origFilePath, opt);

      if (file === "package.json")
        contents = render(contents, { projectName: newProjectPath });

      // Rename
      if (file === ".npmignore") file = ".gitignore";

      const writePath = `${route}/${file}`;
      fs.writeFileSync(writePath, contents, opt);
    } else if (stats.isDirectory()) {
      fs.mkdirSync(`${route}/${file}`, { recursive: true });

      // recursive call
      createDirectoryContents(
        `${templatePath}/${file}`,
        `${newProjectPath}/${file}`,
        `${route}/${file}`,
      );
    }
  });
};

export default createDirectoryContents;
