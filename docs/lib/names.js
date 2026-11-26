/*! Names (English, Hindi) for the 27 nakshatras, 12 rashis and the koota labels. MIT License. */
(function (root) {
  "use strict";
  var NAMES = {
  "nakshatra": {
    "en": [
      "Ashwini",
      "Bharani",
      "Krittika",
      "Rohini",
      "Mrigashira",
      "Ardra",
      "Punarvasu",
      "Pushya",
      "Ashlesha",
      "Magha",
      "Purva Phalguni",
      "Uttara Phalguni",
      "Hasta",
      "Chitra",
      "Swati",
      "Vishakha",
      "Anuradha",
      "Jyeshtha",
      "Mula",
      "Purva Ashadha",
      "Uttara Ashadha",
      "Shravana",
      "Dhanishta",
      "Shatabhisha",
      "Purva Bhadrapada",
      "Uttara Bhadrapada",
      "Revati"
    ],
    "hi": [
      "अश्विनी",
      "भरणी",
      "कृत्तिका",
      "रोहिणी",
      "मृगशिरा",
      "आर्द्रा",
      "पुनर्वसु",
      "पुष्य",
      "आश्लेषा",
      "मघा",
      "पूर्वा फाल्गुनी",
      "उत्तरा फाल्गुनी",
      "हस्त",
      "चित्रा",
      "स्वाति",
      "विशाखा",
      "अनुराधा",
      "ज्येष्ठा",
      "मूल",
      "पूर्वाषाढ़ा",
      "उत्तराषाढ़ा",
      "श्रवण",
      "धनिष्ठा",
      "शतभिषा",
      "पूर्वा भाद्रपद",
      "उत्तरा भाद्रपद",
      "रेवती"
    ]
  },
  "rashi": {
    "en": [
      "Mesha",
      "Vrishabha",
      "Mithuna",
      "Karka",
      "Simha",
      "Kanya",
      "Tula",
      "Vrishchika",
      "Dhanu",
      "Makara",
      "Kumbha",
      "Meena"
    ],
    "hi": [
      "मेष",
      "वृषभ",
      "मिथुन",
      "कर्क",
      "सिंह",
      "कन्या",
      "तुला",
      "वृश्चिक",
      "धनु",
      "मकर",
      "कुंभ",
      "मीन"
    ],
    "western": [
      "Aries",
      "Taurus",
      "Gemini",
      "Cancer",
      "Leo",
      "Virgo",
      "Libra",
      "Scorpio",
      "Sagittarius",
      "Capricorn",
      "Aquarius",
      "Pisces"
    ]
  },
  "koota": {
    "en": {
      "varna": "Varna",
      "vashya": "Vashya",
      "tara": "Tara",
      "yoni": "Yoni",
      "maitri": "Graha Maitri",
      "gana": "Gana",
      "bhakoot": "Bhakoot",
      "nadi": "Nadi"
    },
    "hi": {
      "varna": "वर्ण",
      "vashya": "वश्य",
      "tara": "तारा",
      "yoni": "योनि",
      "maitri": "ग्रह मैत्री",
      "gana": "गण",
      "bhakoot": "भकूट",
      "nadi": "नाड़ी"
    }
  },
  "gana": {
    "en": [
      "Deva",
      "Manushya",
      "Rakshasa"
    ],
    "hi": [
      "देव",
      "मनुष्य",
      "राक्षस"
    ]
  },
  "nadi": {
    "en": [
      "Adi",
      "Madhya",
      "Antya"
    ],
    "hi": [
      "आदि",
      "मध्य",
      "अंत्य"
    ]
  },
  "varna": {
    "en": [
      "Brahmin",
      "Kshatriya",
      "Vaishya",
      "Shudra"
    ],
    "hi": [
      "ब्राह्मण",
      "क्षत्रिय",
      "वैश्य",
      "शूद्र"
    ]
  },
  "yoni": {
    "en": [
      "Horse",
      "Elephant",
      "Sheep",
      "Serpent",
      "Dog",
      "Cat",
      "Rat",
      "Cow",
      "Buffalo",
      "Tiger",
      "Deer",
      "Monkey",
      "Mongoose",
      "Lion"
    ],
    "hi": [
      "अश्व",
      "गज",
      "मेष (भेड़)",
      "सर्प",
      "श्वान",
      "मार्जार",
      "मूषक",
      "गौ",
      "महिष",
      "व्याघ्र",
      "मृग",
      "वानर",
      "नकुल",
      "सिंह"
    ]
  },
  "vashya": {
    "en": [
      "Chatushpada",
      "Manava",
      "Jalachara",
      "Vanachara",
      "Keeta"
    ],
    "hi": [
      "चतुष्पद",
      "मानव",
      "जलचर",
      "वनचर",
      "कीट"
    ]
  },
  "planet": {
    "en": [
      "Sun",
      "Moon",
      "Mars",
      "Mercury",
      "Jupiter",
      "Venus",
      "Saturn"
    ],
    "hi": [
      "सूर्य",
      "चंद्र",
      "मंगल",
      "बुध",
      "गुरु",
      "शुक्र",
      "शनि"
    ]
  },
  "band": {
    "en": [
      "Below 18: traditionally not recommended on the guna total alone. Please have both full charts checked before deciding anything.",
      "18 to 24: the usual traditional minimum is met. The full charts and Manglik check still matter.",
      "25 to 32: a good traditional score. The full charts and Manglik check still matter.",
      "33 to 36: a very high traditional score. The full charts and Manglik check still matter."
    ],
    "hi": [
      "18 से कम: परंपरा में केवल कुल अंक के आधार पर इसे उचित नहीं माना जाता। कोई भी निर्णय लेने से पहले दोनों पूरी कुंडलियाँ जँचवाएँ।",
      "18 से 24: सामान्य पारंपरिक न्यूनतम अंक पूरे होते हैं। फिर भी पूरी कुंडली और मांगलिक जाँच ज़रूरी है।",
      "25 से 32: अच्छे पारंपरिक अंक। फिर भी पूरी कुंडली और मांगलिक जाँच ज़रूरी है।",
      "33 से 36: बहुत ऊँचे पारंपरिक अंक। फिर भी पूरी कुंडली और मांगलिक जाँच ज़रूरी है।"
    ]
  }
};
  if (typeof module !== "undefined" && module.exports) { module.exports = NAMES; }
  root.VedicNames = NAMES;
})(typeof window !== "undefined" ? window : this);
