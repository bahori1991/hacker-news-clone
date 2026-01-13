import { readdirSync } from "node:fs";
import { extname, join, relative } from "node:path";

function getAllTsFiles(baseDir: string): string[] {
  const files: string[] = [];
  const entries = readdirSync(baseDir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = join(baseDir, entry.name);
    if (entry.isDirectory()) {
      files.push(...getAllTsFiles(fullPath));
    } else if (
      entry.isFile() &&
      (extname(entry.name) === ".ts" ||
        extname(entry.name) === ".tsx" ||
        extname(entry.name) === ".css")
    ) {
      files.push(fullPath);
    }
  }

  return files;
}

export function getEntryFiles(baseDir: string) {
  const tsFiles = getAllTsFiles(baseDir);
  const entry = Object.fromEntries(
    tsFiles.map((file) => {
      const relativePath = relative(baseDir, file).replace(extname(file), "");
      return [relativePath, file];
    }),
  );
  return entry;
}
