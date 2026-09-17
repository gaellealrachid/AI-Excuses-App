/**
 * Akhawet Lebanon - Google Sheets database layer.
 * The spreadsheet IS the admin panel: edit excuse/keywords/targets/proofType/active
 * directly in the "Excuses" sheet. Run clearCaches() after editing to see changes immediately.
 */

var SHEET_NAME = 'Excuses';
var CACHE_KEY_EXCUSES = 'excuses_v1';

var HEADERS = [
  'id', 'excuse', 'category', 'subcategory', 'targets', 'keywords',
  'proofType', 'humor', 'realism', 'difficulty',
  'acceptedMom', 'rejectedMom', 'acceptedBoss', 'rejectedBoss',
  'acceptedFriend', 'rejectedFriend', 'acceptedPartner', 'rejectedPartner',
  'fakeAccepted', 'fakeRejected', 'savageReply', 'active'
];

function getSpreadsheet_() {
  var id = getSpreadsheetId_();
  if (id) {
    try {
      return SpreadsheetApp.openById(id);
    } catch (e) {
      logError_('spreadsheet_open_failed');
    }
  }
  var ss = SpreadsheetApp.create(APP_CONFIG.appName + ' Database');
  setSpreadsheetId_(ss.getId());
  return ss;
}

/**
 * Idempotent setup: safe to run more than once.
 * Creates the spreadsheet (if needed), the Excuses sheet with headers,
 * and seeds the 100 starter excuses only if the sheet is empty.
 */
function setupDatabase() {
  var ss = getSpreadsheet_();
  var sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = ss.getSheets()[0].getName() === 'Sheet1' && ss.getSheets().length === 1
      ? ss.getSheets()[0].setName(SHEET_NAME)
      : ss.insertSheet(SHEET_NAME);
  }

  var lastCol = sheet.getLastColumn();
  var firstRow = lastCol > 0 ? sheet.getRange(1, 1, 1, Math.max(lastCol, HEADERS.length)).getValues()[0] : [];
  var hasHeaders = firstRow[0] === 'id';

  if (!hasHeaders) {
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
    sheet.getRange(1, 1, 1, HEADERS.length)
      .setFontWeight('bold')
      .setBackground('#1F6F4A')
      .setFontColor('#FFFFFF');
    sheet.setFrozenRows(1);
    sheet.setColumnWidth(2, 320);
  }

  seedInitialExcuses();
  clearCaches();
  return 'Database ready. Spreadsheet: ' + ss.getUrl();
}

/**
 * Writes the 100 starter excuses only if the sheet currently has no data rows.
 * Safe to call multiple times - never duplicates existing rows.
 */
function seedInitialExcuses() {
  var ss = getSpreadsheet_();
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) throw new Error('Run setupDatabase() first.');

  var lastRow = sheet.getLastRow();
  if (lastRow > 1) {
    return 'Sheet already has data (' + (lastRow - 1) + ' rows). Skipped seeding.';
  }

  var seeds = SEED_EXCUSES_();
  var rows = seeds.map(function (ex) {
    var row = [];
    row[HEADERS.indexOf('id')] = ex.id;
    row[HEADERS.indexOf('excuse')] = ex.excuse;
    row[HEADERS.indexOf('category')] = ex.category;
    row[HEADERS.indexOf('subcategory')] = ex.subcategory || '';
    row[HEADERS.indexOf('targets')] = ex.targets.join(',');
    row[HEADERS.indexOf('keywords')] = ex.keywords.join(',');
    row[HEADERS.indexOf('proofType')] = ex.proofType || '';
    row[HEADERS.indexOf('humor')] = ex.humor;
    row[HEADERS.indexOf('realism')] = ex.realism;
    row[HEADERS.indexOf('difficulty')] = ex.difficulty || 'easy';
    row[HEADERS.indexOf('acceptedMom')] = '';
    row[HEADERS.indexOf('rejectedMom')] = '';
    row[HEADERS.indexOf('acceptedBoss')] = '';
    row[HEADERS.indexOf('rejectedBoss')] = '';
    row[HEADERS.indexOf('acceptedFriend')] = '';
    row[HEADERS.indexOf('rejectedFriend')] = '';
    row[HEADERS.indexOf('acceptedPartner')] = '';
    row[HEADERS.indexOf('rejectedPartner')] = '';
    row[HEADERS.indexOf('fakeAccepted')] = '';
    row[HEADERS.indexOf('fakeRejected')] = '';
    row[HEADERS.indexOf('savageReply')] = '';
    row[HEADERS.indexOf('active')] = true;
    return row;
  });

  sheet.getRange(2, 1, rows.length, HEADERS.length).setValues(rows);
  clearCaches();
  return 'Seeded ' + rows.length + ' excuses.';
}

