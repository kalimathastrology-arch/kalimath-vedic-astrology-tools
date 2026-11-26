// Moon's sidereal longitude -> nakshatra, pada and rashi
const { nakshatra } = require("../src");
for (const lon of [0, 45.5, 123.4, 359.9]) {
  const r = nakshatra.fromLongitude(lon);
  console.log(lon + "°", "->", r.nakshatra.en, "pada", r.nakshatra.pada + ",", r.rashi.en, "(" + r.rashi.hi + ")");
}
