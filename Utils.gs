/**
 * Akhawet Lebanon - Small shared helpers.
 */

function sanitizeInput_(str) {
  if (!str) return '';
  var chars = String(str).split('').filter(function (ch) {
    var code = ch.charCodeAt(0);
    return code >= 32 && code !== 127;
  });
  var s = chars.join('').trim();
  if (s.length > APP_CONFIG.maxInputLength) {
    s = s.substring(0, APP_CONFIG.maxInputLength);
  }
  return s;
}

function randomChoice_(arr) {
  if (!arr || !arr.length) return null;
  return arr[Math.floor(Math.random() * arr.length)];
}

function parseList_(value) {
  if (!value) return [];
  return String(value)
    .split(',')
    .map(function (s) { return s.trim(); })
    .filter(function (s) { return s.length > 0; });
}

function toBool_(value) {
  if (typeof value === 'boolean') return value;
  if (value === undefined || value === null || value === '') return true;
  var s = String(value).trim().toUpperCase();
  return s === 'TRUE' || s === '1' || s === 'YES' || s === 'Y';
}

function toNumber_(value, fallback) {
  var n = Number(value);
  return isNaN(n) ? fallback : n;
}

/**
 * Strips Arabic diacritics/tatweel and normalizes common letter variants so
 * matching isn't thrown off by spelling differences (e.g. hamza variants -> plain alef).
 */
function normalizeArabic_(str) {
  if (!str) return '';
  var s = String(str);
  var diacriticCodes = [0x064B, 0x064C, 0x064D, 0x064E, 0x064F, 0x0650, 0x0651, 0x0652, 0x0670, 0x0640];
  for (var i = 0; i < diacriticCodes.length; i++) {
    s = s.split(String.fromCharCode(diacriticCodes[i])).join('');
  }
  s = s.replace(/[أإآ]/g, 'ا'); // hamza/madda alef variants -> plain alef
  s = s.replace(/ة/g, 'ه'); // taa marbuta -> haa
  s = s.replace(/ى/g, 'ي'); // alef maksura -> yaa
  s = s.replace(/ؤ/g, 'و'); // waw hamza -> waw
  s = s.replace(/ئ/g, 'ي'); // yaa hamza -> yaa
  return s.toLowerCase().trim();
}

function logError_(context) {
  try {
    console.error('[Akhawet] ' + context);
  } catch (e) {
    // ignore
  }
}