function readExcusesFromSheet_() {
  var ss = getSpreadsheet_();
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) return [];

  var lastRow = sheet.getLastRow();
  if (lastRow < 2) return [];

  var values = sheet.getRange(2, 1, lastRow - 1, HEADERS.length).getValues();
  var col = {};
  HEADERS.forEach(function (h, i) { col[h] = i; });

  var out = [];
  for (var i = 0; i < values.length; i++) {
    var r = values[i];
    var id = String(r[col.id] || '').trim();
    if (!id) continue;
    if (!toBool_(r[col.active])) continue;

    out.push({
      id: id,
      excuse: String(r[col.excuse] || '').trim(),
      category: String(r[col.category] || '').trim().toLowerCase(),
      subcategory: String(r[col.subcategory] || '').trim().toLowerCase(),
      targets: parseList_(r[col.targets]).map(function (s) { return s.toLowerCase(); }),
      keywords: parseList_(r[col.keywords]).map(function (s) { return s.toLowerCase(); }),
      proofType: String(r[col.proofType] || '').trim(),
      humor: toNumber_(r[col.humor], 3),
      realism: toNumber_(r[col.realism], 3),
      difficulty: String(r[col.difficulty] || 'easy').trim().toLowerCase(),
      acceptedMom: parseList_(r[col.acceptedMom]),
      rejectedMom: parseList_(r[col.rejectedMom]),
      acceptedBoss: parseList_(r[col.acceptedBoss]),
      rejectedBoss: parseList_(r[col.rejectedBoss]),
      acceptedFriend: parseList_(r[col.acceptedFriend]),
      rejectedFriend: parseList_(r[col.rejectedFriend]),
      acceptedPartner: parseList_(r[col.acceptedPartner]),
      rejectedPartner: parseList_(r[col.rejectedPartner]),
      fakeAccepted: parseList_(r[col.fakeAccepted]),
      fakeRejected: parseList_(r[col.fakeRejected]),
      savageReply: parseList_(r[col.savageReply]),
      active: true
    });
  }
  return out;
}

/**
 * Cached accessor - avoids hitting Sheets on every request.
 * Cache lasts APP_CONFIG.cacheTtlSeconds; call clearCaches() to force a refresh
 * right after editing the sheet.
 */
function getExcuses() {
  var cache = CacheService.getScriptCache();
  try {
    var cached = cache.get(CACHE_KEY_EXCUSES);
    if (cached) return JSON.parse(cached);
  } catch (e) {
    logError_('excuses_cache_read_failed');
  }

  var excuses = readExcusesFromSheet_();
  try {
    cache.put(CACHE_KEY_EXCUSES, JSON.stringify(excuses), APP_CONFIG.cacheTtlSeconds);
  } catch (e) {
    logError_('excuses_cache_write_failed');
  }
  return excuses;
}

function clearCaches() {
  var cache = CacheService.getScriptCache();
  cache.remove(CACHE_KEY_EXCUSES);
  return 'Caches cleared.';
}
