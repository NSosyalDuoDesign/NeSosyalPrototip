import { defineStore } from 'pinia'
import { currentDemoUser } from '@/data/mock-users.js'
import { interestTaxonomy, interestIds } from '@/data/mock-interests.js'
import { mockPosts } from '@/data/mock-posts.js'
import { discoveryCollections, risingTopics } from '@/data/mock-discovery.js'
import {
  clearPrototypePreferences,
  readPrototypePreferences,
  writePrototypePreferences,
} from '@/services/prototype-persistence.js'
import { rankPosts } from '@/services/recommendation.js'

export const FEEDBACK_STATES = Object.freeze({
  neutral: 'neutral',
  interested: 'interested',
  notInterested: 'notInterested',
})

export const EXPERIENCE_PRESETS = Object.freeze({
  fluid: 'fluid',
  balanced: 'balanced',
  comfortable: 'comfortable',
})

const initialState = () => ({
  user: {
    ...currentDemoUser,
    selectedInterests: [...currentDemoUser.selectedInterests],
  },
  interests: [...interestTaxonomy],
  posts: [...mockPosts],
  postFeedback: {},
  topicFeedback: {},
  discovery: {
    daily: [...discoveryCollections.daily],
    weekly: [...discoveryCollections.weekly],
    overlooked: [...discoveryCollections.overlooked],
    risingTopics: [...risingTopics],
  },
  treasureHunt: {
    currentStage: 0,
    completedStages: [],
    simulatedScans: [],
    rewardUnlocked: false,
    rewardClaimed: false,
  },
  composer: {
    draftText: '',
    attachment: null,
    interventionState: 'idle',
    interventionDismissed: false,
    interventionResult: null,
  },
  retention: {
    lastVisit: currentDemoUser.lastVisit,
    returningUser: true,
    lastSeenTopics: ['teknoloji', 'oyun'],
    recentFeedback: [],
    reentryDismissed: false,
  },
})

function resolveDiscoveryItems(items, posts) {
  const postsById = Object.fromEntries(posts.map((post) => [post.id, post]))
  return items
    .map((item) => ({ ...item, post: postsById[item.postId] }))
    .filter((item) => item.post)
    .sort((left, right) => left.rank - right.rank)
}

