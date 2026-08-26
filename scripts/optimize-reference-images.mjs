import { access, mkdir, readdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const sourceRoot = path.resolve("public/references");
const outputRoot = path.resolve("public/references-optimized");
const supportedExtensions = new Set([".jpg", ".jpeg", ".png"]);

async function collectFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(entries.map(async (entry) => {
    const absolutePath = path.join(directory, entry.name);
    return entry.isDirectory() ? collectFiles(absolutePath) : [absolutePath];
  }));
  return files.flat();
}

const sourceFiles = (await collectFiles(sourceRoot)).filter((file) =>
  supportedExtensions.has(path.extname(file).toLowerCase()),
);

let converted = 0;
for (const sourceFile of sourceFiles) {
  const relativePath = path.relative(sourceRoot, sourceFile);
  const outputFile = path.join(outputRoot, `${relativePath}.webp`);
  try {
    await access(outputFile);
    converted += 1;
    continue;
  } catch {
    // Missing variants are generated below; existing files make repeated runs fast.
  }
  await mkdir(path.dirname(outputFile), { recursive: true });
  await sharp(sourceFile, { limitInputPixels: false, density: 144 })
    .rotate()
    .resize({ width: 1920, height: 1920, fit: "inside", withoutEnlargement: true })
    .webp({ quality: 78, effort: 2, smartSubsample: true })
    .toFile(outputFile);
  converted += 1;
}

console.log(`Optimized ${converted} reference images into ${outputRoot}`);
