/*!
 * Nakshatra and Moon-sign (rashi) lookup, sidereal zodiac. MIT License.
 * Kalimath Astrology, Panditwari, Dehradun, https://kalimathastrology.com
 *
 * Each nakshatra spans 13 deg 20 min (360/27) of the sidereal zodiac, and each of its four padas spans 3 deg 20 min.
 * Each rashi spans 30 deg. So a sidereal Moon longitude gives the nakshatra, pada and rashi directly.
 * Note: this does NOT compute where the Moon was at a given birth time (that needs an ephemeris and an ayanamsa).
 * Take the Moon's sidereal longitude from an ephemeris or a janam patri, or use the nakshatra + pada from the chart.
 */
(function (root) {
  "use strict";
  var NAMES = (typeof require === "function" && typeof module !== "undefined") ? require("./names.js") : root.VedicNames;
  var NAK_SPAN = 360 / 27;       // 13.3333...
  var PADA_SPAN = NAK_SPAN / 4;  // 3.3333...
  var EPS = 1e-9;

  function norm(deg) { var d = deg % 360; return d < 0 ? d + 360 : d; }

  // Sidereal Moon longitude in degrees -> { nakshatra, pada, rashi } (zero-based indexes plus names)
  function fromLongitude(deg) {
    if (typeof deg !== "number" || !isFinite(deg)) { throw new TypeError("longitude must be a finite number of degrees"); }
    var d = norm(deg);
    var nak = Math.min(26, Math.floor((d + EPS) / NAK_SPAN));
    var pada = Math.min(3, Math.floor((d - nak * NAK_SPAN + EPS) / PADA_SPAN));
    var rashi = Math.min(11, Math.floor((d + EPS) / 30));
    return describe(nak, pada + 1, rashi);
  }

  // Nakshatra index (0-26) + pada (1-4) -> the rashi (a pada never straddles two rashis)
  function fromNakshatraPada(nak, pada) {
    if (!(nak >= 0 && nak <= 26 && nak % 1 === 0)) { throw new RangeError("nakshatra must be an integer 0..26"); }
    if (!(pada >= 1 && pada <= 4 && pada % 1 === 0)) { throw new RangeError("pada must be an integer 1..4"); }
    var start = nak * NAK_SPAN + (pada - 1) * PADA_SPAN;
    return describe(nak, pada, Math.floor((start + EPS) / 30));
  }

  // Nakshatra index -> the one or two rashis its four padas fall in
  function rashisOfNakshatra(nak) {
    var out = [];
    for (var p = 1; p <= 4; p++) { var r = fromNakshatraPada(nak, p).rashi.index; if (out.indexOf(r) < 0) { out.push(r); } }
    return out;
  }

  // Find a nakshatra by English or Hindi name (case-insensitive, ignores spaces and dashes)
  function findNakshatra(name) {
    var key = String(name).toLowerCase().replace(/[\s\-_]/g, "");
    for (var i = 0; i < 27; i++) {
      if (NAMES.nakshatra.en[i].toLowerCase().replace(/[\s\-_]/g, "") === key || NAMES.nakshatra.hi[i].replace(/\s/g, "") === String(name).replace(/\s/g, "")) { return i; }
    }
    return -1;
  }

  function describe(nak, pada, rashi) {
    return {
      nakshatra: { index: nak, en: NAMES.nakshatra.en[nak], hi: NAMES.nakshatra.hi[nak], pada: pada },
      rashi: { index: rashi, en: NAMES.rashi.en[rashi], hi: NAMES.rashi.hi[rashi], western: NAMES.rashi.western[rashi] }
    };
  }

  var API = { fromLongitude: fromLongitude, fromNakshatraPada: fromNakshatraPada, rashisOfNakshatra: rashisOfNakshatra, findNakshatra: findNakshatra };
  if (typeof module !== "undefined" && module.exports) { module.exports = API; }
  root.VedicNakshatra = API;
})(typeof window !== "undefined" ? window : this);
