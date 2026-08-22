<template>
  <section v-if="feedbackState === 'notInterested'" class="feed-post feed-post--removed">
    <q-icon name="visibility_off" size="22px" aria-hidden="true" />
    <div>
      <strong>Bu gönderiyi akışından çıkardık.</strong>
      <span>Benzer içerikleri daha az göstereceğiz.</span>
    </div>
    <q-btn flat no-caps color="primary" label="Geri al" @click="emit('feedback', 'neutral')" />
  </section>

  <article v-else class="feed-post">
    <header class="feed-post__header">
      <q-avatar size="42px" color="blue-1" text-color="primary">
        <img v-if="post.author.avatar" :src="post.author.avatar" alt="" />
        <span v-else>{{ initials }}</span>
      </q-avatar>
      <div class="feed-post__author">
        <div>
          <strong>{{ post.author.displayName }}</strong>
          <q-icon
            v-if="post.verifiedAuthor"
            name="verified"
            color="primary"
            size="16px"
            aria-label="Doğrulanmış hesap"
          />
        </div>
        <span>{{ post.author.handle }} · {{ timeLabel }}</span>
      </div>
      <q-btn
        flat
        round
        dense
        icon="more_horiz"
        :aria-label="`${post.author.displayName} gönderi seçenekleri`"
      />
    </header>

    <div class="feed-post__reason">
      <q-icon name="auto_awesome" aria-hidden="true" /> {{ reasonText }}
    </div>

    <p class="feed-post__body">{{ post.body }}</p>

    <img
      v-if="post.media"
      class="feed-post__media"
      :src="post.media.src"
      :alt="post.media.alt"
      :style="{ aspectRatio: post.media.aspectRatio }"
    />

    <div v-if="post.poll" class="feed-post__poll" aria-label="Anket önizlemesi">
      <button v-for="option in post.poll.options" :key="option.id" type="button">
        {{ option.label }}
      </button>
      <span>{{ post.poll.totalVotes.toLocaleString('tr-TR') }} oy</span>
    </div>

    <div class="feed-post__topics">
      <span v-for="topic in visibleTopics" :key="topic.id">{{ topic.label }}</span>
    </div>

    <div class="feed-post__feedback" aria-label="Öneri kontrolü">
      <span v-if="feedbackState === 'interested'" role="status">
        <q-icon name="check_circle" aria-hidden="true" /> Bunun gibi içerikleri daha fazla
        göstereceğiz.
      </span>
      <span v-else>Bu öneri sana uygun mu?</span>
      <div>
        <q-btn
          flat
          no-caps
          icon="thumb_up_off_alt"
          label="İlgileniyorum"
          :color="feedbackState === 'interested' ? 'primary' : undefined"
          @click="emit('feedback', feedbackState === 'interested' ? 'neutral' : 'interested')"
        />
        <q-btn
          flat
          no-caps
          icon="thumb_down_off_alt"
          label="İlgilenmiyorum"
          @click="emit('feedback', 'notInterested')"
        />
      </div>
    </div>

    <footer class="feed-post__actions" aria-label="Gönderi etkileşimleri">
      <button type="button" :aria-label="`${post.engagement.replies} yanıt`">
        <q-icon name="chat_bubble_outline" /> {{ post.engagement.replies }}
      </button>
      <button type="button" :aria-label="`${post.engagement.reposts} yeniden paylaşım`">
        <q-icon name="repeat" /> {{ post.engagement.reposts }}
      </button>
      <button type="button" :aria-label="`${post.engagement.likes} beğeni`">
        <q-icon name="favorite_border" /> {{ post.engagement.likes }}
      </button>
      <button type="button" aria-label="Gönderiyi kaydet">
        <q-icon name="bookmark_border" />
      </button>
    </footer>
  </article>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  post: { type: Object, required: true },
  topics: { type: Array, required: true },
  feedbackState: { type: String, default: 'neutral' },
})

const emit = defineEmits(['feedback'])

const initials = computed(() =>
  props.post.author.displayName
    .split(' ')
    .slice(0, 2)
    .map((part) => part[0])
    .join(''),
)
const visibleTopics = computed(() =>
  props.topics.filter((topic) => props.post.topicIds.includes(topic.id)).slice(0, 3),
)
const reasonText = computed(() => {
  const topic = visibleTopics.value[0]
  return topic ? `${topic.label} ilgi alanına göre` : 'Topluluklarda konuşuluyor'
})
const timeLabel = computed(() => {
  if (props.post.discoveryMetadata.daily) return 'Bugün'
  if (props.post.discoveryMetadata.weekly) return 'Bu hafta'
  return 'Yakın zamanda'
})
</script>

<style scoped>
.feed-post {
  padding: 20px;
  background: var(--ns-surface);
  border-bottom: 1px solid var(--ns-border);
}

