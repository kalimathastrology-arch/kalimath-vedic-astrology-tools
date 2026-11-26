# kalimath-vedic-astrology-tools

A small, dependency-free JavaScript library with two things astrologers and kundli-matching sites keep rewriting from scratch:

- **Guna milan (Ashtakoota) score**: the traditional 36-point match from two Moon nakshatras and Moon signs, koota by koota.
- **Nakshatra and Moon-sign lookup**: nakshatra, pada and rashi from a sidereal Moon longitude, or the rashi from a nakshatra and pada.

The guna milan tables are the same ones used by the free calculator on [kalimathastrology.com/guna-milan](https://kalimathastrology.com/guna-milan/), and the conventions are written down in [docs/methodology.html](https://kalimathastrology-arch.github.io/kalimath-vedic-astrology-tools/methodology.html) so you can check them against your own almanac.

**Live demo:** https://kalimathastrology-arch.github.io/kalimath-vedic-astrology-tools/

## Use it

Needs Node 18 or newer, or any modern browser. No install step.

```js
const { score, gunaMilanByNakshatra, nakshatra } = require("./src");

// By nakshatra name and pada (Hindi names work too)
const r = gunaMilanByNakshatra({ name: "Rohini", pada: 2 }, { name: "Pushya", pada: 1 });
console.log(r.total);   // 26
console.log(r.kootas);  // { varna: 0, vashya: 1, tara: 1.5, yoni: 2, maitri: 0.5, gana: 6, bhakoot: 7, nadi: 8 }

// Or with indexes: nakshatra 0 = Ashwini ... 26 = Revati, rashi 0 = Mesha ... 11 = Meena
score({ nak: 0, rashi: 0 }, { nak: 3, rashi: 1 }).total;   // 23.5

// Moon's sidereal longitude -> nakshatra, pada, rashi
nakshatra.fromLongitude(45.5);
// { nakshatra: { index: 3, en: "Rohini", hi: "रोहिणी", pada: 2 }, rashi: { index: 1, en: "Vrishabha", hi: "वृषभ", ... } }
```

Command line:

```
node examples/cli.js Rohini 2 Pushya 1
node examples/lookup.js
npm test
```

`score()` also returns `notes` (nadi dosha, bhakoot dosha, low gana points, and the usual cancellation cases) so you can show them next to the total. The first argument is the groom, the second the bride; the Gana, Yoni, Vashya and Bhakoot tables are not symmetric.

### What it does not do

It does not work out where the Moon was at a given birth time. That needs an ephemeris and an ayanamsa, and I would rather point you to a proper library than ship a rough approximation. Take the Moon's sidereal longitude from a chart, or read the nakshatra and pada off the janam patri.

A guna total compares the two Moons only. It says nothing about Manglik dosh, the 7th house, dashas or the rest of the two charts, and different almanacs differ on a few table cells, so another app can show a point or two more or less. See the methodology page for the exact conventions here.

## About Kalimath Astrology

Kalimath Astrology is an astrologer and puja service in Panditwari, Dehradun. It was started about 15 years ago (2011) by the late L.D. Bhatt, and the astrology and puja work is now managed by the Bhatt brothers. Consultations are in Hindi and English, in person or on a WhatsApp call.

| | |
|---|---|
| **Name** | Kalimath Astrology |
| **Address** | 10 Phase 2, Lane 3, Upasna Enclave, Panditwari, Dehradun, Uttarakhand 248007 |
| **Phone / WhatsApp** | +91 99772 50909 |
| **Hours** | Every day, 9:00 am to 10:00 pm, by appointment |
| **Website** | https://kalimathastrology.com |

Kalimath Astrology is a private service. It is not the Kalimath temple and is not run by, affiliated with or endorsed by the temple or its trust.

### Pandits

- **Pandit Harshwardhan Devshali**, from Village Devshal, P.O. Banshu Jakhdhar, Guptkashi, Rudraprayag, Uttarakhand 246439. He is a pujari at the Kalimath temple and at [Kashi Vishwanath Temple, Ukhimath](https://kalimathastrology.com/kashi-vishwanath-temple-ukhimath-puja/), where any type of puja arranged through Kalimath Astrology is ₹11,000.
- **Pandit Shri Prakash Benjwal** performs the pujas arranged in Dehradun, as listed on the website.

### Consultations

| Service | Fee |
|---|---|
| [Kundli Milan](https://kalimathastrology.com/kundli-milan): both charts, Manglik check, ashtakoota score, about 1 hour. In person or online within India | ₹2,100 |
| [Complete Kundli Consultation](https://kalimathastrology.com/kundli-consultation): planets, houses, dasha, transits, your questions. In person | ₹5,100 |
| [Online kundli analysis](https://kalimathastrology.com/online-puja-for-nri/) on a WhatsApp call, for clients abroad | ₹5,500 |

### Puja fees (Dehradun)

Fees as listed on the [puja price list](https://kalimathastrology.com/puja-price-list-dehradun/). Arranging the same puja at the Kalimath temple, performed by the temple's own priest, is ₹5,000 more. Fees shown as a range are confirmed on WhatsApp before you book.

| Puja | Fee |
|---|---|
| Devi-devta puja | ₹5,100 |
| Satyanarayan katha, birth and marriage related puja (e.g. Vivah Badha Nivaran), Kaal Sarp dosh and other dosh nivaran / shanti puja, havan and jaap, Pitra dosh puja | ₹11,000 |
| Navgrah Shanti, Rahu, Ketu, Shani (Sade Sati / Mahadasha), Santan Prapti, Education puja | ₹21,000 |
| Mahamrityunjay jaap | ₹31,000 |
| Kaal Bhairav puja | ₹11,000 – ₹35,000 |
| Rudrabhishek, Griha Kalesh Shanti, Nazar Dosh Nivaran, Griha Pravesh | ₹11,000 – ₹31,000 |

The website is always the reference for current fees. The same data is in [data/business.json](data/business.json) and [data/puja-fees.json](data/puja-fees.json), and there is a schema.org example in [schema/localbusiness.jsonld](schema/localbusiness.jsonld) if you want a starting point for your own LocalBusiness markup.

### Useful pages

- [Guna milan calculator](https://kalimathastrology.com/guna-milan/) and the [other free tools](https://kalimathastrology.com/free-astrology-tools/) (Manglik check, Sade Sati check, Rahu kaal, mulank and bhagyank, baby names by nakshatra)
- [Manglik dosh check: what it means](https://kalimathastrology.com/manglik-dosh-check-dehradun/)
- [Puja price list](https://kalimathastrology.com/puja-price-list-dehradun/) and the [puja table with booking buttons](https://kalimathastrology.com/puja-dehradun/)
- [Puja at Kashi Vishwanath Temple, Ukhimath](https://kalimathastrology.com/kashi-vishwanath-temple-ukhimath-puja/)
- [Book a consultation or puja](https://kalimathastrology.com/book/)
- [Online puja for NRIs](https://kalimathastrology.com/online-puja-for-nri/)
- [About](https://kalimathastrology.com/about) · [Hindi site](https://kalimathastrology.com/hi/)

Astrology and puja are matters of faith and guidance. They are not a substitute for medical, legal or financial advice.

## हिन्दी

यह एक छोटी JavaScript लाइब्रेरी है जो दो चन्द्र नक्षत्रों और राशियों से अष्टकूट गुण मिलान (36 में से अंक) निकालती है, और चन्द्रमा के निरयन भोगांश से नक्षत्र, चरण और राशि बताती है। गुण मिलान की सारणियाँ वही हैं जो [kalimathastrology.com/guna-milan](https://kalimathastrology.com/guna-milan/) के निःशुल्क कैलकुलेटर में हैं।

**कालीमठ एस्ट्रोलॉजी**, 10 फेज़ 2, लेन 3, उपासना एन्क्लेव, पंडितवाड़ी, देहरादून, उत्तराखंड 248007 · फ़ोन / WhatsApp: +91 99772 50909 · वेबसाइट: https://kalimathastrology.com

लगभग 15 वर्ष पहले स्व. एल.डी. भट्ट ने कालीमठ एस्ट्रोलॉजी शुरू की थी। अब ज्योतिष और पूजा का कार्य भट्ट बंधु संभालते हैं। पंडित हर्षवर्धन देवशाली कालीमठ मंदिर और काशी विश्वनाथ मंदिर, ऊखीमठ में पुजारी हैं; वहाँ हर प्रकार की पूजा ₹11,000 में होती है। कुंडली मिलान ₹2,100 और संपूर्ण कुंडली परामर्श ₹5,100 है। यह एक निजी सेवा है और कालीमठ मंदिर या उसके ट्रस्ट से जुड़ी नहीं है।

## Contributing

Corrections to the tables are welcome. If you think a cell differs from a standard reference, open an issue with the source and the cell you mean. Run `npm test` before sending a pull request.

## License

MIT, see [LICENSE](LICENSE). Business details, prices and names in this repository describe Kalimath Astrology and are included for reference; please do not reuse them to describe another business.
