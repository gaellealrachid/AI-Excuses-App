/**
 * Akhawet Lebanon - Configuration
 * All secrets live in Script Properties, never hard-coded and never sent to the client.
 */

var APP_CONFIG = {
  appName: 'Akhawet Lebanon',
  geminiModel: 'gemini-2.5-flash',
  maxInputLength: 500,
  candidatePoolSize: 15,
  cacheTtlSeconds: 21600 // 6 hours
};

var TARGET_LABELS = {
  mom: 'ماما',
  dad: 'بيّي',
  boss: 'المدير',
  friend: 'رفيقك',
  partner: 'شريكك',
  professor: 'الأستاذ',
  family: 'العيلة'
};

var FAKE_RESPONSES = {
  mom: {
    accepted: [
      'طيب ماشي، بس ليش ما خبرتني من الأول؟',
      'خلص يلا، بس لا تعيدها.',
      'ماشي حبيبي، بس رد عليي أسرع المرة الجاي.',
      'تمام، بس خفف الدم عليي شوي.'
    ],
    rejected: [
      'أنا ربيتك، بعرف هالحركات.',
      'خلص بلا حكي، تعا عالبيت هلق.',
      'ما عم تمشي هيدي، احكيني الحقيقة.',
      'يلا فهمتك، بس مش قانعة.'
    ]
  },
  dad: {
    accepted: [
      'ماشي، بس خبرني المرة الجاي قبل.',
      'تمام، بس ما تعيدها.',
      'يلا فهمت، خفف الدم عليي شوي.',
      'ok، بس رد عالتلفون المرة الجاي.'
    ],
    rejected: [
      'ما عم تنفع هالقصة معي.',
      'تعا احكيني منيح، هيدي مش مقنعة.',
      'لا لا، في شي ناقص بالحكاية.',
      'هيدا الكلام ما بيمشي معي.'
    ]
  },
  boss: {
    accepted: [
      'Okay, understood.',
      'تمام، بس خبرني بدري المرة الجاي.',
      'Noted, thanks for letting me know.',
      'ماشي، بس حاول ما تتأخر.'
    ],
    rejected: [
      'We need to discuss this tomorrow.',
      'هيدي مش المرة الأولى، لازم نحكي.',
      'Please make sure this doesn’t happen again.',
      'ما عم يقنعني هالعذر بصراحة.'
    ]
  },
  friend: {
    accepted: [
      'ههههه ماشي.',
      'يلا معقول، بس تعوضني.',
      'طيب ماشي، بس ديفعلي قهوة.',
      'ok حبيبي، بس المرة الجاي ما تفوت.'
    ],
    rejected: [
      'كذبة بايخة 😂',
      'طلعت مكشوف يا صاحبي.',
      'معقول هيدا العذر؟ 😂',
      'يلا فضحتك، احكي الحقيقة.'
    ]
  },
  partner: {
    accepted: [
      'Okay ❤️ بس كنت ناطرتك.',
      'ماشي حبيبي، بس افتقدتك.',
      'تمام، بس رد أسرع المرة الجاي.',
      'ok، بس عوضني المرة الجاي 😌'
    ],
    rejected: [
      'لا ما اقتنعت.',
      'في شي مش مظبوط بهالحكاية.',
      'ما عم يزبط معي هالعذر.',
      'حسيت الحكي مش صادق.'
    ]
  },
  professor: {
    accepted: [
      'حسناً، لا تتأخر مرة أخرى.',
      'تمام، بس هاي المرة الأخيرة.',
      'ماشي، بس خبرني بدري لمرة الجاية.'
    ],
    rejected: [
      'هذا العذر غير مقنع.',
      'لازم نحكي بهالموضوع بعد المحاضرة.',
      'غير مقبول، حاول تكون أدق المرة الجاية.'
    ]
  },
  family: {
    accepted: [
      'ماشي، بس ما تعيدها.',
      'يلا فهمنا، خفف الدم.',
      'تمام، بس خبرنا بدري المرة الجاي.'
    ],
    rejected: [
      'هيدي القصة مش قانعانا.',
      'لازم تحكي الحقيقة.',
      'ما مشيت معنا هيدي، بصراحة.'
    ]
  }
};

var SAVAGE_REPLIES = [
  'العذر وصل، بس كرامتك بعدها بالطريق.',
  'شفناها هيدي ألف مرة 😂',
  'خلص، بلشنا نحفظ الأعذار عن ظهر قلب.',
  'يا ريت تجيب عذر جديد شوي المرة الجاي.'
];

function getGeminiApiKey_() {
  return PropertiesService.getScriptProperties().getProperty('GEMINI_API_KEY');
}

function isGeminiConfigured() {
  var key = getGeminiApiKey_();
  return !!(key && key.length > 10);
}

/**
 * Run this once from the Apps Script editor (select this function, click Run)
 * to store your Gemini API key without ever putting it in source code.
 * Example: setGeminiApiKey('AIzaSy...');
 */
function setGeminiApiKey(apiKey) {
  if (!apiKey) throw new Error('Pass your Gemini API key as an argument.');
  PropertiesService.getScriptProperties().setProperty('GEMINI_API_KEY', String(apiKey).trim());
  return 'Gemini API key saved.';
}

function clearGeminiApiKey() {
  PropertiesService.getScriptProperties().deleteProperty('GEMINI_API_KEY');
  return 'Gemini API key removed. The app will use local matching only.';
}

function getSpreadsheetId_() {
  return PropertiesService.getScriptProperties().getProperty('SPREADSHEET_ID');
}

function setSpreadsheetId_(id) {
  PropertiesService.getScriptProperties().setProperty('SPREADSHEET_ID', id);
}
