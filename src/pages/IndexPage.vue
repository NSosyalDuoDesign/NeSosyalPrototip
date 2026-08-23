<template>
  <q-page class="home-page">
    <main class="home-shell">
      <nav class="home-tabs" role="tablist" aria-label="Ana akış görünümü">
        <button
          type="button"
          role="tab"
          :aria-selected="activeTab === 'feed'"
          :class="{ 'home-tabs__item--active': activeTab === 'feed' }"
          @click="activeTab = 'feed'"
        >
          Akış
        </button>
        <button
          type="button"
          role="tab"
          :aria-selected="activeTab === 'media'"
          :class="{ 'home-tabs__item--active': activeTab === 'media' }"
          @click="activeTab = 'media'"
        >
          Medya
        </button>
      </nav>

      <section class="composer-entry" aria-labelledby="composer-prompt">
        <div class="composer-entry__prompt">
          <UserAvatar :name="store.user.displayName" size="48px" />
          <RouterLink id="composer-prompt" to="/compose">Gönderi oluşturmak için...</RouterLink>
        </div>

        <div class="composer-entry__actions" aria-label="Gönderi araçları">
          <div>
            <q-btn
              v-for="tool in composerTools"
              :key="tool.label"
              flat
              round
              dense
              :icon="tool.icon"
              :aria-label="tool.label"
              :to="tool.to"
            />
          </div>
          <q-btn
            unelevated
            no-caps
            icon="draw"
            label="Gönder"
            to="/compose"
            class="composer-entry__submit"
          />
        </div>
      </section>

      <section class="home-feed" aria-label="Kişiselleştirilmiş akış">
        <q-banner
          v-if="feedbackNotice"
          class="feedback-notice"
          role="status"
          aria-live="polite"
        >
          <template #avatar><q-icon :name="feedbackNotice.icon" /></template>
          {{ feedbackNotice.message }}
          <template #action>
            <q-btn flat no-caps color="primary" label="Geri al" @click="undoFeedback" />
          </template>
        </q-banner>

        <div v-if="isLoading" class="feed-state feed-state--loading" aria-label="Akış yükleniyor">
          <article v-for="item in 3" :key="item" class="feed-skeleton">
            <div><q-skeleton type="QAvatar" /><q-skeleton type="text" width="38%" /></div>
            <q-skeleton type="text" />
            <q-skeleton type="text" width="82%" />
            <q-skeleton height="156px" />
          </article>
        </div>

        <div v-else-if="hasError" class="feed-state feed-state--message" role="alert">
          <q-icon name="wifi_off" size="30px" aria-hidden="true" />
          <h2>Akış şu anda yenilenemedi</h2>
          <p>Bağlantını kontrol edip tekrar deneyebilirsin.</p>
          <q-btn outline no-caps color="primary" label="Tekrar dene" @click="clearPreviewState" />
        </div>

        <div
          v-else-if="isEmpty || visibleFeed.length === 0"
          class="feed-state feed-state--message"
        >
          <q-icon :name="activeTab === 'media' ? 'perm_media' : 'dynamic_feed'" size="30px" />
          <h2>{{ emptyState.title }}</h2>
          <p>{{ emptyState.description }}</p>
          <q-btn
            v-if="activeTab === 'media'"
            flat
            no-caps
            color="primary"
            label="Akışa dön"
            @click="activeTab = 'feed'"
          />
          <q-btn
            v-else
            unelevated
            no-caps
            color="primary"
            label="İlgi alanı seç"
            to="/onboarding"
          />
        </div>

        <div v-else class="home-feed__list">
          <HomeFeedPost
            v-for="post in visibleFeed"
            :key="post.id"
            :post="post"
            :topics="store.interests"
            :selected-interest-ids="store.user.selectedInterests"
            :feedback-state="post.feedbackState"
            @feedback="(feedback) => applyFeedback(post, feedback)"
          />
        </div>
      </section>
    </main>
  </q-page>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import HomeFeedPost from '@/components/feed/HomeFeedPost.vue'
