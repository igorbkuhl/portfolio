import { execSync } from "child_process";
// import { readFileSync } from "fs";

// const packageFile = readFileSync("package.json", { encoding: "utf8", flag: 'r' });
// const jsonFile = JSON.parse(packageFile);
// const dependencies = jsonFile.dependencies;
// const devDependencies = jsonFile.devDependencies;
// const packages = [...Object.keys(dependencies), ...Object.keys(devDependencies)];

const deps = [
  "@heroicons/react",
  "@supabase/ssr",
  "@supabase/supabase-js",
  "color",
  "html2canvas",
  "lucide-react",
  "next",
  "next-intl",
  "next-themes",
  "react",
  "react-dom",
  "sharp",
];
const devdeps = [
  "@tailwindcss/postcss",
  "@types/node",
  "@types/react",
  "@types/react-dom",
  "eslint",
  "eslint-config-next",
  "postcss",
  "tailwindcss",
  "typescript"
];
deps.forEach(pkg => {
  execSync(`bun install --legacy-peer-deps ${pkg}`);
});
devdeps.forEach(pkg => {
  execSync(`bun install --save-dev --legacy-peer-deps ${pkg}`);
});

