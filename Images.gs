/**
 * Akhawet Lebanon - Proof "evidence".
 * Instead of real photos, every excuse's `proofType` (e.g. "traffic", "kitchen",
 * "gym-bag") maps to a funny emoji combo - keeps the joke "proof" concept
 * without needing to source, host, or upload any images.
 */

var PROOF_EMOJI_MAP_ = {
  'traffic': '🚗🚦', 'screen': '💻⚠️', 'meeting': '🗣️📊', 'desk': '🖥️📎', 'bus': '🚌',
  'printer': '🖨️📄', 'alarm': '⏰😴', 'office-hours': '🚪🎓', 'backpack': '🎒',
  'school-bus': '🚌🎒', 'bathroom': '🚿', 'bag-search': '👜🔍',
  'friend-hangout': '👬🛋️', 'phone-silent': '📵', 'nap': '😴💤', 'guests': '🛎️👀',
  'car-trouble': '🚗🔧', 'phone-call': '📞', 'errand': '🏃‍♂️',
  'last-minute': '⏱️😬', 'tired': '🥱', 'home-help': '🏠🤝',
  'dead-phone': '🔋💀', 'surprise-prep': '🎁🤫', 'charging': '🔌🔋',
  'work-call': '📞💼', 'friend-emergency': '🆘👯', 'reservation': '📅🍽️',
  'lost': '🗺️😵', 'salon': '💇‍♀️', 'closet': '👗🚪', 'medicine': '💊',
  'headache': '🤕', 'stomach': '🤢', 'early-morning': '🌅⏰', 'gas': '⛽',
  'car-shared': '🚗🤝', 'stuck-elsewhere': '📍😅', 'airport-board': '🛫⏱️',
  'luggage': '🧳', 'documents': '📄🖊️', 'security-line': '🛂⏳',
  'parking': '🅿️🌀', 'flat-tire': '🛞💥', 'road-closed': '🚧',
  'checkout-line': '🛒⏳', 'return-exchange': '🔁🛍️', 'sale-sign': '🏷️😍',
  'plate': '🍽️', 'delivery-tracker': '📦🛵', 'kitchen': '🍳', 'dishes': '🍽️🧽',
  'couch-nap': '🛋️😴', 'late-night-desk': '🌙💻', 'phone-pillow': '📱🛏️',
  'update-screen': '📲⏳', 'card-declined': '💳❌', 'bank-app': '🏦📱',
  'receipts': '🧾', 'wallet': '👛', 'gym-bag': '🏋️‍♂️👜', 'gym-equipment': '🏋️‍♀️⏳',
  'gym-shower': '🚿💪', 'waiting-room': '🪑⏳', 'appointment-app': '📅📱',
  'clinic-form': '📋🩺', 'maps-app': '🗺️📍', 'package': '📦',
  'room': '🧹🛏️', 'power-outage': '🔌💡', 'plumbing': '🚰🔧', 'router': '📶🔁',
  'pharmacy': '💊🏥', 'grocery-bag': '🛍️🥖', 'post-office': '📮',
  'mechanic': '🔧🚗', 'traffic-light': '🚦', 'calendar': '📅❗',
  'quiet-evening': '🌙🍵', 'family-gathering': '👨‍👩‍👧‍👦🍲', 'rest-day': '🛌✨',
  'chewed-notebook': '🐶📓'
};

var PROOF_EMOJI_FALLBACK_ = ['🤷', '📦', '🙈', '🫣', '🤔', '😅', '🕵️‍♂️', '🎭'];

function hashString_(str) {
  var hash = 0;
  var s = String(str);
  for (var i = 0; i < s.length; i++) {
    hash = ((hash << 5) - hash + s.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

/**
 * Returns { available: true, emoji } - the "proof" for an excuse.
 * Looks up `excuse.proofType` (falling back to `excuse.category`) in the map
 * above; if there's no match, picks a deterministic emoji from the fallback
 * pool (seeded by the excuse ID) so the same excuse always shows the same one.
 */
function getProofEvidence_(excuse) {
  var key = String((excuse && excuse.proofType) || (excuse && excuse.category) || '').trim();
  var emoji = PROOF_EMOJI_MAP_[key];
  if (!emoji) {
    var seed = (excuse && excuse.id) || key || 'akhawet';
    emoji = PROOF_EMOJI_FALLBACK_[hashString_(seed) % PROOF_EMOJI_FALLBACK_.length];
  }
  return { available: true, emoji: emoji };
}
