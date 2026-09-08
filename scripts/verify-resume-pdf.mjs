/**
 * Smoke-test: generate CV PDFs for en/it/ru/uk via pdfmake + resume content.
 * Usage: node scripts/verify-resume-pdf.mjs
 */
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const PdfPrinter = require("pdfmake");

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const outDir = path.join(root, "scripts", "pdf-smoke");

function loadBrowserScript(filePath, sandbox) {
  const code = fs.readFileSync(filePath, "utf8");
  vm.runInNewContext(code, sandbox, { filename: filePath });
}

function loadVfs() {
  const code = fs.readFileSync(
    path.join(root, "js", "vendor", "resume-pdf-vfs.js"),
    "utf8"
  );
  const sandbox = { self: {}, resumePdfFonts: null };
  sandbox.self = sandbox;
  vm.runInNewContext(code, sandbox, { filename: "resume-pdf-vfs.js" });
  if (!sandbox.resumePdfFonts) {
    throw new Error("resumePdfFonts not loaded");
  }
  return sandbox.resumePdfFonts;
}

function loadResumePdfModule() {
  const code = fs.readFileSync(path.join(root, "js", "resume-pdf.js"), "utf8");
  const sandbox = {
    window: {},
    console,
  };
  vm.runInNewContext(code, sandbox, { filename: "resume-pdf.js" });
  if (!sandbox.window.resumePdf) {
    throw new Error("resumePdf API not exposed");
  }
  return sandbox.window.resumePdf;
}

async function main() {
  console.log("Loading fonts…");
  const fontsPack = loadVfs();
  const fontMap = {
    Manrope: {
      normal: Buffer.from(fontsPack.vfs["Manrope-Regular.ttf"], "base64"),
      bold: Buffer.from(fontsPack.vfs["Manrope-Regular.ttf"], "base64"),
      italics: Buffer.from(fontsPack.vfs["Manrope-Regular.ttf"], "base64"),
      bolditalics: Buffer.from(fontsPack.vfs["Manrope-Regular.ttf"], "base64"),
    },
    EBGaramond: {
      normal: Buffer.from(fontsPack.vfs["EBGaramond-Medium.ttf"], "base64"),
      bold: Buffer.from(fontsPack.vfs["EBGaramond-SemiBold.ttf"], "base64"),
      italics: Buffer.from(fontsPack.vfs["EBGaramond-Medium.ttf"], "base64"),
      bolditalics: Buffer.from(fontsPack.vfs["EBGaramond-SemiBold.ttf"], "base64"),
    },
  };

  console.log("Loading resume content…");
  const contentSandbox = { window: {} };
  for (const lang of ["en", "it", "ru", "uk"]) {
    loadBrowserScript(
      path.join(root, `js/resume-content-${lang}.js`),
      contentSandbox
    );
  }
  loadBrowserScript(path.join(root, "js/resume-content.js"), contentSandbox);

  const resumePdf = loadResumePdfModule();
  const printer = new PdfPrinter(fontMap);
  fs.mkdirSync(outDir, { recursive: true });

  const langs = ["en", "it", "ru", "uk"];
  for (const lang of langs) {
    const content = contentSandbox.window.resumeContent[lang];
    if (!content) throw new Error("Missing content for " + lang);
    console.log("Building", lang, "…");
    const doc = resumePdf.buildDocDefinition(content, lang);
    // Drop browser-only background helper if PdfPrinter chokes on it
    delete doc.background;
    const pdfDoc = printer.createPdfKitDocument(doc);
    const fileName = resumePdf.getFileName(lang);
    const outPath = path.join(outDir, fileName);
    await new Promise((resolve, reject) => {
      const chunks = [];
      const timer = setTimeout(() => {
        reject(new Error("Timeout generating " + fileName));
      }, 30000);
      pdfDoc.on("data", (c) => chunks.push(c));
      pdfDoc.on("end", () => {
        clearTimeout(timer);
        fs.writeFileSync(outPath, Buffer.concat(chunks));
        resolve();
      });
      pdfDoc.on("error", (err) => {
        clearTimeout(timer);
        reject(err);
      });
      pdfDoc.end();
    });
    const size = fs.statSync(outPath).size;
    console.log(`OK ${fileName} (${size} bytes)`);
    if (size < 5000) throw new Error("PDF too small: " + fileName);
  }

  const ru = contentSandbox.window.resumeContent.ru;
  const sample = ru.heroLead[0];
  if (!/[А-Яа-яЁёІіЇїЄє]/.test(sample)) {
    throw new Error("RU content missing Cyrillic");
  }
  console.log("Cyrillic sample OK:", sample.slice(0, 48) + "…");
  console.log("All language PDFs generated in", outDir);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
