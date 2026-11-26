/*!
 * Guna Milan (Ashtakoota) 36-point score calculator.
 * Kalimath Astrology, Panditwari, Dehradun, https://kalimathastrology.com/guna-milan/
 * MIT License. Pure JavaScript, no dependencies; works in Node and in the browser.
 *
 * Input: each person's Moon nakshatra index (0 = Ashwini ... 26 = Revati) and Moon sign (rashi) index
 * (0 = Mesha/Aries ... 11 = Meena/Pisces). Conventions used (the same ones published on the website):
 *   Varna by Moon sign; Vashya whole-sign five groups; Tara counted inclusively both ways (3 / 1.5 / 0);
 *   Yoni symmetric 14x14 table; Graha Maitri by natural friendship of the sign lords; Gana and Nadi by nakshatra;
 *   Bhakoot 7 or 0 by sign distance (cancellations are reported in `notes`, points unchanged).
 * Other apps and almanacs differ on a few table cells, so a score can differ by a point or two.
 * This is traditional-method information, not a prediction or a verdict on any match.
 */
(function (root) {
  "use strict";
  var NAK_RASHI = [[0],[0],[0,1],[1],[1,2],[2],[2,3],[3],[3],[4],[4],[4,5],[5],[5,6],[6],[6,7],[7],[7],[8],[8],[8,9],[9],[9,10],[10],[10,11],[11],[11]];
  var VARNA = [1,2,3,0,1,2,3,0,1,2,3,0];            // 0 Brahmin, 1 Kshatriya, 2 Vaishya, 3 Shudra (by rashi)
  var VASHYA = [0,0,1,2,3,1,1,4,1,2,1,2];           // 0 Chatushpada, 1 Manava, 2 Jalachara, 3 Vanachara, 4 Keeta
  var VASHYA_PTS = [[2,1,1,0,1],[1,2,0.5,0,1],[1,0.5,2,1,1],[0,0,0,2,0],[1,1,1,0,2]]; // [groom][bride]
  var YONI = [0,1,2,3,3,4,5,2,5,6,6,7,8,9,8,9,10,10,4,11,12,11,13,0,13,7,1];
  var YONI_PTS = [
    [4,2,2,3,2,2,2,1,0,1,1,3,2,1],[2,4,3,3,2,2,2,2,3,1,2,3,2,0],[2,3,4,2,1,2,1,3,3,1,2,0,3,1],
    [3,3,2,4,2,1,1,1,1,2,2,2,0,2],[2,2,1,2,4,2,1,2,2,1,0,2,1,1],[2,2,2,1,2,4,0,2,2,1,3,3,2,1],
    [2,2,1,1,1,0,4,2,2,2,2,2,1,2],[1,2,3,1,2,2,2,4,3,0,3,2,2,1],[0,3,3,1,2,2,2,3,4,1,2,2,2,1],
    [1,1,1,2,1,1,2,0,1,4,1,1,2,1],[1,2,2,2,0,3,2,3,2,1,4,2,2,1],[3,3,0,2,2,3,2,2,2,1,2,4,3,2],
    [2,2,3,0,1,2,1,2,2,2,2,3,4,2],[1,0,1,2,1,1,2,1,1,1,1,2,2,4]];
  var LORD = [2,5,3,1,0,3,5,2,4,6,6,4];              // 0 Sun 1 Moon 2 Mars 3 Mercury 4 Jupiter 5 Venus 6 Saturn
  // natural relationship of planet a towards b: 1 friend, 0 neutral, -1 enemy
  var REL = [[9,1,1,0,1,-1,-1],[1,9,0,1,0,0,0],[1,1,9,-1,1,0,0],[1,-1,0,9,0,1,0],[1,1,1,-1,9,-1,0],[-1,-1,0,1,0,9,1],[-1,-1,-1,1,0,1,9]];
  var GANA = [0,1,2,1,0,1,0,0,2,2,1,1,0,2,0,2,0,2,2,1,1,0,2,2,1,1,0]; // 0 Deva 1 Manushya 2 Rakshasa
  var GANA_PTS = [[6,6,0],[5,6,0],[1,0,6]];         // [bride][groom]
  var NADI = [0,1,2,2,1,0,0,1,2,2,1,0,0,1,2,2,1,0,0,1,2,2,1,0,0,1,2]; // 0 Adi 1 Madhya 2 Antya

  function maitri(a, b) {
    if (a === b) { return 5; }
    var x = REL[a][b], y = REL[b][a], s = x + y;
    if (x === 1 && y === 1) { return 5; }
    if (s === 1) { return 4; }                       // friend + neutral
    if (x === 0 && y === 0) { return 3; }
    if (x !== y && s === 0) { return 1; }            // friend + enemy
    if (s === -1) { return 0.5; }                    // neutral + enemy
    return 0;                                        // both enemies
  }
  function taraOk(from, to) { var c = ((to - from + 27) % 27) + 1, r = c % 9; return !(r === 3 || r === 5 || r === 7); }

  function score(g, b) {
    if (NAK_RASHI[g.nak].indexOf(g.rashi) < 0 || NAK_RASHI[b.nak].indexOf(b.rashi) < 0) { throw new Error("nakshatra/rashi mismatch"); }
    var k = {};
    k.varna = VARNA[g.rashi] <= VARNA[b.rashi] ? 1 : 0;
    k.vashya = g.rashi === b.rashi ? 2 : VASHYA_PTS[VASHYA[g.rashi]][VASHYA[b.rashi]];
    var t1 = taraOk(b.nak, g.nak), t2 = taraOk(g.nak, b.nak);
    k.tara = (t1 ? 1.5 : 0) + (t2 ? 1.5 : 0);
    k.yoni = YONI_PTS[YONI[b.nak]][YONI[g.nak]];
    k.maitri = maitri(LORD[g.rashi], LORD[b.rashi]);
    k.gana = GANA_PTS[GANA[b.nak]][GANA[g.nak]];
    var d = ((g.rashi - b.rashi + 12) % 12) + 1;     // groom's sign counted from bride's
    var bad = [2, 12, 5, 9, 6, 8].indexOf(d) >= 0;
    k.bhakoot = bad ? 0 : 7;
    k.nadi = NADI[g.nak] === NADI[b.nak] ? 0 : 8;
    var total = 0; for (var n in k) { total += k[n]; }
    var la = LORD[g.rashi], lb = LORD[b.rashi];
    var notes = {
      nadiDosha: k.nadi === 0, bhakootDosha: bad, ganaLow: k.gana <= 1,
      bhakootSameLord: bad && la === lb,
      bhakootFriendLords: bad && la !== lb && REL[la][lb] === 1 && REL[lb][la] === 1 && k.nadi === 8,
      nadiSameNakshatraDiffRashi: k.nadi === 0 && g.nak === b.nak && g.rashi !== b.rashi
    };
    return { kootas: k, total: total, notes: notes, info: { gGana: GANA[g.nak], bGana: GANA[b.nak], gNadi: NADI[g.nak], bNadi: NADI[b.nak], gYoni: YONI[g.nak], bYoni: YONI[b.nak], gVarna: VARNA[g.rashi], bVarna: VARNA[b.rashi], gVashya: VASHYA[g.rashi], bVashya: VASHYA[b.rashi], gLord: la, bLord: lb, dist: d } };
  }

  var API = { score: score, NAK_RASHI: NAK_RASHI };
  if (typeof module !== "undefined" && module.exports) { module.exports = API; }
  root.GunaMilan = API;
})(typeof window !== "undefined" ? window : this);
