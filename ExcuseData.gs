/**
 * Akhawet Lebanon - Seed content.
 * 100 excuses, stable IDs (EX001-EX100) so Drive images can be matched by filename later.
 * This is only used the first time setupDatabase() runs (or via seedInitialExcuses()).
 * After that, the Google Sheet is the source of truth - edit rows there directly.
 */

function SEED_EXCUSES_() {
  return [
    // ---- work ----
    { id: 'EX001', excuse: 'كنت عالطريق، بس علقت بزحمة قدام الشغل.', category: 'work', subcategory: 'traffic', targets: ['boss', 'friend'], keywords: ['شغل', 'تأخرت', 'زحمة', 'traffic', 'late', 'work', 'office'], proofType: 'traffic', humor: 3, realism: 5, difficulty: 'easy' },
    { id: 'EX002', excuse: 'كان في مشكلة بالسيرفر وقعدت لحتى ينحل.', category: 'work', subcategory: 'it-issue', targets: ['boss'], keywords: ['شغل', 'سيرفر', 'كمبيوتر', 'مشكلة', 'work', 'server', 'error'], proofType: 'screen', humor: 4, realism: 4, difficulty: 'medium' },
    { id: 'EX003', excuse: 'قعدت بالاجتماع أكتر ما كان مخطط.', category: 'work', subcategory: 'meeting', targets: ['boss', 'partner'], keywords: ['اجتماع', 'meeting', 'شغل', 'تأخير'], proofType: 'meeting', humor: 2, realism: 5, difficulty: 'easy' },
    { id: 'EX004', excuse: 'لسا ما خلصت التقرير، بدي شوي وقت إضافي.', category: 'work', subcategory: 'deadline', targets: ['boss'], keywords: ['تقرير', 'report', 'شغل', 'deadline', 'ضغط'], proofType: 'desk', humor: 3, realism: 4, difficulty: 'medium' },

    // ---- university ----
    { id: 'EX005', excuse: 'الباص تأخر وفتني أول نص ساعة.', category: 'university', subcategory: 'transport', targets: ['professor', 'friend'], keywords: ['جامعة', 'باص', 'تأخرت', 'university', 'bus'], proofType: 'bus', humor: 3, realism: 5, difficulty: 'easy' },
    { id: 'EX006', excuse: 'كان في مشكلة بالطباعة وما طلعلي الأسايمنت.', category: 'university', subcategory: 'printing', targets: ['professor'], keywords: ['جامعة', 'طباعة', 'أسايمنت', 'assignment', 'printer'], proofType: 'printer', humor: 4, realism: 4, difficulty: 'medium' },
    { id: 'EX007', excuse: 'نمت وما حسيت بالمنبه.', category: 'university', subcategory: 'oversleep', targets: ['professor', 'friend'], keywords: ['نمت', 'تأخرت', 'منبه', 'alarm', 'نوم'], proofType: 'alarm', humor: 4, realism: 5, difficulty: 'easy' },
    { id: 'EX008', excuse: 'كان عندي كوز فردي مع الأستاذ وطول معي.', category: 'university', subcategory: 'office-hours', targets: ['friend'], keywords: ['جامعة', 'أستاذ', 'مكتب', 'office hours'], proofType: 'office-hours', humor: 2, realism: 4, difficulty: 'medium' },

    // ---- school ----
    { id: 'EX009', excuse: 'نسيت الدفتر بالبيت ورجعت لآخده.', category: 'school', subcategory: 'forgot-item', targets: ['professor', 'family'], keywords: ['مدرسة', 'دفتر', 'نسيان', 'school'], proofType: 'backpack', humor: 3, realism: 4, difficulty: 'easy' },
    { id: 'EX010', excuse: 'كان في تبديل بالباص المدرسي وتأخر.', category: 'school', subcategory: 'transport', targets: ['family', 'professor'], keywords: ['مدرسة', 'باص', 'تأخير', 'school bus'], proofType: 'school-bus', humor: 2, realism: 5, difficulty: 'easy' },
    { id: 'EX011', excuse: 'تعطلت السخانة وتأخرت لآخذ دوش.', category: 'school', subcategory: 'home-delay', targets: ['family'], keywords: ['سخانة', 'دوش', 'تأخرت', 'water heater'], proofType: 'bathroom', humor: 3, realism: 4, difficulty: 'medium' },
    { id: 'EX012', excuse: 'كنت عم دوّر محفظتي قبل ما طلع.', category: 'school', subcategory: 'lost-item', targets: ['family', 'professor'], keywords: ['دوّرت', 'محفظة', 'تأخرت', 'wallet'], proofType: 'bag-search', humor: 3, realism: 4, difficulty: 'easy' },

    // ---- parents ----
    { id: 'EX013', excuse: 'كنت عالطريق، بس علقت بالزحمة.', category: 'parents', subcategory: 'traffic', targets: ['mom', 'dad'], keywords: ['أمي', 'بيي', 'زحمة', 'تأخرت', 'وين صرت', 'وين انت'], proofType: 'traffic', humor: 2, realism: 5, difficulty: 'easy' },
    { id: 'EX014', excuse: 'كنت عند رفيقي وما حسيت بالوقت.', category: 'parents', subcategory: 'friends', targets: ['mom', 'dad'], keywords: ['رفيقي', 'تأخرت', 'أمي', 'بيي'], proofType: 'friend-hangout', humor: 3, realism: 4, difficulty: 'medium' },
    { id: 'EX015', excuse: 'ما سمعت التلفون، كان مسكّر عالصامت.', category: 'parents', subcategory: 'phone', targets: ['mom', 'dad', 'partner'], keywords: ['تلفون', 'ما رديت', 'صامت', 'missed call'], proofType: 'phone-silent', humor: 4, realism: 5, difficulty: 'easy' },
    { id: 'EX016', excuse: 'كنت نايم، تعبت كتير اليوم.', category: 'parents', subcategory: 'sleep', targets: ['mom', 'dad', 'partner'], keywords: ['نمت', 'تعبان', 'نوم', 'sleep'], proofType: 'nap', humor: 3, realism: 5, difficulty: 'easy' },

    // ---- family ----
    { id: 'EX017', excuse: 'كان عنا ضيوف مفاجئين بالبيت.', category: 'family', subcategory: 'guests', targets: ['family'], keywords: ['ضيوف', 'عيلة', 'بيت', 'guests'], proofType: 'guests', humor: 2, realism: 4, difficulty: 'medium' },
    { id: 'EX018', excuse: 'سيارة عمي تعطلت وكان لازم ساعده.', category: 'family', subcategory: 'car-help', targets: ['family'], keywords: ['سيارة', 'عطل', 'عمي', 'family', 'car trouble'], proofType: 'car-trouble', humor: 3, realism: 4, difficulty: 'medium' },
    { id: 'EX019', excuse: 'جدتي حبتني احكي معها عالتلفون طويل.', category: 'family', subcategory: 'grandma', targets: ['family'], keywords: ['جدتي', 'تلفون', 'حكي', 'grandma'], proofType: 'phone-call', humor: 4, realism: 5, difficulty: 'easy' },
    { id: 'EX020', excuse: 'كان في مشوار لازم خلصو قبل ما إجي.', category: 'family', subcategory: 'errand', targets: ['family'], keywords: ['مشوار', 'errand', 'عيلة'], proofType: 'errand', humor: 2, realism: 4, difficulty: 'medium' },

    // ---- friends ----
    { id: 'EX021', excuse: 'طلعتلي شغلة آخر لحظة وما قدرت ألغيها.', category: 'friends', subcategory: 'cancel', targets: ['friend'], keywords: ['رفيقي', 'ألغيت', 'آخر لحظة', 'cancel'], proofType: 'last-minute', humor: 3, realism: 4, difficulty: 'easy' },
    { id: 'EX022', excuse: 'تعبان شوي اليوم، بس بعوضك المرة الجاي.', category: 'friends', subcategory: 'sick', targets: ['friend', 'partner'], keywords: ['تعبان', 'مريض', 'sick', 'tired'], proofType: 'tired', humor: 2, realism: 5, difficulty: 'easy' },
    { id: 'EX023', excuse: 'خيي محتاجني بشغلة بالبيت وما قدرت اطلع.', category: 'friends', subcategory: 'family-help', targets: ['friend', 'family'], keywords: ['خيي', 'بيت', 'مساعدة', 'brother'], proofType: 'home-help', humor: 3, realism: 4, difficulty: 'medium' },
    { id: 'EX024', excuse: 'بطاريتي فضيت وما شفت رسايلك إلا هلق.', category: 'friends', subcategory: 'phone', targets: ['friend', 'partner'], keywords: ['بطارية', 'تلفون', 'رسايل', 'battery', 'phone dead'], proofType: 'dead-phone', humor: 4, realism: 5, difficulty: 'easy' },

    // ---- partner ----
    { id: 'EX025', excuse: 'كنت عم رتب لك مفاجأة وضاع مني الوقت.', category: 'partner', subcategory: 'surprise', targets: ['partner'], keywords: ['مفاجأة', 'حبيبتي', 'حبيبي', 'surprise'], proofType: 'surprise-prep', humor: 4, realism: 3, difficulty: 'hard' },
    { id: 'EX026', excuse: 'تلفوني كان عم يشحن بغرفة تانية.', category: 'partner', subcategory: 'phone', targets: ['partner'], keywords: ['شحن', 'تلفون', 'charging'], proofType: 'charging', humor: 2, realism: 5, difficulty: 'easy' },
    { id: 'EX027', excuse: 'كان عندي بروفة شغل ما قدرت أأجلها.', category: 'partner', subcategory: 'work-call', targets: ['partner', 'boss'], keywords: ['شغل', 'بروفة', 'اجتماع', 'work call'], proofType: 'work-call', humor: 2, realism: 5, difficulty: 'medium' },
    { id: 'EX028', excuse: 'غفيت شوي وما حسيت إنو الوقت عدى.', category: 'partner', subcategory: 'sleep', targets: ['partner'], keywords: ['غفوة', 'نمت', 'نوم'], proofType: 'nap', humor: 3, realism: 5, difficulty: 'easy' },

    // ---- dating ----
    { id: 'EX029', excuse: 'صاحبتي احتاجتني فجأة وما قدرت قلها لأ.', category: 'dating', subcategory: 'friend-emergency', targets: ['friend', 'partner'], keywords: ['صاحبتي', 'dating', 'تعارف'], proofType: 'friend-emergency', humor: 3, realism: 4, difficulty: 'medium' },
    { id: 'EX030', excuse: 'شكلي حجزت الطاولة بمطعم غلط ورجعت دوّر.', category: 'dating', subcategory: 'reservation', targets: ['partner'], keywords: ['حجز', 'مطعم', 'dating', 'reservation'], proofType: 'reservation', humor: 4, realism: 3, difficulty: 'medium' },
    { id: 'EX031', excuse: 'ضعت وأنا داخل عالمكان، ما بعرف المنطقة منيح.', category: 'dating', subcategory: 'lost', targets: ['partner', 'friend'], keywords: ['ضعت', 'خريطة', 'lost', 'maps'], proofType: 'lost', humor: 3, realism: 4, difficulty: 'easy' },
    { id: 'EX032', excuse: 'طلعت الشغلة أطول ما كنت متوقع بالصالون.', category: 'dating', subcategory: 'getting-ready', targets: ['partner'], keywords: ['صالون', 'تجهيز', 'getting ready'], proofType: 'salon', humor: 2, realism: 5, difficulty: 'easy' },

    // ---- wedding ----
    { id: 'EX033', excuse: 'ما لقيت شي مناسب البسه على آخر لحظة.', category: 'wedding', subcategory: 'outfit', targets: ['family', 'mom'], keywords: ['عرس', 'لبس', 'wedding', 'outfit'], proofType: 'closet', humor: 3, realism: 5, difficulty: 'easy' },
    { id: 'EX034', excuse: 'كان في زحمة رهيبة عند القاعة.', category: 'wedding', subcategory: 'traffic', targets: ['family'], keywords: ['عرس', 'زحمة', 'قاعة', 'wedding traffic'], proofType: 'traffic', humor: 2, realism: 5, difficulty: 'easy' },
    { id: 'EX035', excuse: 'ما حسيت منيح اليوم وما بدي حدا ياخد مني.', category: 'wedding', subcategory: 'sick', targets: ['family', 'mom'], keywords: ['تعبانة', 'مريضة', 'عرس', 'sick', 'wedding'], proofType: 'medicine', humor: 2, realism: 4, difficulty: 'medium' },
    { id: 'EX036', excuse: 'خلصت الشغل متأخر وما قدرت ألحق أول الفرح.', category: 'wedding', subcategory: 'work', targets: ['family', 'friend'], keywords: ['شغل', 'عرس', 'تأخرت', 'wedding late'], proofType: 'desk', humor: 2, realism: 5, difficulty: 'medium' },

    // ---- dinner ----
    { id: 'EX037', excuse: 'راسي عم يوجعني كتير من الصبح.', category: 'dinner', subcategory: 'headache', targets: ['mom', 'family'], keywords: ['عزيمة', 'راسي', 'صداع', 'headache', 'dinner'], proofType: 'headache', humor: 2, realism: 5, difficulty: 'easy' },
    { id: 'EX038', excuse: 'أكلت شي غلط وما حسيت حالي منيح.', category: 'dinner', subcategory: 'stomach', targets: ['mom', 'family'], keywords: ['أكل', 'معدة', 'عزيمة', 'stomach'], proofType: 'stomach', humor: 3, realism: 4, difficulty: 'medium' },
    { id: 'EX039', excuse: 'عندي شغلة بكرا الصبح باكر ولازم نام بدري.', category: 'dinner', subcategory: 'early-morning', targets: ['family', 'friend'], keywords: ['بكرا', 'دوام', 'نام بدري', 'early'], proofType: 'early-morning', humor: 2, realism: 5, difficulty: 'easy' },
    { id: 'EX040', excuse: 'سيارتي مش طايلة اليوم وما لقيت مشوار.', category: 'dinner', subcategory: 'no-ride', targets: ['family', 'friend'], keywords: ['سيارة', 'مشوار', 'عزيمة', 'no ride'], proofType: 'car-trouble', humor: 3, realism: 4, difficulty: 'medium' },

    // ---- party ----
    { id: 'EX041', excuse: 'ما معي كازيون هلق لبعد كتير.', category: 'party', subcategory: 'gas', targets: ['friend'], keywords: ['بنزين', 'كازيون', 'gas', 'party'], proofType: 'gas', humor: 3, realism: 5, difficulty: 'easy' },
    { id: 'EX042', excuse: 'لسا ما لقيت لبس مناسب للسهرة.', category: 'party', subcategory: 'outfit', targets: ['friend'], keywords: ['لبس', 'سهرة', 'party outfit'], proofType: 'closet', humor: 3, realism: 5, difficulty: 'easy' },
    { id: 'EX043', excuse: 'خيتي محتاجة تستخدم سيارتي الليلة.', category: 'party', subcategory: 'car-shared', targets: ['friend'], keywords: ['سيارة', 'خيتي', 'sister', 'car'], proofType: 'car-shared', humor: 2, realism: 5, difficulty: 'medium' },
    { id: 'EX044', excuse: 'قاعد بمكان تاني وصعب فك حالي هلق.', category: 'party', subcategory: 'stuck-elsewhere', targets: ['friend'], keywords: ['مكان تاني', 'stuck', 'party'], proofType: 'stuck-elsewhere', humor: 3, realism: 4, difficulty: 'medium' },

    // ---- travel ----
    { id: 'EX045', excuse: 'تأخرت الرحلة ساعة كاملة.', category: 'travel', subcategory: 'flight-delay', targets: ['family', 'boss'], keywords: ['مطار', 'رحلة', 'تأخير', 'flight delay'], proofType: 'airport-board', humor: 2, realism: 5, difficulty: 'easy' },
    { id: 'EX046', excuse: 'ضاعت الشنطة وقعدت أدوّر عليها.', category: 'travel', subcategory: 'luggage', targets: ['family'], keywords: ['شنطة', 'مطار', 'luggage'], proofType: 'luggage', humor: 3, realism: 4, difficulty: 'medium' },
    { id: 'EX047', excuse: 'ما وصلني الموافقة على الأوراق لهلق.', category: 'travel', subcategory: 'documents', targets: ['family', 'boss'], keywords: ['أوراق', 'وثائق', 'travel documents'], proofType: 'documents', humor: 2, realism: 4, difficulty: 'medium' },
    { id: 'EX048', excuse: 'الفحص الأمني كان طويل كتير اليوم.', category: 'travel', subcategory: 'security-line', targets: ['family', 'friend'], keywords: ['أمن', 'مطار', 'security line'], proofType: 'security-line', humor: 2, realism: 5, difficulty: 'easy' },

    // ---- driving ----
    { id: 'EX049', excuse: 'كنت عم دوّر عالركنة من شي نص ساعة.', category: 'driving', subcategory: 'parking', targets: ['mom', 'dad', 'boss', 'partner'], keywords: ['ركنة', 'باركينغ', 'parking', 'دوّرت'], proofType: 'parking', humor: 4, realism: 5, difficulty: 'easy' },
    { id: 'EX050', excuse: 'علقت بحفرة عالطريق واضطريت غير الدولاب.', category: 'driving', subcategory: 'flat-tire', targets: ['boss', 'mom'], keywords: ['دولاب', 'عطل', 'flat tire'], proofType: 'flat-tire', humor: 2, realism: 5, difficulty: 'medium' },
    { id: 'EX051', excuse: 'سكرو الطريق للصيانة وضل لازم ندور طريق تاني.', category: 'driving', subcategory: 'road-closed', targets: ['boss', 'family'], keywords: ['سكر طريق', 'صيانة', 'road closed'], proofType: 'road-closed', humor: 2, realism: 5, difficulty: 'easy' },
    { id: 'EX052', excuse: 'ما لقيت بنزين وكان لازم فوت عالمحطة.', category: 'driving', subcategory: 'gas', targets: ['mom', 'boss'], keywords: ['بنزين', 'محطة', 'gas station'], proofType: 'gas', humor: 2, realism: 5, difficulty: 'easy' },

    // ---- shopping ----
    { id: 'EX053', excuse: 'الطابور بالكاشير كان طويل كتير.', category: 'shopping', subcategory: 'checkout', targets: ['partner', 'family'], keywords: ['سوبرماركت', 'طابور', 'checkout'], proofType: 'checkout-line', humor: 2, realism: 5, difficulty: 'easy' },
    { id: 'EX054', excuse: 'ما لقيت باركينغ قريب من المول.', category: 'shopping', subcategory: 'parking', targets: ['friend', 'partner'], keywords: ['مول', 'باركينغ', 'mall parking'], proofType: 'parking', humor: 2, realism: 5, difficulty: 'easy' },
    { id: 'EX055', excuse: 'رجعت غيرت الغراض لأنو كان في غلط بالمقاس.', category: 'shopping', subcategory: 'exchange', targets: ['partner'], keywords: ['تبديل', 'مقاس', 'exchange', 'size'], proofType: 'return-exchange', humor: 2, realism: 4, difficulty: 'medium' },
    { id: 'EX056', excuse: 'كانت في تخفيضات وما قدرت فوت من قدامها.', category: 'shopping', subcategory: 'sale', targets: ['friend', 'partner'], keywords: ['تخفيضات', 'sale', 'shopping'], proofType: 'sale-sign', humor: 4, realism: 4, difficulty: 'easy' },

    // ---- food ----
    { id: 'EX057', excuse: 'كنت عم خلّص أكلي.', category: 'food', subcategory: 'eating', targets: ['mom', 'partner'], keywords: ['أكل', 'خلصت', 'eating'], proofType: 'plate', humor: 3, realism: 5, difficulty: 'easy' },
    { id: 'EX058', excuse: 'الأكل طلع متأخر من المطعم.', category: 'food', subcategory: 'delivery-late', targets: ['friend', 'partner'], keywords: ['دليفري', 'مطعم', 'delivery late'], proofType: 'delivery-tracker', humor: 2, realism: 5, difficulty: 'easy' },
    { id: 'EX059', excuse: 'كنت عم حضّر شي بالمطبخ وما بديت أوقف بالنص.', category: 'food', subcategory: 'cooking', targets: ['mom', 'partner'], keywords: ['طبخ', 'مطبخ', 'cooking'], proofType: 'kitchen', humor: 3, realism: 5, difficulty: 'easy' },
    { id: 'EX060', excuse: 'غسلت الصحون قبل ما طلع، صار في وقت.', category: 'food', subcategory: 'dishes', targets: ['mom'], keywords: ['صحون', 'غسيل', 'dishes'], proofType: 'dishes', humor: 3, realism: 4, difficulty: 'easy' },

    // ---- sleep ----
    { id: 'EX061', excuse: 'قلت بقعد خمس دقايق.', category: 'sleep', subcategory: 'nap', targets: ['mom', 'partner'], keywords: ['نمت', 'خمس دقايق', 'nap'], proofType: 'couch-nap', humor: 4, realism: 5, difficulty: 'easy' },
    { id: 'EX062', excuse: 'ضبطت المنبه بس ما حسيت فيه.', category: 'sleep', subcategory: 'alarm', targets: ['boss', 'mom'], keywords: ['منبه', 'alarm', 'تأخرت'], proofType: 'alarm', humor: 3, realism: 5, difficulty: 'easy' },
    { id: 'EX063', excuse: 'سهرت اشتغل عالتقرير وما حسيت بالوقت.', category: 'sleep', subcategory: 'late-work', targets: ['boss', 'family'], keywords: ['سهر', 'شغل', 'late night'], proofType: 'late-night-desk', humor: 2, realism: 5, difficulty: 'medium' },
    { id: 'EX064', excuse: 'نمت بلبسي من التعب.', category: 'sleep', subcategory: 'exhausted', targets: ['partner', 'mom'], keywords: ['تعب', 'نوم', 'exhausted'], proofType: 'nap', humor: 3, realism: 5, difficulty: 'easy' },

    // ---- phone ----
    { id: 'EX065', excuse: 'ما سمعت التلفون.', category: 'phone', subcategory: 'missed-call', targets: ['mom', 'partner'], keywords: ['تلفون', 'ما سمعت', 'missed call'], proofType: 'phone-pillow', humor: 3, realism: 5, difficulty: 'easy' },
    { id: 'EX066', excuse: 'كان الموبايل عم يشحن ببعيد عني.', category: 'phone', subcategory: 'charging', targets: ['partner', 'mom'], keywords: ['شحن', 'تلفون', 'charging'], proofType: 'charging', humor: 2, realism: 5, difficulty: 'easy' },
    { id: 'EX067', excuse: 'طفى الموبايل من البطارية وما حسيت.', category: 'phone', subcategory: 'dead-battery', targets: ['boss', 'friend'], keywords: ['بطارية', 'طفي', 'battery dead'], proofType: 'dead-phone', humor: 3, realism: 5, difficulty: 'easy' },
    { id: 'EX068', excuse: 'كان في تحديث عالموبايل وسكرلي الرسائل شوي.', category: 'phone', subcategory: 'update', targets: ['friend', 'partner'], keywords: ['تحديث', 'رسائل', 'update', 'messages'], proofType: 'update-screen', humor: 4, realism: 3, difficulty: 'medium' },

    // ---- money ----
    { id: 'EX069', excuse: 'بطاقتي ما مشيت وكان لازم دوّر كاش.', category: 'money', subcategory: 'card-declined', targets: ['partner', 'friend'], keywords: ['بطاقة', 'كاش', 'card declined'], proofType: 'card-declined', humor: 3, realism: 5, difficulty: 'easy' },
    { id: 'EX070', excuse: 'لسا ما وصلني الراتب هالشهر.', category: 'money', subcategory: 'salary', targets: ['dad', 'family'], keywords: ['راتب', 'مصاري', 'salary', 'money'], proofType: 'bank-app', humor: 2, realism: 5, difficulty: 'easy' },
    { id: 'EX071', excuse: 'صرفت أكتر ما كان بالخطة وضل لازم دبر حالي.', category: 'money', subcategory: 'overspend', targets: ['dad', 'partner'], keywords: ['صرف', 'مصاري', 'spending'], proofType: 'receipts', humor: 3, realism: 4, difficulty: 'medium' },
    { id: 'EX072', excuse: 'نسيت محفظتي بالبيت ورجعت لآخدها.', category: 'money', subcategory: 'forgot-wallet', targets: ['friend', 'partner'], keywords: ['محفظة', 'نسيان', 'wallet'], proofType: 'wallet', humor: 3, realism: 5, difficulty: 'easy' },

    // ---- gym ----
    { id: 'EX073', excuse: 'طولت أكتر بالجيم من العادة.', category: 'gym', subcategory: 'workout', targets: ['friend', 'partner'], keywords: ['جيم', 'رياضة', 'gym'], proofType: 'gym-bag', humor: 2, realism: 5, difficulty: 'easy' },
    { id: 'EX074', excuse: 'كان في زحمة عالمعدات وناطرت دوري.', category: 'gym', subcategory: 'crowded', targets: ['friend'], keywords: ['جيم', 'معدات', 'gym crowded'], proofType: 'gym-equipment', humor: 3, realism: 5, difficulty: 'easy' },
    { id: 'EX075', excuse: 'رحت أستحم بعد الرياضة وطول معي.', category: 'gym', subcategory: 'shower', targets: ['partner'], keywords: ['جيم', 'دوش', 'gym shower'], proofType: 'gym-shower', humor: 2, realism: 5, difficulty: 'easy' },
    { id: 'EX076', excuse: 'جسمي كان متعب ونمت بعد الرياضة شوي.', category: 'gym', subcategory: 'tired', targets: ['friend', 'partner'], keywords: ['تعب', 'رياضة', 'gym tired'], proofType: 'nap', humor: 3, realism: 5, difficulty: 'easy' },

    // ---- appointments ----
    { id: 'EX077', excuse: 'تأخرت عالموعد.', category: 'appointments', subcategory: 'late', targets: ['boss', 'family'], keywords: ['موعد', 'تأخرت', 'appointment'], proofType: 'waiting-room', humor: 2, realism: 5, difficulty: 'easy' },
    { id: 'EX078', excuse: 'الدكتور كان متأخر بموعده وناطرت دوري.', category: 'appointments', subcategory: 'doctor-late', targets: ['boss', 'family'], keywords: ['دكتور', 'عيادة', 'doctor'], proofType: 'waiting-room', humor: 2, realism: 5, difficulty: 'easy' },
    { id: 'EX079', excuse: 'غيرولي الموعد آخر لحظة ورحت اتأكد.', category: 'appointments', subcategory: 'reschedule', targets: ['boss'], keywords: ['موعد', 'تغيير', 'reschedule'], proofType: 'appointment-app', humor: 2, realism: 4, difficulty: 'medium' },
    { id: 'EX080', excuse: 'كان في فحص إضافي ما كان متوقع.', category: 'appointments', subcategory: 'extra-test', targets: ['family', 'boss'], keywords: ['فحص', 'دكتور', 'test', 'exam'], proofType: 'clinic-form', humor: 2, realism: 4, difficulty: 'medium' },

    // ---- delivery ----
    { id: 'EX081', excuse: 'كنت ناطر طلبية وما بدي فوتها.', category: 'delivery', subcategory: 'waiting', targets: ['mom', 'partner'], keywords: ['طلبية', 'دليفري', 'delivery'], proofType: 'delivery-tracker', humor: 2, realism: 5, difficulty: 'easy' },
    { id: 'EX082', excuse: 'السائق ضل ودوّر عالعنوان.', category: 'delivery', subcategory: 'driver-lost', targets: ['friend'], keywords: ['سائق', 'عنوان', 'driver lost'], proofType: 'maps-app', humor: 3, realism: 4, difficulty: 'medium' },
    { id: 'EX083', excuse: 'كان لازم وقع عالطلبية بايدي.', category: 'delivery', subcategory: 'signature', targets: ['mom'], keywords: ['طرد', 'توقيع', 'package'], proofType: 'package', humor: 2, realism: 5, difficulty: 'easy' },
    { id: 'EX084', excuse: 'الطلبية إجت غلط واضطريت رجعها.', category: 'delivery', subcategory: 'wrong-order', targets: ['partner'], keywords: ['طلبية غلط', 'wrong order'], proofType: 'package', humor: 3, realism: 4, difficulty: 'medium' },

    // ---- home ----
    { id: 'EX085', excuse: 'كنت عم رتب غرفتي شوي.', category: 'home', subcategory: 'cleaning', targets: ['mom'], keywords: ['ترتيب', 'غرفة', 'cleaning'], proofType: 'room', humor: 2, realism: 4, difficulty: 'easy' },
    { id: 'EX086', excuse: 'انقطعت الكهربا وضل لازم ننطر المولد.', category: 'home', subcategory: 'power-outage', targets: ['family', 'mom'], keywords: ['كهربا', 'مولد', 'power outage'], proofType: 'power-outage', humor: 2, realism: 5, difficulty: 'easy' },
    { id: 'EX087', excuse: 'كان في مشكلة بالمي وضل لازم صلحها.', category: 'home', subcategory: 'plumbing', targets: ['dad', 'family'], keywords: ['مي', 'صنبور', 'plumbing'], proofType: 'plumbing', humor: 2, realism: 4, difficulty: 'medium' },
    { id: 'EX088', excuse: 'الإنترنت وقع وضل لازم ريستارت الراوتر.', category: 'home', subcategory: 'internet-down', targets: ['family', 'friend'], keywords: ['إنترنت', 'راوتر', 'wifi', 'internet down'], proofType: 'router', humor: 3, realism: 5, difficulty: 'easy' },

    // ---- errands ----
    { id: 'EX089', excuse: 'كان لازم فوت عالصيدلية قبل ما تسكر.', category: 'errands', subcategory: 'pharmacy', targets: ['mom', 'family'], keywords: ['صيدلية', 'دوا', 'pharmacy'], proofType: 'pharmacy', humor: 2, realism: 5, difficulty: 'easy' },
    { id: 'EX090', excuse: 'رحت جبت غراض كانت ناقصة بالبيت.', category: 'errands', subcategory: 'groceries', targets: ['mom'], keywords: ['غراض', 'سوبرماركت', 'groceries'], proofType: 'grocery-bag', humor: 2, realism: 5, difficulty: 'easy' },
    { id: 'EX091', excuse: 'كان لازم روح عالبريد آخد طرد.', category: 'errands', subcategory: 'post-office', targets: ['dad', 'friend'], keywords: ['بريد', 'طرد', 'post office'], proofType: 'post-office', humor: 2, realism: 4, difficulty: 'easy' },
    { id: 'EX092', excuse: 'خدت السيارة عالميكانيكي شوي.', category: 'errands', subcategory: 'mechanic', targets: ['dad', 'friend'], keywords: ['ميكانيكي', 'سيارة', 'mechanic'], proofType: 'mechanic', humor: 2, realism: 5, difficulty: 'easy' },

    // ---- traffic ----
    { id: 'EX093', excuse: 'كان في حادث عالطريق وسكرو مسرب.', category: 'traffic', subcategory: 'accident', targets: ['boss', 'mom'], keywords: ['حادث', 'زحمة', 'accident', 'traffic'], proofType: 'traffic', humor: 2, realism: 5, difficulty: 'easy' },
    { id: 'EX094', excuse: 'الإشارة كانت عاطلة وصار في زحمة رهيبة.', category: 'traffic', subcategory: 'traffic-light', targets: ['boss', 'friend'], keywords: ['إشارة', 'زحمة', 'traffic light'], proofType: 'traffic-light', humor: 2, realism: 5, difficulty: 'easy' },
    { id: 'EX095', excuse: 'كانت في مسيرة سكرت الطريق.', category: 'traffic', subcategory: 'protest', targets: ['boss', 'family'], keywords: ['تظاهرة', 'سكر طريق', 'protest', 'road closed'], proofType: 'road-closed', humor: 2, realism: 5, difficulty: 'easy' },
    { id: 'EX096', excuse: 'الجسر كان مسكر وضل لازم دور طريق تانية.', category: 'traffic', subcategory: 'bridge-closed', targets: ['boss', 'partner'], keywords: ['جسر', 'طريق مسكر', 'bridge closed'], proofType: 'road-closed', humor: 2, realism: 5, difficulty: 'easy' },

    // ---- social ----
    { id: 'EX097', excuse: 'كان عندي التزام تاني ما قدرت ألغيه.', category: 'social', subcategory: 'conflict', targets: ['friend', 'family'], keywords: ['التزام', 'دعوة', 'commitment'], proofType: 'calendar', humor: 2, realism: 4, difficulty: 'medium' },
    { id: 'EX098', excuse: 'حسيت حالي متعب اجتماعياً اليوم وبديت أرتاح.', category: 'social', subcategory: 'introvert', targets: ['friend'], keywords: ['تعبان اجتماعيا', 'راحة', 'introvert'], proofType: 'quiet-evening', humor: 3, realism: 4, difficulty: 'medium' },
    { id: 'EX099', excuse: 'كان في مناسبة عيلة ثانية بنفس التوقيت.', category: 'social', subcategory: 'family-conflict', targets: ['friend', 'family'], keywords: ['مناسبة', 'عيلة', 'family event'], proofType: 'family-gathering', humor: 2, realism: 4, difficulty: 'medium' },
    { id: 'EX100', excuse: 'خدت قرار أرتاح اليوم بعد أسبوع تعب.', category: 'social', subcategory: 'rest-day', targets: ['friend', 'partner'], keywords: ['راحة', 'تعب', 'rest'], proofType: 'rest-day', humor: 3, realism: 4, difficulty: 'easy' }
  ];
}
