import { readdirSync, statSync, writeFileSync } from "fs";
import { join } from "path";

const IGNORE_DIRS = ["node_modules", ".git", "dist", "build"];
const MAX_DEPTH = 3;

function generateTree(dirPath, depth = 0, prefix = "") {
  if (depth > MAX_DEPTH) return "";
  let tree = "";
  const items = readdirSync(dirPath).filter(
    (item) => !IGNORE_DIRS.includes(item)
  );

  items.forEach((item, index) => {
    const fullPath = join(dirPath, item);
    const isLast = index === items.length - 1;
    const pointer = isLast ? "└── " : "├── ";
    tree += `${prefix}${pointer}${item}\n`;

    if (statSync(fullPath).isDirectory()) {
      const newPrefix = prefix + (isLast ? "    " : "│   ");
      tree += generateTree(fullPath, depth + 1, newPrefix);
    }
  });

  return tree;
}

const rootPath = process.cwd(); // current directory
const tree = generateTree(rootPath);
writeFileSync("structure.txt", tree);
console.log("✅ structure.txt generated!");