import UserAvatar from '@/components/ui/UserAvatar.vue'
import { usePrototypeStore } from '@/stores/prototype.js'

const route = useRoute()
const router = useRouter()
const store = usePrototypeStore()
const activeTab = ref(route.query.view === 'media' ? 'media' : 'feed')
const feedbackNotice = ref(null)

const visibleFeed = computed(() => {
  const feed = store.personalizedFeed
    .filter((post) => post.feedbackState !== 'notInterested')
    .slice(0, 6)

  return activeTab.value === 'media' ? feed.filter((post) => post.media) : feed
})
const previewState = computed(() => String(route.query.state ?? ''))
const isLoading = computed(() => previewState.value === 'loading')
const hasError = computed(() => previewState.value === 'error')
const isEmpty = computed(() => previewState.value === 'empty')
const emptyState = computed(() =>
  activeTab.value === 'media'
    ? {
        title: 'Medya gönderileri burada görünecek',
        description: 'Akış sekmesinden diğer paylaşımlara dönebilirsin.',
      }
    : {
        title: 'Akışını birlikte oluşturalım',
        description: 'En az üç ilgi alanı seçtiğinde sana yakın içerikler burada sıralanır.',
      },
)

function applyFeedback(post, feedback) {
  const previousFeedback = post.feedbackState
  store.setPostFeedback(post.id, feedback)

  if (feedback === 'neutral') {
    feedbackNotice.value = null
    return
  }

  feedbackNotice.value = {
    postId: post.id,
    previousFeedback,
    icon: feedback === 'interested' ? 'recommend' : 'visibility_off',
    message:
      feedback === 'interested'
        ? 'Akışın güncellendi. Buna benzer içerikler daha görünür olacak.'
        : 'Gönderi gizlendi. Buna benzer içerikleri daha az göstereceğiz.',
  }
}

function undoFeedback() {
  if (!feedbackNotice.value) return
  store.setPostFeedback(feedbackNotice.value.postId, feedbackNotice.value.previousFeedback)
  feedbackNotice.value = null
}

function clearPreviewState() {
  const query = { ...route.query }
  delete query.state
  router.replace({ query })
}

const composerTools = [
  { label: 'Görsel ekle', icon: 'image', to: '/compose' },
  { label: 'Anket oluştur', icon: 'poll', to: '/compose' },
  { label: 'Bilgi notu ekle', icon: 'info_outline', to: '/compose' },
  { label: 'Duygu ekle', icon: 'sentiment_satisfied_alt', to: '/compose' },
  { label: 'Etkinlik ekle', icon: 'event_available', to: '/compose' },
  { label: 'İlgi alanlarını düzenle', icon: 'tune', to: '/onboarding' },
]
</script>

<style scoped>
.home-page {
  min-height: 100%;
  color: var(--ns-text);
  background: var(--ns-bg);
}

.home-shell {
  width: 100%;
  padding: 28px 20px 72px 28px;
}

.home-tabs {
  position: relative;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  height: 62px;
  margin: 0 44px 0 104px;
}

.home-tabs::after {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  height: 1px;
  content: '';
  background: var(--ns-border);
}

