<template>
  <article class="feed-post">
    <header class="feed-post__header">
      <UserAvatar :name="post.author.displayName" :tone="avatarTone" size="42px" />
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
        ref="optionsButton"
        flat
        round
        dense
        icon="more_horiz"
        :aria-label="`${post.author.displayName} gönderi seçenekleri`"
      >
        <q-menu anchor="bottom right" self="top right">
          <q-list class="feed-post__menu" aria-label="Öneri seçenekleri">
            <q-item v-close-popup clickable @click="explanationOpen = true">
              <q-item-section avatar><q-icon name="help_outline" /></q-item-section>
              <q-item-section>Bunu neden görüyorum?</q-item-section>
            </q-item>
            <q-item
              v-close-popup
              clickable
              @click="emit('feedback', feedbackState === 'interested' ? 'neutral' : 'interested')"
            >
              <q-item-section avatar><q-icon name="thumb_up_off_alt" /></q-item-section>
              <q-item-section>
                {{ feedbackState === 'interested' ? 'İlgi işaretini kaldır' : 'İlgileniyorum' }}
              </q-item-section>
            </q-item>
            <q-item v-close-popup clickable @click="emit('feedback', 'notInterested')">
              <q-item-section avatar><q-icon name="thumb_down_off_alt" /></q-item-section>
              <q-item-section>İlgilenmiyorum</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
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
      loading="lazy"
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

    <div v-if="feedbackState === 'interested'" class="feed-post__feedback" aria-live="polite">
      <span role="status">
        <q-icon name="check_circle" aria-hidden="true" /> Bunun gibi içerikleri daha fazla
        göstereceğiz.
      </span>
      <q-btn flat no-caps color="primary" label="Geri al" @click="emit('feedback', 'neutral')" />
    </div>

    <footer class="feed-post__actions" aria-label="Gönderi etkileşimleri">
      <button type="button" :aria-label="`${post.engagement.replies} yanıt`">
        <q-icon name="chat_bubble_outline" /> {{ post.engagement.replies }}
      </button>
      <button type="button" :aria-label="`${post.engagement.reposts} yeniden paylaşım`">
        <q-icon name="repeat" /> {{ post.engagement.reposts }}
      </button>
      <button
        type="button"
        :class="{ 'feed-action--active': liked }"
        :aria-label="liked ? 'Beğeniyi kaldır' : `${post.engagement.likes} beğeni; gönderiyi beğen`"
        :aria-pressed="liked"
        @click="liked = !liked"
      >
        <q-icon :name="liked ? 'favorite' : 'favorite_border'" />
        {{ post.engagement.likes + (liked ? 1 : 0) }}
      </button>
      <button
        type="button"
        :class="{ 'feed-action--active': saved }"
        :aria-label="saved ? 'Kayıtlardan çıkar' : 'Gönderiyi kaydet'"
        :aria-pressed="saved"
        @click="saved = !saved"
      >
        <q-icon :name="saved ? 'bookmark' : 'bookmark_border'" />
      </button>
    </footer>
    <span class="sr-only" aria-live="polite">{{ interactionAnnouncement }}</span>

    <q-dialog v-model="explanationOpen" @hide="restoreOptionsFocus">
      <q-card class="recommendation-dialog">
        <q-card-section class="recommendation-dialog__heading">
          <div>
            <span>Akış şeffaflığı</span>
            <h2>Bunu neden görüyorsun?</h2>
          </div>
          <q-btn v-close-popup flat round icon="close" aria-label="Açıklamayı kapat" />
        </q-card-section>
        <q-card-section>
          <p>{{ reasonText }} bu gönderiyi akışında yukarı taşıdı.</p>
          <p>
            Seçimlerin ve verdiğin geri bildirimler yalnızca bu cihazdaki prototip sıralamasını
            değiştirir.
          </p>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn
            v-close-popup
            flat
            no-caps
            color="primary"
            label="İlgilenmiyorum"
            @click="emit('feedback', 'notInterested')"
          />
          <q-btn
            v-close-popup
            unelevated
            no-caps
            color="primary"
            label="İlgileniyorum"
            @click="emit('feedback', 'interested')"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </article>
</template>

<script setup>
import { computed, nextTick, ref } from 'vue'
import UserAvatar from '@/components/ui/UserAvatar.vue'

const props = defineProps({
  post: { type: Object, required: true },
  topics: { type: Array, required: true },
  selectedInterestIds: { type: Array, default: () => [] },
  feedbackState: { type: String, default: 'neutral' },
})

