/**
 * Akhawet Lebanon - Entry point & client-facing API.
 * Everything the browser calls via google.script.run lives here.
 */

function doGet(e) {
  var template = HtmlService.createTemplateFromFile('Index');
  return template.evaluate()
    .setTitle('أخاوات | KEZBE BAYDA')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

/**
 * Main matching entry point called from the client.
 * input: raw user text (the "situation")
 * targetKey: one of TARGET_LABELS keys, or 'auto'/empty to let matching infer it
 * recentIds: array of recently shown excuse IDs (most recent first) to avoid repeats
 */
function generateExcuse(input, targetKey, recentIds) {
  try {
    var text = sanitizeInput_(input);
    var recent = Array.isArray(recentIds) ? recentIds.slice(0, 30) : [];

    if (!text) {
      return { success: false, reason: 'empty' };
    }

    var excuses = getExcuses();
    if (!excuses || !excuses.length) {
      return { success: false, reason: 'no_data' };
    }

    var tags = extractTags_(text);
    var inferredTarget = detectTargetFromInput_(text);
    var requestedTarget = (targetKey && targetKey !== 'auto') ? targetKey : null;
    var searchTarget = requestedTarget || inferredTarget;

    var candidates = getCandidates_(tags, searchTarget, recent, APP_CONFIG.candidatePoolSize);
    candidates = candidates.filter(function (c) { return c.score > -20; });

    if (!candidates.length) {
      return { success: false, reason: 'no_match' };
    }

    var chosenId = null;
    var confidenceLabel = null;
    var usedAi = false;

    if (isGeminiConfigured()) {
      var geminiPick = selectExcuseWithGemini_(text, searchTarget, candidates);
      if (geminiPick) {
        chosenId = geminiPick.id;
        confidenceLabel = confidenceLabelFromGemini_(geminiPick.confidence);
        usedAi = true;
      }
    }

    if (!chosenId) {
      var topScore = candidates[0].score;
      var tieGroup = candidates.filter(function (c) { return topScore - c.score <= 3; });
      var picked = randomChoice_(tieGroup);
      chosenId = picked.id;
      confidenceLabel = confidenceLabelFromScore_(picked.score);
    }

    var excuse = excuses.filter(function (x) { return x.id === chosenId; })[0];
    if (!excuse) {
      excuse = excuses.filter(function (x) { return x.id === candidates[0].id; })[0];
    }
    if (!excuse) {
      return { success: false, reason: 'no_match' };
    }

    var finalTarget = (requestedTarget && excuse.targets.indexOf(requestedTarget) !== -1)
      ? requestedTarget
      : (excuse.targets.indexOf(searchTarget) !== -1 ? searchTarget : (excuse.targets[0] || 'friend'));

    var proof = getProofEvidence_(excuse);
    var pools = getResponsePools_(excuse, finalTarget);

    return {
      success: true,
      excuseId: excuse.id,
      excuse: excuse.excuse,
      category: excuse.category,
      target: finalTarget,
      targetLabel: TARGET_LABELS[finalTarget] || TARGET_LABELS.friend,
      confidenceLabel: confidenceLabel,
      proof: proof,
      responsePools: pools,
      usedAi: usedAi
    };
  } catch (err) {
    logError_('generateExcuse_exception: ' + (err && err.message));
    return { success: false, reason: 'error' };
  }
}

function getResponsePools_(excuse, target) {
  var globalPool = FAKE_RESPONSES[target] || FAKE_RESPONSES.friend;
  var acceptedKey = 'accepted' + target.charAt(0).toUpperCase() + target.slice(1);
  var rejectedKey = 'rejected' + target.charAt(0).toUpperCase() + target.slice(1);

  var accepted = (excuse[acceptedKey] && excuse[acceptedKey].length) ? excuse[acceptedKey] : globalPool.accepted;
  var rejected = (excuse[rejectedKey] && excuse[rejectedKey].length) ? excuse[rejectedKey] : globalPool.rejected;
  var savage = (excuse.savageReply && excuse.savageReply.length) ? excuse.savageReply : SAVAGE_REPLIES;

  return { accepted: accepted, rejected: rejected, savage: savage };
}
