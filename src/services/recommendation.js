import { discoveryCollections } from '../data/mock-discovery.js'

const dailyPostIds = new Set(discoveryCollections.daily.map((item) => item.postId))
const weeklyPostIds = new Set(discoveryCollections.weekly.map((item) => item.postId))

export function scorePost(post, state) {
  const selectedMatches = post.topicIds.filter((id) =>
    state.user.selectedInterests.includes(id),
  ).length
  const postFeedback = state.postFeedback[post.id] ?? 'neutral'
  const topicFeedbackScore = post.topicIds.reduce((total, topicId) => {
    const feedback = state.topicFeedback[topicId]
    if (feedback === 'interested') return total + 2
    if (feedback === 'notInterested') return total - 3
    return total
  }, 0)

  return (
    selectedMatches * 3 +
    (postFeedback === 'interested' ? 4 : 0) +
    (postFeedback === 'notInterested' ? -6 : 0) +
    topicFeedbackScore +
    (dailyPostIds.has(post.id) ? 2 : 0) +
    (weeklyPostIds.has(post.id) ? 1 : 0)
  )
}

export function rankPosts(posts, state) {
  return posts
    .map((post, sourceIndex) => ({
      post,
      recommendationScore: scorePost(post, state),
      sourceIndex,
    }))
    .sort(
      (left, right) =>
        right.recommendationScore - left.recommendationScore ||
        left.sourceIndex - right.sourceIndex ||
        left.post.id.localeCompare(right.post.id),
    )
    .map(({ post, recommendationScore }) => ({ ...post, recommendationScore }))
}
