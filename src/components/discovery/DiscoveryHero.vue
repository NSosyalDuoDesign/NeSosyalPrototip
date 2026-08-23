<template>
  <article class="discovery-hero">
    <div class="discovery-hero__content">
      <DiscoveryReason :text="item.personalizedReason" :icon="reasonIcon" />
      <div class="discovery-hero__identity">
        <UserAvatar :name="post.author.displayName" tone="violet" size="44px" />
        <div class="discovery-hero__person">
          <span class="discovery-hero__name">
            {{ post.author.displayName }}
            <q-icon
              v-if="post.verifiedAuthor"
              name="verified"
              color="primary"
              size="17px"
              aria-label="Doğrulanmış hesap"
            />
          </span>
          <span>{{ post.author.handle }} · {{ formattedDate }}</span>
        </div>
      </div>

      <p>{{ post.body }}</p>

      <div class="discovery-hero__topics" aria-label="Gönderi konuları">
        <span v-for="topic in topicLabels" :key="topic">{{ topic }}</span>
      </div>

      <div class="discovery-hero__engagement" aria-label="Gönderi etkileşimleri">
        <span
          ><q-icon name="chat_bubble_outline" /> {{ formatCount(post.engagement.replies) }}</span
        >
        <span><q-icon name="repeat" /> {{ formatCount(post.engagement.reposts) }}</span>
        <span><q-icon name="favorite_border" /> {{ formatCount(post.engagement.likes) }}</span>
      </div>
    </div>

    <img
      v-if="post.media?.type === 'image'"
      class="discovery-hero__media"
      :src="post.media.src"
      :alt="post.media.alt"
      loading="lazy"
    />
  </article>
</template>

<script setup>
import { computed } from 'vue'
import UserAvatar from '@/components/ui/UserAvatar.vue'
import DiscoveryReason from './DiscoveryReason.vue'

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  interests: {
    type: Array,
    required: true,
  },
  mode: {
    type: String,
    required: true,
  },
})

const post = computed(() => props.item.post)
const topicLabels = computed(() =>
  props.interests
    .filter((interest) => post.value.topicIds.includes(interest.id))
    .map((interest) => interest.label),
)
const formattedDate = computed(() =>
  new Intl.DateTimeFormat('tr-TR', { day: 'numeric', month: 'short' }).format(
    new Date(post.value.timestamp),
  ),
)
const reasonIcon = computed(() => {
  if (props.mode === 'overlooked') return 'visibility_off'
  if (props.mode === 'weekly') return 'date_range'
  return 'trending_up'
})

function formatCount(value) {
  return new Intl.NumberFormat('tr-TR').format(value)
}
</script>

<style scoped>
.discovery-hero {
  overflow: hidden;
  background: var(--ns-surface, #fff);
  border: 1px solid var(--ns-border, #e6e9ed);
  border-radius: var(--radius-lg, 16px);
}

.discovery-hero__content {
  display: grid;
  gap: 16px;
  padding: 20px;
}

.discovery-hero__identity {
  display: flex;
  gap: 12px;
  align-items: center;
}

.discovery-hero__person {
  display: grid;
  min-width: 0;
  color: var(--ns-text-secondary, #5f6670);
  font-size: 12px;
  line-height: 1.4;
}

.discovery-hero__name {
  display: flex;
  gap: 4px;
  align-items: center;
  overflow: hidden;
  color: var(--ns-text, #15171a);
  font-size: 14px;
  font-weight: 700;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.discovery-hero p {
  margin: 0;
  color: var(--ns-text, #15171a);
  font-size: 16px;
  line-height: 1.55;
  white-space: pre-wrap;
}

.discovery-hero__topics,
.discovery-hero__engagement {
  display: flex;
  gap: 8px;
  align-items: center;
  overflow-x: auto;
  scrollbar-width: none;
}

.discovery-hero__topics::-webkit-scrollbar,
.discovery-hero__engagement::-webkit-scrollbar {
  display: none;
}

.discovery-hero__topics span {
  flex: 0 0 auto;
  padding: 5px 8px;
  color: var(--ns-text-secondary, #5f6670);
  font-size: 11px;
  font-weight: 600;
  background: var(--ns-bg-subtle, #f7f8fa);
  border-radius: var(--radius-xs, 6px);
}

.discovery-hero__engagement {
  gap: 24px;
  color: var(--ns-text-secondary, #5f6670);
  font-size: 12px;
}

.discovery-hero__engagement span {
  display: flex;
  gap: 6px;
  align-items: center;
  min-width: 48px;
}

.discovery-hero__media {
  display: block;
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  border-top: 1px solid var(--ns-border, #e6e9ed);
}

@media (min-width: 680px) {
  .discovery-hero__content {
    padding: 24px;
  }
}
</style>
