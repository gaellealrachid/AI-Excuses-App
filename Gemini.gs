/**
 * Akhawet Lebanon - Optional Gemini integration.
 * Gemini never invents excuses - it only picks the best ID from a pre-filtered
 * shortlist produced by the local matcher (Matching.gs). Any failure here
 * (missing key, bad JSON, quota, timeout) falls back to local matching silently.
 */

var GEMINI_ENDPOINT_ = 'https://generativelanguage.googleapis.com/v1beta/models/';

function buildGeminiPrompt_(input, target, candidates) {
  var list = candidates.map(function (c) {
    return { id: c.id, excuse: c.excuse, category: c.category, targets: c.targets };
  });

  return [
    'You are the matching engine for Akhawet Lebanon, a Lebanese excuse-generator app.',
    'You receive a user situation and a list of existing excuses with IDs and metadata.',
    'Your job is NOT to invent an excuse. Choose the single existing excuse that best fits the situation.',
    'Prioritize: natural Lebanese social context, believable excuse, correct recipient, situation relevance, variety.',
    '',
    'Situation: ' + input,
    'Preferred target (may be "unknown"): ' + (target || 'unknown'),
    'Available excuses (JSON array): ' + JSON.stringify(list),
    '',
    'Return JSON only, no prose, no markdown fences, in exactly this shape:',
    '{"excuseId": "EX0XX", "confidence": "strong|medium|weak", "reason": "short internal reason"}',
    'Never return an excuseId that is not in the list above.'
  ].join('\n');
}

/**
 * Returns { id, confidence } on success, or null on any failure (caller falls back to local matching).
 */
function selectExcuseWithGemini_(input, target, candidates) {
  if (!isGeminiConfigured() || !candidates.length) return null;

  try {
    var prompt = buildGeminiPrompt_(input, target, candidates);
    var url = GEMINI_ENDPOINT_ + APP_CONFIG.geminiModel + ':generateContent?key=' + encodeURIComponent(getGeminiApiKey_());
    var payload = {
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.4,
        responseMimeType: 'application/json'
      }
    };

    var response = UrlFetchApp.fetch(url, {
      method: 'post',
      contentType: 'application/json',
      payload: JSON.stringify(payload),
      muteHttpExceptions: true
    });

    if (response.getResponseCode() !== 200) {
      logError_('gemini_http_' + response.getResponseCode());
      return null;
    }

    var body = JSON.parse(response.getContentText());
    var text = body.candidates && body.candidates[0] && body.candidates[0].content &&
      body.candidates[0].content.parts && body.candidates[0].content.parts[0] &&
      body.candidates[0].content.parts[0].text;
    if (!text) {
      logError_('gemini_empty_response');
      return null;
    }

    var cleaned = text.trim().replace(/^```json/i, '').replace(/^```/, '').replace(/```$/, '').trim();
    var parsed = JSON.parse(cleaned);
    if (!parsed || !parsed.excuseId) {
      logError_('gemini_invalid_json_shape');
      return null;
    }

    var isValidId = candidates.some(function (c) { return c.id === parsed.excuseId; });
    if (!isValidId) {
      logError_('gemini_unknown_id');
      return null;
    }

    return { id: parsed.excuseId, confidence: parsed.confidence || 'medium' };
  } catch (err) {
    logError_('gemini_exception');
    return null;
  }
}
/**
 * Akhawet Lebanon - Optional Gemini integration.
 * Gemini never invents excuses - it only picks the best ID from a pre-filtered
 * shortlist produced by the local matcher (Matching.gs). Any failure here
 * (missing key, bad JSON, quota, timeout) falls back to local matching silently.
 */

var GEMINI_ENDPOINT_ = 'https://generativelanguage.googleapis.com/v1beta/models/';

function buildGeminiPrompt_(input, target, candidates) {
  var list = candidates.map(function (c) {
    return { id: c.id, excuse: c.excuse, category: c.category, targets: c.targets };
  });

  return [
    'You are the matching engine for Akhawet Lebanon, a Lebanese excuse-generator app.',
    'You receive a user situation and a list of existing excuses with IDs and metadata.',
    'Your job is NOT to invent an excuse. Choose the single existing excuse that best fits the situation.',
    'Prioritize: natural Lebanese social context, believable excuse, correct recipient, situation relevance, variety.',
    '',
    'Situation: ' + input,
    'Preferred target (may be "unknown"): ' + (target || 'unknown'),
    'Available excuses (JSON array): ' + JSON.stringify(list),
    '',
    'Return JSON only, no prose, no markdown fences, in exactly this shape:',
    '{"excuseId": "EX0XX", "confidence": "strong|medium|weak", "reason": "short internal reason"}',
    'Never return an excuseId that is not in the list above.'
  ].join('\n');
}

/**
 * Returns { id, confidence } on success, or null on any failure (caller falls back to local matching).
 */
function selectExcuseWithGemini_(input, target, candidates) {
  if (!isGeminiConfigured() || !candidates.length) return null;

  try {
    var prompt = buildGeminiPrompt_(input, target, candidates);
    var url = GEMINI_ENDPOINT_ + APP_CONFIG.geminiModel + ':generateContent?key=' + encodeURIComponent(getGeminiApiKey_());
    var payload = {
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.4,
        responseMimeType: 'application/json'
      }
    };

    var response = UrlFetchApp.fetch(url, {
      method: 'post',
      contentType: 'application/json',
      payload: JSON.stringify(payload),
      muteHttpExceptions: true
    });

    if (response.getResponseCode() !== 200) {
      logError_('gemini_http_' + response.getResponseCode());
      return null;
    }

    var body = JSON.parse(response.getContentText());
    var text = body.candidates && body.candidates[0] && body.candidates[0].content &&
      body.candidates[0].content.parts && body.candidates[0].content.parts[0] &&
      body.candidates[0].content.parts[0].text;
    if (!text) {
      logError_('gemini_empty_response');
      return null;
    }

    var cleaned = text.trim().replace(/^```json/i, '').replace(/^```/, '').replace(/```$/, '').trim();
    var parsed = JSON.parse(cleaned);
    if (!parsed || !parsed.excuseId) {
      logError_('gemini_invalid_json_shape');
      return null;
    }

    var isValidId = candidates.some(function (c) { return c.id === parsed.excuseId; });
    if (!isValidId) {
      logError_('gemini_unknown_id');
      return null;
    }

    return { id: parsed.excuseId, confidence: parsed.confidence || 'medium' };
  } catch (err) {
    logError_('gemini_exception');
    return null;
  }
}
