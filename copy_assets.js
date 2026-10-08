const fs = require('fs');
const path = require('path');

const srcDir = `C:\\Users\\abeet\\.gemini\\antigravity-ide\\brain\\59ce4244-af52-4d7f-a03f-8a75cef51d6e`;
const destDir = `c:\\Projects\\MUSA Retro Parts\\images`;

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

const files = fs.readdirSync(srcDir);
files.forEach(file => {
  if (file.endsWith('.jpg') || file.endsWith('.png')) {
    const srcFile = path.join(srcDir, file);
    const destFile = path.join(destDir, file);
    fs.copyFileSync(srcFile, destFile);
    console.log(`Copied ${file} -> ${destFile}`);
  }
});
