// Usage: node examples/cli.js "Rohini" 2 "Pushya" 1
// groom nakshatra + pada, then bride nakshatra + pada
const { gunaMilanByNakshatra, names } = require("../src");

const [gName, gPada, bName, bPada] = process.argv.slice(2);
if (!bPada) {
  console.log('Usage: node examples/cli.js <groom nakshatra> <pada 1-4> <bride nakshatra> <pada 1-4>');
  console.log('Example: node examples/cli.js Rohini 2 Pushya 1');
  process.exit(1);
}
const r = gunaMilanByNakshatra({ name: gName, pada: +gPada }, { name: bName, pada: +bPada });
const max = { varna: 1, vashya: 2, tara: 3, yoni: 4, maitri: 5, gana: 6, bhakoot: 7, nadi: 8 };
for (const k of Object.keys(max)) {
  console.log(names.koota.en[k].padEnd(14), String(r.kootas[k]).padStart(4), "/", max[k]);
}
console.log("-".repeat(24));
console.log("Total".padEnd(14), String(r.total).padStart(4), "/ 36");
if (r.notes.nadiDosha) console.log("Note: same nadi (nadi dosha).");
if (r.notes.bhakootDosha) console.log("Note: bhakoot dosha (6/8, 5/9 or 2/12 signs).");
