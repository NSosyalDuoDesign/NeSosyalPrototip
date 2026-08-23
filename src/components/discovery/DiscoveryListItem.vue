<template>
  <article class="discovery-item">
    <div class="discovery-item__rank" aria-hidden="true">
      {{ String(item.rank).padStart(2, '0') }}
    </div>
    <div class="discovery-item__body">
      <DiscoveryReason :text="item.personalizedReason" :icon="reasonIcon" />
      <div class="discovery-item__identity">
        <UserAvatar :name="post.author.displayName" size="36px" />
        <div>
          <strong>{{ post.author.displayName }}</strong>
          <q-icon
            v-if="post.verifiedAuthor"
            name="verified"
            color="primary"
            size="15px"
            aria-label="Doğrulanmış hesap"
          />
          <span>{{ post.author.handle }}</span>
        </div>
      </div>
      <p>{{ post.body }}</p>
      <div class="discovery-item__meta">
        <span>{{ primaryTopic }}</span>
        <span>{{ formatCount(post.engagement.likes) }} beğeni</span>
      </div>
    </div>
    <img
      v-if="post.media?.type === 'image'"
      class="discovery-item__media"
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
const primaryTopic = computed(
  () =>
    props.interests.find((interest) => post.value.topicIds.includes(interest.id))?.label ??
    'Gündem',
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
.discovery-item {
  display: grid;
  grid-template-columns: 28px minmax(0, 1fr);
  gap: 12px;
  padding: 20px 0;
  border-bottom: 1px solid var(--ns-border, #e6e9ed);
}

.discovery-item__rank {
  padding-top: 2px;
  color: var(--ns-text-tertiary, #8b929b);
  font-size: 12px;
  font-variant-numeric: tabular-nums;
  font-weight: 700;
}

.discovery-item__body {
  display: grid;
  gap: 10px;
  min-width: 0;
}

.discovery-item__identity {
  display: flex;
  gap: 10px;
  align-items: center;
  min-width: 0;
}

.discovery-item__identity > div {
  display: flex;
  gap: 4px;
  align-items: center;
  min-width: 0;
  font-size: 12px;
}

.discovery-item__identity strong,
.discovery-item__identity span {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.discovery-item__identity strong {
  color: var(--ns-text, #15171a);
}

.discovery-item__identity span {
  color: var(--ns-text-secondary, #5f6670);
}

.discovery-item p {
  margin: 0;
  color: var(--ns-text, #15171a);
  font-size: 14px;
  line-height: 1.5;
  white-space: pre-wrap;
}

.discovery-item__meta {
  display: flex;
  gap: 16px;
  color: var(--ns-text-tertiary, #8b929b);
  font-size: 12px;
}

.discovery-item__media {
  grid-column: 2;
  width: min(100%, 280px);
  aspect-ratio: 16 / 9;
  object-fit: cover;
  border-radius: var(--radius-md, 12px);
}

@media (min-width: 600px) {
  .discovery-item:has(.discovery-item__media) {
    grid-template-columns: 28px minmax(0, 1fr) 180px;
  }

  .discovery-item__media {
    grid-column: 3;
    align-self: center;
    width: 180px;
  }
}
</style>
