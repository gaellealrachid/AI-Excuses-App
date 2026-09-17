/**
 * Akhawet Lebanon - Local matching engine (the AI-free fallback).
 * Keeps the app fully functional without Gemini: tokenizes the user's story,
 * maps Lebanese/English synonyms to canonical tags, then scores every excuse.
 */

// canonical tag -> list of surface forms (Lebanese Arabic + English) that imply it
var KEYWORD_SYNONYMS = {
  work: ['شغل', 'دوام', 'مدير', 'مكتب', 'اجتماع', 'وظيفة', 'work', 'office', 'boss', 'meeting', 'job'],
  university: ['جامعة', 'محاضرة', 'أستاذ', 'كلية', 'university', 'college', 'lecture', 'professor'],
  school: ['مدرسة', 'مدرسه', 'صف', 'school', 'class'],
  parents: ['أمي', 'امي', 'ماما', 'بيي', 'بابا', 'أبي', 'ابوي', 'mom', 'dad', 'mother', 'father'],
  family: ['عيلة', 'عيلتي', 'أهل', 'اهلي', 'خالتي', 'عمي', 'جدتي', 'جدي', 'family', 'aunt', 'uncle', 'grandma', 'grandpa'],
  friends: ['رفيقي', 'رفيقتي', 'صاحبي', 'صديقي', 'شلة', 'friend', 'buddy'],
  partner: ['حبيبي', 'حبيبتي', 'خطيبي', 'خطيبتي', 'شريكي', 'شريكتي', 'زوجي', 'زوجتي', 'partner', 'boyfriend', 'girlfriend', 'husband', 'wife'],
  dating: ['موعد غرامي', 'تعارف', 'ديت', 'date', 'dating'],
  wedding: ['عرس', 'فرح', 'عروس', 'wedding', 'marriage'],
  dinner: ['عزيمة', 'عشا', 'غدا', 'dinner', 'lunch', 'invitation'],
  party: ['سهرة', 'حفلة', 'بارتي', 'party'],
  travel: ['مطار', 'رحلة', 'سفر', 'طيارة', 'airport', 'flight', 'travel', 'trip'],
  driving: ['ركنة', 'باركينغ', 'دولاب', 'سواقة', 'parking', 'driving', 'flat tire'],
  shopping: ['سوبرماركت', 'مول', 'تسوق', 'shopping', 'mall', 'groceries'],
  food: ['أكل', 'طبخ', 'مطعم', 'food', 'cooking', 'restaurant', 'eating'],
  sleep: ['نمت', 'نوم', 'غفوة', 'منبه', 'sleep', 'nap', 'alarm', 'tired', 'نعسان'],
  phone: ['تلفون', 'موبايل', 'رسائل', 'اتصال', 'phone', 'call', 'message', 'whatsapp'],
  money: ['مصاري', 'فلوس', 'راتب', 'بطاقة', 'money', 'salary', 'cash', 'card'],
  gym: ['جيم', 'رياضة', 'gym', 'workout', 'exercise'],
  appointments: ['موعد', 'دكتور', 'عيادة', 'appointment', 'doctor', 'clinic'],
  delivery: ['طلبية', 'دليفري', 'طرد', 'delivery', 'package', 'order'],
  home: ['بيت', 'كهربا', 'مي', 'انترنت', 'راوتر', 'home', 'electricity', 'water', 'internet', 'wifi'],
  errands: ['مشوار', 'صيدلية', 'بريد', 'ميكانيكي', 'errand', 'pharmacy', 'mechanic'],
  traffic: ['زحمة', 'تأخرت', 'طريق', 'حادث', 'traffic', 'late', 'jam', 'accident', 'روحة', 'عالطريق'],
  social: ['دعوة', 'مناسبة', 'التزام', 'social', 'event', 'invitation']
};

var TARGET_SYNONYMS = {
  mom: ['أمي', 'امي', 'ماما', 'يمي', 'mom', 'mother'],
  dad: ['بيي', 'بابا', 'أبي', 'ابوي', 'dad', 'father'],
  boss: ['مدير', 'مديري', 'المدير', 'بوس', 'boss', 'manager', 'شغل'],
  friend: ['رفيقي', 'رفيقتي', 'صاحبي', 'صديقي', 'friend'],
  partner: ['حبيبي', 'حبيبتي', 'خطيبي', 'خطيبتي', 'شريكي', 'شريكتي', 'زوجي', 'زوجتي', 'partner', 'boyfriend', 'girlfriend'],
  professor: ['أستاذ', 'الأستاذ', 'دكتور', 'بروفسور', 'professor', 'teacher'],
  family: ['عيلة', 'عيلتي', 'أهل', 'اهلي', 'family']
};

/**
 * Returns the set of canonical category tags implied by the user's free text.
 */
function extractTags_(input) {
  var normalized = normalizeArabic_(input);
  var tags = {};
  Object.keys(KEYWORD_SYNONYMS).forEach(function (tag) {
    var forms = KEYWORD_SYNONYMS[tag];
    for (var i = 0; i < forms.length; i++) {
      if (normalized.indexOf(normalizeArabic_(forms[i])) !== -1) {
        tags[tag] = true;
        break;
      }
    }
  });
  return Object.keys(tags);
}

function detectTargetFromInput_(input) {
  var normalized = normalizeArabic_(input);
  var keys = Object.keys(TARGET_SYNONYMS);
  for (var i = 0; i < keys.length; i++) {
    var forms = TARGET_SYNONYMS[keys[i]];
    for (var j = 0; j < forms.length; j++) {
      if (normalized.indexOf(normalizeArabic_(forms[j])) !== -1) {
        return keys[i];
      }
    }
  }
  return null;
}

function scoreExcuse_(excuse, tags, target, recentIds) {
  var score = 0;

  for (var i = 0; i < tags.length; i++) {
    var tag = tags[i];
    if (excuse.category === tag) score += 10;
    if (excuse.keywords.indexOf(tag) !== -1) score += 5;
  }

  if (target && excuse.targets.indexOf(target) !== -1) {
    score += 8;
  }

  var lastIndex = recentIds.indexOf(excuse.id);
  if (lastIndex === 0) {
    score -= 30; // the excuse shown immediately before this one
  } else if (lastIndex > 0) {
    score -= 15; // shown recently, but not last time
  }

  score += Math.random() * 3; // small jitter so ties don't always resolve the same way

  return score;
}

/**
 * Scores every active excuse and returns the top `limit` candidates
 * (used both by the local fallback and as the shortlist sent to Gemini).
 */
function getCandidates_(tags, target, recentIds, limit) {
  var excuses = getExcuses();
  var scored = excuses.map(function (ex) {
    return { excuse: ex, score: scoreExcuse_(ex, tags, target, recentIds) };
  });
  scored.sort(function (a, b) { return b.score - a.score; });
  return scored.slice(0, limit).map(function (s) {
    return { id: s.excuse.id, excuse: s.excuse.excuse, category: s.excuse.category, targets: s.excuse.targets, score: s.score };
  });
}

function confidenceLabelFromScore_(score) {
  if (score >= 25) return 'هيدي قوية';
  if (score >= 15) return 'بتمشي';
  if (score >= 5) return 'مقنعة شوي';
  return 'الله يستر';
}

function confidenceLabelFromGemini_(confidence) {
  switch (String(confidence || '').toLowerCase()) {
    case 'strong': return 'هيدي قوية';
    case 'medium': return 'بتمشي';
    case 'weak': return 'مقنعة شوي';
    default: return 'بتمشي';
  }
}
