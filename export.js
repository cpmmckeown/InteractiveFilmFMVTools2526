// export.js
// Exports interactive film project in two ways:
// 1. Standalone HTML (inline JSON, double-click safe)
// 2. Folder export (runtime + JSON + media copied to /export)

const fs = require("fs");
const path = require("path");

const RUNTIME_FILE = path.join(__dirname, "runtime.html");
const PROJECT_FILE = path.join(__dirname, "project.json");
const MEDIA_DIR = path.join(__dirname, "media"); // adjust if needed
const EXPORT_DIR = path.join(__dirname, "export");

function exportStandalone() {
  try {
    let runtimeHtml = fs.readFileSync(RUNTIME_FILE, "utf-8");
    let projectJson = fs.readFileSync(PROJECT_FILE, "utf-8");

    const inlineScript = `
<script id="projectData" type="application/json">
${projectJson}
</script>
`;

    runtimeHtml = runtimeHtml.replace(/<video/i, inlineScript + "\n  <video");

    const outputFile = path.join(__dirname, "standalone.html");
    fs.writeFileSync(outputFile, runtimeHtml, "utf-8");

    console.log("✅ Standalone export complete: " + outputFile);
  } catch (err) {
    console.error("❌ Standalone export failed:", err);
  }
}

function exportFolder() {
  try {
    // Clear and recreate export dir
    if (fs.existsSync(EXPORT_DIR)) {
      fs.rmSync(EXPORT_DIR, { recursive: true, force: true });
    }
    fs.mkdirSync(EXPORT_DIR);

    // Copy runtime + project.json
    fs.copyFileSync(RUNTIME_FILE, path.join(EXPORT_DIR, "runtime.html"));
    fs.copyFileSync(PROJECT_FILE, path.join(EXPORT_DIR, "project.json"));

    // Copy media if exists
    if (fs.existsSync(MEDIA_DIR)) {
      copyRecursiveSync(MEDIA_DIR, path.join(EXPORT_DIR, "media"));
    }

    console.log("✅ Folder export complete: " + EXPORT_DIR);
  } catch (err) {
    console.error("❌ Folder export failed:", err);
  }
}

// Utility: recursive copy
function copyRecursiveSync(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  fs.readdirSync(src).forEach(file => {
    const srcPath = path.join(src, file);
    const destPath = path.join(dest, file);

    if (fs.lstatSync(srcPath).isDirectory()) {
      copyRecursiveSync(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  });
}

// Run both exports
exportStandalone();
exportFolder();
