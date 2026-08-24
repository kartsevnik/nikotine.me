/**
 * Generate WebP previews for portfolio screenshots.
 * Run: npm install && npm run optimize:portfolio-images
 */
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const MAX_WIDTH = 1280;
const QUALITY = 82;

const FOLDERS = [
  "img/resume/portfolio/pcf-status-action-button",
  "img/resume/portfolio/pcf-custom-text-input-tooltip",
  "img/resume/portfolio/angular-moviepulse",
  "img/resume/portfolio/angular-contracts",
];

const IMAGE_EXT = new Set([".png", ".jpg", ".jpeg", ".webp"]);

async function optimizeFolder(relativeFolder) {
  const sourceDir = path.join(ROOT, relativeFolder);
  const outputDir = path.join(sourceDir, "web");
  await fs.mkdir(outputDir, { recursive: true });

  const entries = await fs.readdir(sourceDir, { withFileTypes: true });
  const files = entries
    .filter(function (entry) {
      if (!entry.isFile()) return false;
      const ext = path.extname(entry.name).toLowerCase();
      return IMAGE_EXT.has(ext);
    })
    .map(function (entry) {
      return entry.name;
    })
    .sort(function (a, b) {
      return a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" });
    });

  let totalIn = 0;
  let totalOut = 0;

  for (const fileName of files) {
    const inputPath = path.join(sourceDir, fileName);
    const baseName = path.basename(fileName, path.extname(fileName));
    const outputPath = path.join(outputDir, baseName + ".webp");

    const inputStat = await fs.stat(inputPath);
    totalIn += inputStat.size;

    await sharp(inputPath)
      .rotate()
      .resize({ width: MAX_WIDTH, withoutEnlargement: true })
      .webp({ quality: QUALITY })
      .toFile(outputPath);

    const outputStat = await fs.stat(outputPath);
    totalOut += outputStat.size;

    console.log(
      relativeFolder +
        "/" +
        fileName +
        " -> web/" +
        baseName +
        ".webp (" +
        Math.round(outputStat.size / 1024) +
        " KB)"
    );
  }

  return { files: files.length, totalIn, totalOut };
}

let grandIn = 0;
let grandOut = 0;
let grandFiles = 0;

for (const folder of FOLDERS) {
  const result = await optimizeFolder(folder);
  grandIn += result.totalIn;
  grandOut += result.totalOut;
  grandFiles += result.files;
}

console.log(
  "\nDone: " +
    grandFiles +
    " images, " +
    Math.round(grandIn / 1024) +
    " KB in -> " +
    Math.round(grandOut / 1024) +
    " KB out"
);
