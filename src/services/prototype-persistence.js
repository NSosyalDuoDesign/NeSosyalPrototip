import { interestIds } from '../data/mock-interests.js'
import { postIds } from '../data/mock-posts.js'

export const PROTOTYPE_STORAGE_KEY = 'ne-sosyal.prototype-preferences.v1'

const feedbackValues = new Set(['neutral', 'interested', 'notInterested'])
const presetValues = new Set(['fluid', 'balanced', 'comfortable'])
const validInterestIds = new Set(interestIds)
const validPostIds = new Set(postIds)
const validTreasureStages = new Set([1, 2, 3])

function sanitizeFeedbackMap(value, validKeys) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {}

  return Object.fromEntries(
    Object.entries(value).filter(
      ([key, feedback]) => validKeys.has(key) && feedbackValues.has(feedback),
    ),
  )
}

export function sanitizePrototypePreferences(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null

  const user = value.user && typeof value.user === 'object' ? value.user : {}
  const selectedInterests = Array.isArray(user.selectedInterests)
    ? [...new Set(user.selectedInterests.filter((id) => validInterestIds.has(id)))]
    : []
  const treasure =
    value.treasureHunt && typeof value.treasureHunt === 'object' ? value.treasureHunt : {}
  const completedStages = Array.isArray(treasure.completedStages)
    ? [...new Set(treasure.completedStages.filter((stage) => validTreasureStages.has(stage)))].sort(
        (left, right) => left - right,
      )
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
    treasureHunt: {
      currentStage: completedStages.length,
      completedStages,
      simulatedScans: completedStages.map((stage) => `NS-${String(stage).padStart(2, '0')}`),
      rewardUnlocked: completedStages.length === validTreasureStages.size,
      rewardClaimed:
        completedStages.length === validTreasureStages.size && treasure.rewardClaimed === true,
    },
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