export const usePrototypeStore = defineStore('prototype', {
  state: initialState,

  getters: {
    selectedInterestItems(state) {
      return state.interests.filter((interest) =>
        state.user.selectedInterests.includes(interest.id),
      )
    },

    personalizedFeed(state) {
      return rankPosts(state.posts, state).map((post) => ({
        ...post,
        feedbackState: state.postFeedback[post.id] ?? FEEDBACK_STATES.neutral,
      }))
    },

    dailyPicks(state) {
      return resolveDiscoveryItems(state.discovery.daily, state.posts)
    },

    weeklyPicks(state) {
      return resolveDiscoveryItems(state.discovery.weekly, state.posts)
    },

    overlookedPicks(state) {
      return resolveDiscoveryItems(state.discovery.overlooked, state.posts)
    },
  },

  actions: {
    setSelectedInterests(ids) {
      this.user.selectedInterests = [...new Set(ids.filter((id) => interestIds.includes(id)))]
    },

    toggleInterest(id) {
      if (!interestIds.includes(id)) return

      const selected = new Set(this.user.selectedInterests)
      if (selected.has(id)) selected.delete(id)
      else selected.add(id)
      this.user.selectedInterests = [...selected]
    },

    completeOnboarding() {
      this.user.onboardingCompleted = true
    },

    replayOnboarding() {
      this.user.onboardingCompleted = false
    },

    seedOnboarding(complete = true) {
      this.setSelectedInterests(['teknoloji', 'bilim', 'oyun'])
      this.user.onboardingCompleted = Boolean(complete)
    },

    setExperiencePreset(preset) {
      if (Object.values(EXPERIENCE_PRESETS).includes(preset)) this.user.experiencePreset = preset
    },

    setPostFeedback(postId, feedback) {
      if (
        !this.posts.some((post) => post.id === postId) ||
        !Object.values(FEEDBACK_STATES).includes(feedback)
      )
        return
      if (feedback === FEEDBACK_STATES.neutral) delete this.postFeedback[postId]
      else this.postFeedback[postId] = feedback

      this.retention.recentFeedback = [
        { postId, feedback, recordedAt: '2026-08-22T12:00:00.000Z' },
        ...this.retention.recentFeedback.filter((item) => item.postId !== postId),
      ].slice(0, 4)
    },

    setTopicFeedback(topicId, feedback) {
      if (!interestIds.includes(topicId) || !Object.values(FEEDBACK_STATES).includes(feedback))
        return
      if (feedback === FEEDBACK_STATES.neutral) delete this.topicFeedback[topicId]
      else this.topicFeedback[topicId] = feedback
    },

    seedSpecificFeedback() {
      this.seedOnboarding(true)
      this.setPostFeedback('post-robotics-lab', FEEDBACK_STATES.interested)
      this.setPostFeedback('post-basketball-poll', FEEDBACK_STATES.notInterested)
    },

    advanceTreasureHunt(stageId, simulatedCode) {
      if (!stageId || this.treasureHunt.completedStages.includes(stageId)) return
      this.treasureHunt.completedStages.push(stageId)
      this.treasureHunt.completedStages.sort((left, right) => left - right)
      if (simulatedCode) this.treasureHunt.simulatedScans.push(simulatedCode)
      this.treasureHunt.currentStage = this.treasureHunt.completedStages.length
      this.treasureHunt.rewardUnlocked = this.treasureHunt.completedStages.length >= 3
    },

    claimTreasureReward() {
      if (this.treasureHunt.rewardUnlocked) this.treasureHunt.rewardClaimed = true
    },

    seedTreasureHunt(completed = false) {
      this.treasureHunt = completed
        ? {
            currentStage: 3,
            completedStages: [1, 2, 3],
            simulatedScans: ['NS-01', 'NS-02', 'NS-03'],
            rewardUnlocked: true,
            rewardClaimed: false,
          }
        : {
            currentStage: 0,
            completedStages: [],
            simulatedScans: [],
            rewardUnlocked: false,
            rewardClaimed: false,
          }
    },

    setComposerDraft(draftText) {
      this.composer.draftText = String(draftText ?? '')
      this.composer.interventionDismissed = false
      this.composer.interventionState = 'idle'
      this.composer.interventionResult = null
    },

    seedComposerText(draftText) {
      this.setComposerDraft(draftText)
    },

    setComposerAttachment(attachment) {
      this.composer.attachment = attachment ?? null
    },

    showComposerIntervention(result) {
      this.composer.interventionState = 'visible'
      this.composer.interventionDismissed = false
      this.composer.interventionResult = result
    },

    hideComposerIntervention() {
      this.composer.interventionState = 'idle'
    },

    publishComposerDraft() {
      const body = this.composer.draftText.trim()
      if (!body) return null

      const post = {
        id: 'post-demo-composer',
        authorId: this.user.id,
        author: { ...this.user },
        body,
        timestamp: '2026-08-22T12:30:00.000Z',
        topicIds: this.user.selectedInterests.slice(0, 2),
        engagement: { replies: 0, reposts: 0, likes: 0, bookmarks: 0 },
        media: null,
        poll: null,
        quotedPost: null,
        verifiedAuthor: false,
        discoveryMetadata: {
          daily: false,
          weekly: false,
          rising: false,
          reason: 'local-demo',
        },
        overlooked: false,
        feedbackState: FEEDBACK_STATES.neutral,
        trendScore: 0,
        isLocalDemo: true,
      }

      this.posts = [post, ...this.posts.filter((item) => item.id !== post.id)]
      this.clearComposer()
      return post
    },

    clearComposer() {
      this.composer = {
        draftText: '',
        attachment: null,
        interventionState: 'idle',
        interventionDismissed: false,
        interventionResult: null,
      }
    },

    setReturningUser(returningUser = true) {
      this.retention.returningUser = Boolean(returningUser)
      this.retention.reentryDismissed = false
    },

    seedReturningUser() {
      this.retention.returningUser = true
      this.retention.lastVisit = '2026-08-20T18:30:00.000Z'
      this.retention.lastSeenTopics = ['teknoloji', 'oyun']
      this.retention.reentryDismissed = false
      this.setPostFeedback('post-accessible-apps', FEEDBACK_STATES.interested)
    },

    setNormalVisit() {
      this.retention.returningUser = false
      this.retention.reentryDismissed = false
    },

    dismissReentry() {
      this.retention.reentryDismissed = true
    },

    hydratePrototypeState(storage) {
      const preferences = readPrototypePreferences(storage)
      if (!preferences) return false

      this.user.onboardingCompleted = preferences.user.onboardingCompleted
      this.user.selectedInterests = preferences.user.selectedInterests
      this.user.experiencePreset = preferences.user.experiencePreset
      this.postFeedback = preferences.postFeedback
      this.topicFeedback = preferences.topicFeedback
      this.treasureHunt = preferences.treasureHunt
      return true
    },

    persistPrototypeState(storage) {
      writePrototypePreferences(
        {
          user: {
            onboardingCompleted: this.user.onboardingCompleted,
            selectedInterests: this.user.selectedInterests,
            experiencePreset: this.user.experiencePreset,
          },
          postFeedback: this.postFeedback,
          topicFeedback: this.topicFeedback,
          treasureHunt: this.treasureHunt,
        },
        storage,
      )
    },

    resetPrototypeState(storage) {
      clearPrototypePreferences(storage)
      this.$reset()
    },
  },
})
