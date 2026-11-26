"use strict";
const guna = require("./guna.js");
const nakshatra = require("./nakshatra.js");
const names = require("./names.js");

/** Score two people by nakshatra name + Moon-sign pada, e.g. guna milan({name:"Rohini",pada:2},{name:"Pushya",pada:1}) */
function gunaMilanByNakshatra(groom, bride) {
  const toPerson = (p) => {
    const nak = nakshatra.findNakshatra(p.name);
    if (nak < 0) { throw new Error("Unknown nakshatra: " + p.name); }
    const rashi = nakshatra.fromNakshatraPada(nak, p.pada).rashi.index;
    return { nak, rashi };
  };
  return guna.score(toPerson(groom), toPerson(bride));
}

module.exports = { guna, nakshatra, names, score: guna.score, gunaMilanByNakshatra };
