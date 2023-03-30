import fs from 'fs';

const sourceDirectory = __dirname + "/..";
const destinationDirectory = __dirname;

const main = () => {
  const source = fs.readFileSync(__dirname + "/../package.json").toString("utf-8");
  const sourceObj = JSON.parse(source);
  sourceObj.scripts = {};
  sourceObj.devDependencies = {};
  fs.writeFileSync(`${destinationDirectory}/package.json`, Buffer.from(JSON.stringify(sourceObj, null, 2), "utf-8"));
  const filesToCopy = ["README.md", "LICENSE.md", ".npmignore"];
  filesToCopy.forEach(file => fs.copyFileSync(`${sourceDirectory}/${file}`, `${destinationDirectory}/${file}`));
}

main();
