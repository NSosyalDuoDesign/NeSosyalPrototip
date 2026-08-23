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
        <div class="home-feed__list">
          <HomeFeedPost
            v-for="post in visibleFeed"
            :key="post.id"
            :post="post"
            :topics="store.interests"
            :feedback-state="post.feedbackState"
            @feedback="(feedback) => store.setPostFeedback(post.id, feedback)"
          />
        </div>

        <div v-if="visibleFeed.length === 0" class="home-feed__empty">
          <q-icon name="perm_media" size="34px" />
          <strong>Medya gönderileri burada görünecek</strong>
          <span>Akış sekmesinden diğer paylaşımlara dönebilirsin.</span>
        </div>
      </section>
    </main>
  </q-page>
</template>

<script setup>
import { computed, ref } from 'vue'
import HomeFeedPost from '@/components/feed/HomeFeedPost.vue'
import UserAvatar from '@/components/ui/UserAvatar.vue'
import { usePrototypeStore } from '@/stores/prototype.js'

const store = usePrototypeStore()
const activeTab = ref('feed')
const displayedPostIds = ref(store.personalizedFeed.slice(0, 6).map((post) => post.id))

const visibleFeed = computed(() => {
  const postsById = Object.fromEntries(store.personalizedFeed.map((post) => [post.id, post]))
  const feed = displayedPostIds.value.map((postId) => postsById[postId]).filter(Boolean)
  return activeTab.value === 'media' ? feed.filter((post) => post.media) : feed
})

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
  min-height: 48px;
  display: flex;
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

.home-feed__empty {
  display: grid;
  min-height: 260px;
  place-items: center;
  align-content: center;
  gap: 8px;
  padding: 32px;
  color: var(--ns-text-secondary);
  text-align: center;
}

.home-feed__empty strong {
  color: var(--ns-text);
}

.home-feed__empty span {
  font-size: 0.82rem;
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
  .home-feed__list {
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
