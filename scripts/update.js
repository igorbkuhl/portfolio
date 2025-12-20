import { execSync } from "child_process";
import { readFileSync } from "fs";

const packageFile = readFileSync("package.json", { encoding: "utf8", flag: 'r' });
const jsonFile = JSON.parse(packageFile);
const dependencies = jsonFile.dependencies;
const devDependencies = jsonFile.devDependencies;
const packages = [...Object.keys(dependencies), ...Object.keys(devDependencies)];

packages.forEach(pkg => {
  execSync(`bun install ${pkg}@latest`);
});
