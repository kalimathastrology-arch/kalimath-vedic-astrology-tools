// Copies the library files into docs/lib so GitHub Pages can serve the demo.
const fs = require("fs");
const path = require("path");
const root = path.join(__dirname, "..");
for (const f of ["guna.js", "names.js", "nakshatra.js"]) {
  fs.copyFileSync(path.join(root, "src", f), path.join(root, "docs", "lib", f));
}
console.log("docs/lib updated");
