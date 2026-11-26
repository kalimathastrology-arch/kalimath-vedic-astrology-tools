"use strict";
const test = require("node:test");
const assert = require("node:assert");
const { score, NAK_RASHI } = require("../src/guna.js");

test("total is the sum of the eight kootas and never exceeds 36", () => {
  for (let gn = 0; gn < 27; gn++) for (let bn = 0; bn < 27; bn++) {
    for (const gr of NAK_RASHI[gn]) for (const br of NAK_RASHI[bn]) {
      const r = score({ nak: gn, rashi: gr }, { nak: bn, rashi: br });
      const sum = Object.values(r.kootas).reduce((a, b) => a + b, 0);
      assert.strictEqual(r.total, sum);
      assert.ok(r.total >= 0 && r.total <= 36);
      const max = { varna: 1, vashya: 2, tara: 3, yoni: 4, maitri: 5, gana: 6, bhakoot: 7, nadi: 8 };
      for (const k in max) assert.ok(r.kootas[k] >= 0 && r.kootas[k] <= max[k], k);
    }
  }
});

test("same nakshatra and rashi gives nadi 0 (same nadi), tara 3, yoni 4", () => {
  const r = score({ nak: 3, rashi: 1 }, { nak: 3, rashi: 1 });
  assert.strictEqual(r.kootas.nadi, 0);
  assert.strictEqual(r.kootas.tara, 3);
  assert.strictEqual(r.kootas.yoni, 4);
  assert.strictEqual(r.kootas.bhakoot, 7);
  assert.strictEqual(r.notes.nadiDosha, true);
});

test("Ashwini/Mesha (groom) with Rohini/Vrishabha (bride): worked example", () => {
  const r = score({ nak: 0, rashi: 0 }, { nak: 3, rashi: 1 });
  assert.deepStrictEqual(r.kootas, { varna: 1, vashya: 2, tara: 1.5, yoni: 3, maitri: 3, gana: 5, bhakoot: 0, nadi: 8 });
  assert.strictEqual(r.total, 23.5);
  assert.strictEqual(r.notes.bhakootDosha, true);  // groom's sign is the 12th from the bride's (2/12)
  assert.strictEqual(r.notes.nadiDosha, false);    // Adi vs Antya
});

test("bhakoot is 0 for 6/8, 5/9 and 2/12 sign distances", () => {
  // Mesha(0) with Vrishchika(7): groom's sign counted from bride's = 8
  assert.strictEqual(score({ nak: 0, rashi: 0 }, { nak: 16, rashi: 7 }).kootas.bhakoot, 0);
  // Mesha(0) and Dhanu(8): distance 9
  assert.strictEqual(score({ nak: 0, rashi: 0 }, { nak: 19, rashi: 8 }).kootas.bhakoot, 0);
  // Mesha(0) and Mithuna(2) distance 3 is fine
  assert.strictEqual(score({ nak: 0, rashi: 0 }, { nak: 4, rashi: 2 }).kootas.bhakoot, 7);
});

test("mismatched nakshatra/rashi throws", () => {
  assert.throws(() => score({ nak: 0, rashi: 5 }, { nak: 3, rashi: 1 }), /mismatch/);
});

test("Rohini (Vrishabha) groom with Dhanishta (Kumbha) bride totals 27", () => {
  const r = score({ nak: 3, rashi: 1 }, { nak: 22, rashi: 10 });
  assert.deepStrictEqual(r.kootas, { varna: 1, vashya: 1, tara: 3, yoni: 2, maitri: 5, gana: 0, bhakoot: 7, nadi: 8 });
  assert.strictEqual(r.total, 27);
});
