<template>
  <q-page class="home-preview">
    <PageSectionHeader title="Ana Sayfa" description="Senin için seçilen gündem" />

    <section class="composer-entry" aria-labelledby="composer-title">
      <UserAvatar name="Ahmet Zor" size="44px" />
      <button id="composer-title" class="composer-entry__button" type="button">
        Ne düşünüyorsun?
      </button>
      <q-btn flat round icon="image" aria-label="Gönderiye görsel ekle" class="icon-action" />
    </section>

    <section aria-labelledby="timeline-title">
      <div class="timeline-context">
        <div>
          <p class="timeline-context__eyebrow">Kişisel akış</p>
          <h2 id="timeline-title">Bugün ilgini çekebilecekler</h2>
        </div>
        <q-btn flat no-caps label="Tercihler" icon-right="tune" class="quiet-action" />
      </div>

      <article v-for="post in previewPosts" :key="post.id" class="feed-preview">
        <UserAvatar :name="post.author" :tone="post.tone" size="44px" />

        <div class="feed-preview__content">
          <header class="feed-preview__header">
            <div class="feed-preview__identity">
              <strong>{{ post.author }}</strong>
              <q-icon
                v-if="post.verified"
                name="verified"
                class="verified-icon"
                aria-label="Doğrulanmış hesap"
              />
              <span>{{ post.handle }} · {{ post.time }}</span>
            </div>
            <q-btn
              flat
              round
              dense
              icon="more_horiz"
              :aria-label="`${post.author} gönderisi için seçenekler`"
            />
          </header>

          <p class="feed-preview__text">{{ post.text }}</p>

          <div v-if="post.media" class="feed-preview__media" role="img" :aria-label="post.media">
            <q-icon name="photo_camera" size="28px" />
            <span>{{ post.media }}</span>
          </div>

          <footer class="feed-preview__actions" aria-label="Gönderi etkileşimleri">
            <button type="button" aria-label="Yanıtla">
              <q-icon name="chat_bubble_outline" /> {{ post.replies }}
            </button>
            <button type="button" aria-label="Yeniden paylaş">
              <q-icon name="repeat" /> {{ post.reposts }}
            </button>
            <button type="button" aria-label="Beğen">
              <q-icon name="favorite_border" /> {{ post.likes }}
            </button>
            <button type="button" aria-label="Kaydet"><q-icon name="bookmark_border" /></button>
          </footer>
        </div>
      </article>
    </section>
  </q-page>
</template>

<script setup>
import PageSectionHeader from '@/components/shell/PageSectionHeader.vue'
import UserAvatar from '@/components/ui/UserAvatar.vue'

const previewPosts = [
  {
    id: 'preview-1',
    author: 'NSosyal Gündem',
    handle: '@nsosyalgundem',
    time: '18 dk.',
    text: 'Türkiye’nin farklı şehirlerinden genç ekipler bugün teknoloji ve topluluk odağında bir araya geliyor.',
    replies: 18,
    reposts: 42,
    likes: 258,
    verified: true,
    tone: 'blue',
  },
  {
    id: 'preview-2',
    author: 'Bilim Notları',
    handle: '@bilimnotlari',
    time: '1 sa.',
    text: 'Merak ettiğimiz sorular bazen cevabından daha değerlidir. Bu hafta gökyüzünü izlemek için küçük bir rehber hazırlıyoruz.',
    media: 'Gece gökyüzü gözlem rehberi',
    replies: 9,
    reposts: 31,
    likes: 184,
    verified: false,
    tone: 'violet',
  },
  {
    id: 'preview-3',
    author: 'Yerel Sesler',
    handle: '@yerelsesler',
    time: '2 sa.',
    text: 'Mahallendeki küçük kültür etkinliklerini tek başlıkta topluyoruz. Gözden kaçırdığın bir buluşma olabilir.',
    replies: 12,
    reposts: 17,
    likes: 96,
    verified: false,
    tone: 'cyan',
  },
]
</script>

<style scoped>
.home-preview {
  min-height: 100%;
  background: var(--ns-surface);
}

.composer-entry {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-4) var(--page-gutter);
  border-bottom: 1px solid var(--ns-border);
}

.composer-entry__button {
  min-height: 44px;
  padding: 0 var(--space-4);
  color: var(--ns-text-secondary);
  text-align: left;
  background: var(--ns-bg-subtle);
  border: 1px solid transparent;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition:
    background var(--motion-fast) var(--ease-standard),
    border-color var(--motion-fast) var(--ease-standard);
}

.composer-entry__button:hover {
  background: var(--ns-surface-hover);
  border-color: var(--ns-border);
}

.timeline-context {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
  padding: var(--space-4) var(--page-gutter) var(--space-3);
  border-bottom: 1px solid var(--ns-border);
}

.timeline-context__eyebrow {
  margin: 0 0 var(--space-1);
  color: var(--ns-brand);
  font-size: 0.75rem;
  font-weight: 700;
}

.timeline-context h2 {
  margin: 0;
  font-size: 1rem;
  line-height: 1.3;
}

.feed-preview {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  gap: var(--space-3);
  padding: var(--space-4) var(--page-gutter);
  border-bottom: 1px solid var(--ns-border);
  transition: background var(--motion-fast) var(--ease-standard);
}

.feed-preview:hover {
  background: var(--ns-surface-hover);
}

.feed-preview__content,
.feed-preview__identity {
  min-width: 0;
}

.feed-preview__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--space-2);
  min-height: 32px;
}

.feed-preview__identity {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-1);
  font-size: 0.875rem;
}

.feed-preview__identity strong {
  color: var(--ns-text);
}

.feed-preview__identity span {
  overflow: hidden;
  color: var(--ns-text-secondary);
  text-overflow: ellipsis;
  white-space: nowrap;
}

.verified-icon {
  color: var(--ns-brand);
  font-size: 1rem;
}

.feed-preview__text {
  margin: var(--space-1) 0 var(--space-3);
  color: var(--ns-text);
  font-size: 0.9375rem;
  line-height: 1.55;
  white-space: pre-line;
}

.feed-preview__media {
  display: grid;
  min-height: 180px;
  place-content: center;
  gap: var(--space-2);
  padding: var(--space-5);
  color: var(--ns-text-secondary);
  text-align: center;
  background: var(--ns-bg-subtle);
  border: 1px solid var(--ns-border);
  border-radius: var(--radius-lg);
}

.feed-preview__actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 420px;
  margin-top: var(--space-2);
}

.feed-preview__actions button {
  display: inline-flex;
  min-width: 44px;
  min-height: 44px;
  align-items: center;
  justify-content: center;
  gap: var(--space-1);
  padding: 0 var(--space-2);
  color: var(--ns-text-secondary);
  font: inherit;
  background: transparent;
  border: 0;
  border-radius: var(--radius-sm);
  cursor: pointer;
}

.feed-preview__actions button:hover {
  color: var(--ns-brand);
  background: var(--ns-brand-soft);
}

@media (max-width: 599px) {
  .feed-preview {
    gap: var(--space-2);
  }

  .feed-preview__identity span {
    flex-basis: 100%;
  }

  .feed-preview__media {
    min-height: 148px;
  }
}
</style>