const emit = defineEmits(['feedback'])
const explanationOpen = ref(false)
const optionsButton = ref(null)
const liked = ref(false)
const saved = ref(false)

const avatarTone = computed(() => {
  const tones = ['blue', 'cyan', 'violet']
  const code = [...props.post.author.id].reduce(
    (sum, character) => sum + character.charCodeAt(0),
    0,
  )
  return tones[code % tones.length]
})
const interactionAnnouncement = computed(() => {
  if (liked.value && saved.value) return 'Gönderi beğenildi ve kaydedildi.'
  if (liked.value) return 'Gönderi beğenildi.'
  if (saved.value) return 'Gönderi kaydedildi.'
  return ''
})
const visibleTopics = computed(() =>
  props.topics.filter((topic) => props.post.topicIds.includes(topic.id)).slice(0, 3),
)
const reasonText = computed(() => {
  if (props.post.isLocalDemo) return 'Yeni paylaştığın gönderi'
  if (props.feedbackState === 'interested') return 'Verdiğin olumlu geri bildirime göre'

  const matchedTopic = visibleTopics.value.find((topic) =>
    props.selectedInterestIds.includes(topic.id),
  )
  if (matchedTopic) return `${matchedTopic.label} ilgi alanına göre`
  if (props.post.discoveryMetadata.daily) return 'Bugünün seçkisinde yükseliyor'
  if (props.post.discoveryMetadata.weekly) return 'Bu haftanın seçkisinde öne çıkıyor'
  return 'Topluluklarda konuşuluyor'
})
const timeLabel = computed(() => {
  if (props.post.discoveryMetadata.daily) return 'Bugün'
  if (props.post.discoveryMetadata.weekly) return 'Bu hafta'
  return 'Yakın zamanda'
})

function restoreOptionsFocus() {
  nextTick(() => optionsButton.value?.$el?.focus())
}
</script>

<style scoped>
.feed-post {
  padding: var(--experience-post-padding, 20px);
  background: var(--ns-surface);
  border-bottom: 1px solid var(--ns-border);
  transition: padding var(--experience-motion-duration, var(--motion-base)) var(--ease-standard);
}

.feed-post:last-child {
  border-bottom: 0;
}

.feed-post__header,
.feed-post__author > div,
.feed-post__feedback,
.feed-post__actions,
.recommendation-dialog__heading {
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
  font-size: var(--experience-body-size, 15px);
  line-height: var(--experience-line-height, 1.55);
  white-space: pre-line;
  transition:
    font-size var(--experience-motion-duration, var(--motion-base)) var(--ease-standard),
    line-height var(--experience-motion-duration, var(--motion-base)) var(--ease-standard);
}

.feed-post__media {
  display: block;
  width: calc(100% - 52px);
  margin: 14px 0 0 52px;
  object-fit: cover;
  max-height: var(--experience-media-max-height, 400px);
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
  display: var(--experience-secondary-display, flex);
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

.feed-post__actions button:active {
  transform: scale(0.94);
}

.feed-post__actions .feed-action--active {
  color: var(--ns-brand);
  background: var(--ns-brand-soft);
}

.feed-post__menu {
  min-width: 250px;
}

.feed-post__menu .q-item {
  min-height: 48px;
}

.feed-post__menu .q-item__section--avatar {
  min-width: 36px;
  color: var(--ns-text-secondary);
}

.recommendation-dialog {
  width: min(92vw, 460px);
  color: var(--ns-text);
  background: var(--ns-surface);
  border-radius: var(--radius-lg);
}

.recommendation-dialog__heading {
  gap: 16px;
  justify-content: space-between;
}

.recommendation-dialog__heading > div {
  display: grid;
  gap: 3px;
}

.recommendation-dialog__heading span {
  color: var(--ns-brand);
  font-size: 11px;
  font-weight: 700;
}

.recommendation-dialog h2,
.recommendation-dialog p {
  margin: 0;
}

.recommendation-dialog h2 {
  font-size: 20px;
}

.recommendation-dialog p {
  color: var(--ns-text-secondary);
  font-size: 13px;
  line-height: 1.55;
}

.recommendation-dialog p + p {
  margin-top: 10px;
}

.recommendation-dialog .q-card__actions .q-btn {
  min-height: 44px;
}

@media (max-width: 599px) {
  .feed-post {
    padding: var(--experience-post-padding, 16px);
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

  .feed-post__feedback .q-btn {
    min-height: 44px;
  }

  .feed-post__header > .q-btn {
    width: 44px;
    height: 44px;
  }

  .feed-post__actions button,
  .feed-post__poll button {
    min-height: 44px;
  }
}
</style>
