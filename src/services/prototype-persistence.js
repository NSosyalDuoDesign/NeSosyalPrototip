import { interestIds } from '../data/mock-interests.js'
import { postIds } from '../data/mock-posts.js'
import {
  CAMPAIGN_ENTRY_MODES,
  CAMPAIGN_LAYER_IDS,
  campaignContextIds,
  campaignReactionOptionIds,
} from '../data/campaign-contexts.js'

export const PROTOTYPE_STORAGE_KEY = 'ne-sosyal.prototype-preferences.v1'

const feedbackValues = new Set(['neutral', 'interested', 'notInterested'])
const presetValues = new Set(['fluid', 'balanced', 'comfortable'])
const validInterestIds = new Set(interestIds)
const validPostIds = new Set(postIds)
const validCampaignIds = new Set(campaignContextIds)
const validCampaignModes = new Set(Object.values(CAMPAIGN_ENTRY_MODES))
const validCampaignLayers = new Set(CAMPAIGN_LAYER_IDS)
const validConversionStates = new Set(['idle', 'transition', 'complete'])

function sanitizeFeedbackMap(value, validKeys) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {}

  return Object.fromEntries(
    Object.entries(value).filter(
      ([key, feedback]) => validKeys.has(key) && feedbackValues.has(feedback),
    ),
  )
}

function sanitizeCampaign(value) {
  const campaign = value && typeof value === 'object' && !Array.isArray(value) ? value : {}
  const activeContextId = validCampaignIds.has(campaign.activeContextId)
    ? campaign.activeContextId
    : campaignContextIds[0]
  const reactions = {}
  const revealedLayers = {}

  for (const contextId of campaignContextIds) {
    const reaction = campaign.reactions?.[contextId]
    if (campaignReactionOptionIds[contextId]?.includes(reaction)) reactions[contextId] = reaction

    const layers = Array.isArray(campaign.revealedLayers?.[contextId])
      ? [
          ...new Set(
            campaign.revealedLayers[contextId].filter((layer) => validCampaignLayers.has(layer)),
          ),
        ].sort(
          (left, right) => CAMPAIGN_LAYER_IDS.indexOf(left) - CAMPAIGN_LAYER_IDS.indexOf(right),
        )
      : []
    if (layers.length > 0) revealedLayers[contextId] = layers
  }

  const conversion =
    campaign.conversion && typeof campaign.conversion === 'object' ? campaign.conversion : {}
  const conversionContextId = validCampaignIds.has(conversion.contextId)
    ? conversion.contextId
    : null

  return {
    activeContextId,
    entryMode: validCampaignModes.has(campaign.entryMode)
      ? campaign.entryMode
      : CAMPAIGN_ENTRY_MODES.visitor,
    reactions,
    revealedLayers,
    conversion: {
      contextId: conversionContextId,
      status:
        conversionContextId && validConversionStates.has(conversion.status)
          ? conversion.status
          : 'idle',
    },
  }
}

export function sanitizePrototypePreferences(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null

  const user = value.user && typeof value.user === 'object' ? value.user : {}
  const selectedInterests = Array.isArray(user.selectedInterests)
    ? [...new Set(user.selectedInterests.filter((id) => validInterestIds.has(id)))]
    : []
  return {
    user: {
      onboardingCompleted: user.onboardingCompleted === true,
      selectedInterests,
      experiencePreset: presetValues.has(user.experiencePreset)
        ? user.experiencePreset
        : 'balanced',
    },
    postFeedback: sanitizeFeedbackMap(value.postFeedback, validPostIds),
    topicFeedback: sanitizeFeedbackMap(value.topicFeedback, validInterestIds),
    campaign: sanitizeCampaign(value.campaign),
  }
}

export function readPrototypePreferences(storage = globalThis.localStorage) {
  if (!storage) return null

  try {
    return sanitizePrototypePreferences(JSON.parse(storage.getItem(PROTOTYPE_STORAGE_KEY)))
  } catch {
    return null
  }
}

export function writePrototypePreferences(preferences, storage = globalThis.localStorage) {
  if (!storage) return

  try {
    storage.setItem(PROTOTYPE_STORAGE_KEY, JSON.stringify(preferences))
  } catch {
    // Persistence is a progressive enhancement; the in-memory prototype remains usable.
  }
}

export function clearPrototypePreferences(storage = globalThis.localStorage) {
  if (!storage) return

  try {
    storage.removeItem(PROTOTYPE_STORAGE_KEY)
    storage.removeItem('ne-sosyal-treasure-hunt')
  } catch {
    // Ignore unavailable or quota-limited storage in the browser prototype.
  }
}