.feed-post:last-child {
  border-bottom: 0;
}

.feed-post__header,
.feed-post__author > div,
.feed-post__feedback,
.feed-post__feedback > div,
.feed-post__actions,
.feed-post--removed {
  display: flex;
  align-items: center;
}

.feed-post__header {
  gap: 10px;
}

.feed-post__author {
  display: grid;
  flex: 1;
  min-width: 0;
}

.feed-post__author > div {
  gap: 4px;
  min-width: 0;
}

.feed-post__author strong,
.feed-post__author span {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.feed-post__author strong {
  font-size: 14px;
}

.feed-post__author > span {
  color: var(--ns-text-secondary);
  font-size: 12px;
}

.feed-post__header > .q-btn {
  width: 40px;
  height: 40px;
  color: var(--ns-text-tertiary);
}

.feed-post__reason {
  display: flex;
  gap: 5px;
  align-items: center;
  width: fit-content;
  margin: 12px 0 0 52px;
  color: var(--ns-brand);
  font-size: 11px;
  font-weight: 650;
}

.feed-post__body {
  margin: 12px 0 0 52px;
  font-size: 15px;
  line-height: 1.55;
  white-space: pre-line;
}

.feed-post__media {
  display: block;
  width: calc(100% - 52px);
  margin: 14px 0 0 52px;
  object-fit: cover;
  background: var(--ns-bg-subtle);
  border: 1px solid var(--ns-border);
  border-radius: var(--radius-md);
}

.feed-post__poll {
  display: grid;
  gap: 8px;
  margin: 14px 0 0 52px;
}

.feed-post__poll button {
  min-height: 42px;
  padding: 0 12px;
  color: var(--ns-brand);
  font: inherit;
  font-size: 13px;
  font-weight: 650;
  text-align: left;
  background: var(--ns-surface);
  border: 1px solid var(--ns-brand);
  border-radius: var(--radius-sm);
}

.feed-post__poll span {
  color: var(--ns-text-secondary);
  font-size: 11px;
}

.feed-post__topics {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin: 14px 0 0 52px;
}

.feed-post__topics span {
  padding: 4px 8px;
  color: var(--ns-text-secondary);
  font-size: 10px;
  font-weight: 650;
  background: var(--ns-bg-subtle);
  border-radius: 10px;
}

.feed-post__feedback {
  gap: 10px;
  justify-content: space-between;
  min-height: 48px;
  padding: 8px 0;
  margin: 14px 0 0 52px;
  border-top: 1px solid var(--ns-border);
  border-bottom: 1px solid var(--ns-border);
}

.feed-post__feedback > span {
  display: flex;
  gap: 5px;
  align-items: center;
  color: var(--ns-text-secondary);
  font-size: 11px;
  line-height: 1.4;
}

.feed-post__feedback > span .q-icon {
  color: var(--ns-success);
}

.feed-post__feedback > div {
  flex: 0 0 auto;
}

.feed-post__feedback .q-btn {
  min-height: 40px;
  padding: 0 8px;
  color: var(--ns-text-secondary);
  font-size: 11px;
}

.feed-post__actions {
  justify-content: space-between;
  margin: 8px 0 0 52px;
}

.feed-post__actions button {
  display: flex;
  gap: 6px;
  align-items: center;
  min-width: 44px;
  min-height: 40px;
  padding: 0 8px;
  color: var(--ns-text-secondary);
  font: inherit;
  font-size: 11px;
  background: transparent;
  border: 0;
  border-radius: var(--radius-sm);
}

.feed-post__actions button:hover {
  color: var(--ns-brand);
  background: var(--ns-brand-soft);
}

.feed-post--removed {
  gap: 12px;
  min-height: 96px;
  color: var(--ns-text-secondary);
}

.feed-post--removed > div {
  display: grid;
  flex: 1;
  gap: 3px;
}

.feed-post--removed strong {
  color: var(--ns-text);
  font-size: 13px;
}

.feed-post--removed span {
  font-size: 11px;
}

.feed-post--removed .q-btn {
  min-height: 40px;
}

@media (max-width: 599px) {
  .feed-post {
    padding: 16px;
  }

  .feed-post__reason,
  .feed-post__body,
  .feed-post__media,
  .feed-post__poll,
  .feed-post__topics,
  .feed-post__feedback,
  .feed-post__actions {
    width: 100%;
    margin-left: 0;
  }

  .feed-post__feedback {
    align-items: stretch;
    flex-direction: column;
  }

  .feed-post__feedback > div {
    justify-content: space-between;
  }

  .feed-post__feedback .q-btn {
    min-height: 44px;
  }
}

@media (max-width: 380px) {
  .feed-post__feedback .q-btn {
    padding: 0 4px;
    font-size: 10px;
  }
}
</style>
