"use strict";
const test = require("node:test");
const assert = require("node:assert");
const N = require("../src/nakshatra.js");
const { NAK_RASHI } = require("../src/guna.js");
const lib = require("../src/index.js");

test("longitude 0 is Ashwini pada 1 in Mesha", () => {
  const r = N.fromLongitude(0);
  assert.strictEqual(r.nakshatra.en, "Ashwini");
  assert.strictEqual(r.nakshatra.pada, 1);
  assert.strictEqual(r.rashi.en, "Mesha");
});

test("boundaries: 13.3333 deg starts Bharani, 30 deg starts Vrishabha, 359.99 is Revati pada 4 in Meena", () => {
  assert.strictEqual(N.fromLongitude(360 / 27).nakshatra.en, "Bharani");
  assert.strictEqual(N.fromLongitude(30).rashi.en, "Vrishabha");
  const last = N.fromLongitude(359.99);
  assert.strictEqual(last.nakshatra.en, "Revati");
  assert.strictEqual(last.nakshatra.pada, 4);
  assert.strictEqual(last.rashi.en, "Meena");
});

test("negative and >360 longitudes wrap", () => {
  assert.strictEqual(N.fromLongitude(-1).nakshatra.en, "Revati");
  assert.strictEqual(N.fromLongitude(361).nakshatra.en, "Ashwini");
});

test("rashisOfNakshatra agrees with the table used by the guna calculator", () => {
  for (let n = 0; n < 27; n++) assert.deepStrictEqual(N.rashisOfNakshatra(n), NAK_RASHI[n]);
});

test("Krittika pada 1 is Mesha, padas 2-4 are Vrishabha", () => {
  assert.strictEqual(N.fromNakshatraPada(2, 1).rashi.en, "Mesha");
  assert.strictEqual(N.fromNakshatraPada(2, 2).rashi.en, "Vrishabha");
});

test("findNakshatra works in English and Hindi", () => {
  assert.strictEqual(N.findNakshatra("purva phalguni"), 10);
  assert.strictEqual(N.findNakshatra("रोहिणी"), 3);
  assert.strictEqual(N.findNakshatra("nonsense"), -1);
});

test("gunaMilanByNakshatra", () => {
  const r = lib.gunaMilanByNakshatra({ name: "Rohini", pada: 2 }, { name: "Pushya", pada: 1 });
  assert.ok(r.total >= 0 && r.total <= 36);
});
