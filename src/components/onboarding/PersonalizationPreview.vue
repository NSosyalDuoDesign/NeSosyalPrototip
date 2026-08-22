<template>
  <section class="preview" aria-labelledby="preview-title">
    <div class="preview__intro">
      <span class="preview__eyebrow">İlk akışın</span>
      <h2 id="preview-title">Akışın böyle şekilleniyor</h2>
      <p>{{ summary }}</p>
    </div>

    <div class="preview__topics" aria-label="Seçilen ilgi alanları">
      <span v-for="interest in interests" :key="interest.id">{{ interest.label }}</span>
    </div>

    <div class="preview__feed">
      <article v-for="post in posts" :key="post.id" class="preview-post">
        <q-avatar size="40px" color="blue-1" text-color="primary">
          <img v-if="post.author.avatar" :src="post.author.avatar" alt="" />
          <span v-else>{{ initials(post.author.displayName) }}</span>
        </q-avatar>
        <div class="preview-post__content">
          <div class="preview-post__identity">
            <strong>{{ post.author.displayName }}</strong>
            <q-icon
              v-if="post.verifiedAuthor"
              name="verified"
              size="16px"
              color="primary"
              aria-label="Doğrulanmış hesap"
            />
            <span>{{ post.author.handle }}</span>
          </div>
          <p>{{ post.body }}</p>
          <span class="preview-post__reason">{{ reasonFor(post) }}</span>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  interests: {
    type: Array,
    required: true,
  },
  posts: {
    type: Array,
    required: true,
  },
  summary: {
    type: String,
    required: true,
  },
})

function initials(displayName) {
  return displayName
    .split(' ')
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
}

function reasonFor(post) {
  const match = props.interests.find((interest) => post.topicIds.includes(interest.id))
  return match ? `${match.label} seçimine göre` : 'Bugün yükselenlerden'
}
</script>

<style scoped>
.preview {
  display: grid;
  gap: 20px;
}

.preview__intro {
  display: grid;
  gap: 8px;
}

.preview__eyebrow {
  color: var(--ns-brand, #1687f8);
  font-size: 12px;
  font-weight: 700;
}

.preview h2,
.preview p {
  margin: 0;
}

.preview h2 {
  color: var(--ns-text, #15171a);
  font-size: clamp(20px, 4vw, 24px);
  line-height: 1.25;
}

.preview__intro p {
  color: var(--ns-text-secondary, #5f6670);
  font-size: 14px;
  line-height: 1.5;
}

.preview__topics {
  display: flex;
  gap: 8px;
  overflow-x: auto;
  scrollbar-width: none;
}

.preview__topics::-webkit-scrollbar {
  display: none;
}

.preview__topics span,
.preview-post__reason {
  width: max-content;
  color: var(--ns-brand, #1687f8);
  font-size: 12px;
  font-weight: 600;
  background: var(--ns-brand-soft, #eaf4ff);
  border-radius: var(--radius-xs, 6px);
}

.preview__topics span {
  padding: 6px 10px;
}

.preview__feed {
  border-top: 1px solid var(--ns-border, #e6e9ed);
}

.preview-post {
  display: grid;
  grid-template-columns: 40px minmax(0, 1fr);
  gap: 12px;
  padding: 16px 0;
  border-bottom: 1px solid var(--ns-border, #e6e9ed);
}

.preview-post__content {
  display: grid;
  gap: 8px;
  min-width: 0;
}

.preview-post__identity {
  display: flex;
  gap: 4px;
  align-items: center;
  min-width: 0;
  font-size: 13px;
}

.preview-post__identity strong {
  overflow: hidden;
  color: var(--ns-text, #15171a);
  text-overflow: ellipsis;
  white-space: nowrap;
}

.preview-post__identity span {
  overflow: hidden;
  color: var(--ns-text-secondary, #5f6670);
  text-overflow: ellipsis;
  white-space: nowrap;
}

.preview-post p {
  color: var(--ns-text, #15171a);
  font-size: 14px;
  line-height: 1.5;
}

.preview-post__reason {
  padding: 4px 8px;
}
</style>