.home-tabs__item--active::after {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1;
  height: 5px;
  content: '';
  background: linear-gradient(90deg, var(--ns-cyan), #3b47ff);
  border-radius: 5px 5px 0 0;
}

.home-tabs button {
  position: relative;
  min-height: 58px;
  padding: 0 20px;
  color: var(--ns-text-tertiary);
  font: inherit;
  font-size: 0.98rem;
  font-weight: 500;
  background: transparent;
  border: 0;
  cursor: pointer;
}

.home-tabs button:hover {
  color: var(--ns-text);
}

.home-tabs button.home-tabs__item--active {
  color: var(--ns-brand);
  font-weight: 700;
}

.composer-entry {
  min-height: 162px;
  padding: 24px 26px 0;
  background: var(--ns-surface);
  border-radius: 18px 18px 0 0;
  box-shadow: 0 8px 34px var(--ns-card-shadow);
}

.composer-entry__prompt {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  align-items: center;
  gap: 18px;
  min-height: 70px;
}

.composer-entry__prompt a {
  display: flex;
  min-height: 48px;
  align-items: center;
  color: var(--ns-text-tertiary);
  font-size: 0.96rem;
  text-decoration: none;
}

.composer-entry__actions {
  display: flex;
  min-height: 67px;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  margin-top: 2px;
  border-bottom: 1px solid var(--ns-border-strong);
}

.composer-entry__actions > div {
  display: flex;
  align-items: center;
  gap: 2px;
  margin-left: 60px;
}

.composer-entry__actions .q-btn {
  min-width: 40px;
  min-height: 40px;
  color: var(--ns-text-secondary);
}

.composer-entry__submit {
  width: 138px;
  min-height: 36px !important;
  color: var(--ns-text-secondary) !important;
  font-size: 0.78rem;
  background: var(--ns-button-muted) !important;
  border-radius: var(--radius-round);
}

.home-feed {
  background: var(--ns-surface);
  border-radius: 0 0 18px 18px;
  box-shadow: 0 15px 34px var(--ns-card-shadow);
}

.home-feed__list {
  overflow: hidden;
  border-radius: 0 0 18px 18px;
}

.feedback-notice {
  color: var(--ns-brand);
  background: var(--ns-surface);
  border-bottom: 1px solid var(--ns-border);
}

.feedback-notice .q-btn {
  min-height: 40px;
}

.feed-state--loading {
  display: grid;
  overflow: hidden;
  border-radius: 0 0 18px 18px;
}

.feed-skeleton {
  display: grid;
  gap: 10px;
  padding: 20px;
  background: var(--ns-surface);
  border-bottom: 1px solid var(--ns-border);
}

.feed-skeleton:last-child {
  border-bottom: 0;
}

.feed-skeleton > div {
  display: flex;
  gap: 10px;
  align-items: center;
}

.feed-state--message {
  display: grid;
  min-height: 300px;
  place-items: center;
  align-content: center;
  gap: 8px;
  padding: 36px 24px;
  color: var(--ns-text-secondary);
  text-align: center;
  background: var(--ns-surface);
  border-radius: 0 0 18px 18px;
}

.feed-state--message .q-icon {
  color: var(--ns-brand);
}

.feed-state--message h2,
.feed-state--message p {
  margin: 0;
}

.feed-state--message h2 {
  color: var(--ns-text);
  font-size: 1.06rem;
}

.feed-state--message p {
  max-width: 360px;
  font-size: 0.82rem;
  line-height: 1.5;
}

.feed-state--message .q-btn {
  min-height: 44px;
  margin-top: 4px;
}

@media (max-width: 1699px) {
  .home-shell {
    padding-inline: 22px;
  }

  .home-tabs {
    margin-inline: 34px;
  }
}

@media (max-width: 959px) {
  .home-shell {
    padding: 0 0 36px;
  }

  .home-tabs {
    height: 54px;
    margin: 0;
    background: var(--ns-bg);
  }

  .home-tabs button {
    min-height: 52px;
  }

  .composer-entry {
    min-height: 146px;
    padding: 16px 14px 0;
    border-radius: 0;
    box-shadow: none;
  }

  .composer-entry__prompt {
    gap: 12px;
    min-height: 62px;
  }

  .composer-entry__actions {
    min-height: 66px;
  }

  .composer-entry__actions > div {
    gap: 0;
    margin-left: 0;
  }

  .composer-entry__actions .q-btn {
    min-width: 36px;
    min-height: 40px;
  }

  .composer-entry__actions .q-btn:nth-child(n + 5) {
    display: none;
  }

  .composer-entry__submit {
    width: 96px;
  }

  .home-feed,
  .home-feed__list,
  .feed-state--loading,
  .feed-state--message {
    border-radius: 0;
    box-shadow: none;
  }
}

@media (max-width: 390px) {
  .composer-entry__actions .q-btn:nth-child(n + 4) {
    display: none;
  }
}
</style>
