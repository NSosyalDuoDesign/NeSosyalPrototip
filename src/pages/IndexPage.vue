<template>
  <q-page class="home-page">
    <main class="home-shell">
      <div class="home-main">
        <section class="home-welcome" aria-labelledby="home-title">
          <div>
            <span class="home-eyebrow">Merak → Kontrol → Keşif</span>
            <h1 id="home-title">Merhaba, {{ firstName }}.</h1>
            <p v-if="store.user.selectedInterests.length">
              Akışın {{ selectedLabels }} seçimlerine göre şekilleniyor.
            </p>
            <p v-else>İlgi alanlarını seç; burada gerçekten sana yakın konuşmalar görmeye başla.</p>
          </div>
          <q-btn
            outline
            no-caps
            color="primary"
            icon="tune"
            :label="store.user.selectedInterests.length ? 'İlgilerimi düzenle' : 'Akışımı oluştur'"
            to="/onboarding"
          />
        </section>

        <router-link to="/compose" class="composer-entry">
          <UserAvatar :name="store.user.displayName" size="42px" />
          <span>Ne düşünüyorsun?</span>
          <q-icon name="edit" aria-hidden="true" />
        </router-link>

        <section class="discovery-strip" aria-labelledby="discovery-strip-title">
          <div class="section-heading">
            <div>
              <span>Keşif rotaları</span>
              <h2 id="discovery-strip-title">Bugünün ötesine bak</h2>
            </div>
            <router-link to="/discover"> Tümünü gör <q-icon name="arrow_forward" /> </router-link>
          </div>
          <div class="discovery-strip__links">
            <router-link
              v-for="item in discoveryLinks"
              :key="item.title"
              :to="item.to"
              :class="`discovery-link discovery-link--${item.tone}`"
            >
              <q-icon :name="item.icon" aria-hidden="true" />
              <div>
                <strong>{{ item.title }}</strong>
                <span>{{ item.description }}</span>
              </div>
              <q-icon name="chevron_right" aria-hidden="true" />
            </router-link>
          </div>
        </section>

        <section class="home-feed" aria-labelledby="feed-title">
          <div class="section-heading section-heading--feed">
            <div>
              <span>Senin için</span>
              <h2 id="feed-title">Akışın</h2>
            </div>
            <span class="feed-control-note"><q-icon name="tune" /> Kontrol sende</span>
          </div>
          <q-banner
            v-if="feedbackNotice"
            class="feedback-notice"
            rounded
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
            <h3>Akış şu anda yenilenemedi</h3>
            <p>Bağlantını kontrol edip tekrar deneyebilirsin.</p>
            <q-btn outline no-caps color="primary" label="Tekrar dene" @click="clearPreviewState" />
          </div>

          <div
            v-else-if="isEmpty || visibleFeed.length === 0"
            class="feed-state feed-state--message"
          >
            <q-icon name="dynamic_feed" size="30px" aria-hidden="true" />
            <h3>Akışını birlikte oluşturalım</h3>
            <p>En az üç ilgi alanı seçtiğinde sana yakın içerikler burada sıralanır.</p>
            <q-btn unelevated no-caps color="primary" label="İlgi alanı seç" to="/onboarding" />
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
      </div>
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
const feedbackNotice = ref(null)

const firstName = computed(() => store.user.displayName.split(' ')[0])
const selectedLabels = computed(() => {
  const labels = store.selectedInterestItems.slice(0, 3).map((interest) => interest.label)
  if (labels.length === 0) return 'henüz belirlenmemiş ilgi alanı'
  if (labels.length === 1) return labels[0]
  const last = labels.pop()
  return `${labels.join(', ')} ve ${last}`
})
const visibleFeed = computed(() => {
  return store.personalizedFeed.filter((post) => post.feedbackState !== 'notInterested').slice(0, 6)
})
const previewState = computed(() => String(route.query.state ?? ''))
const isLoading = computed(() => previewState.value === 'loading')
const hasError = computed(() => previewState.value === 'error')
const isEmpty = computed(() => previewState.value === 'empty')

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

const discoveryLinks = [
  {
    title: 'Bugün',
    description: 'Şimdi yükselen konuşmalar',
    icon: 'bolt',
    tone: 'daily',
    to: '/discover?tab=daily',
  },
  {
    title: 'Bu Hafta',
    description: 'Gelişen başlıkların özeti',
    icon: 'date_range',
    tone: 'weekly',
    to: '/discover?tab=weekly',
  },
  {
    title: 'Gözden Kaçanlar',
    description: 'Az görülmüş iyi içerikler',
    icon: 'visibility_off',
    tone: 'quiet',
    to: '/discover?tab=overlooked',
  },
]
</script>

<style scoped>
.home-page {
  color: var(--ns-text);
  background: var(--ns-bg-subtle);
}

.home-shell {
  width: 100%;
  padding: 28px 20px 72px;
  margin: 0 auto;
}

.home-main {
  display: grid;
  gap: 20px;
  min-width: 0;
}

.home-welcome,
.composer-entry,
.section-heading {
  display: flex;
  align-items: center;
}

.home-welcome {
  gap: 20px;
  justify-content: space-between;
  padding: 22px;
  background: linear-gradient(115deg, #fff 0%, #f4f9ff 100%);
  border: 1px solid var(--ns-border);
  border-radius: var(--radius-lg);
}

.home-welcome > div {
  display: grid;
  gap: 5px;
}

.home-eyebrow,
.section-heading > div > span {
  color: var(--ns-brand);
  font-size: 11px;
  font-weight: 750;
}

.home-welcome h1,
.home-welcome p,
.section-heading h2 {
  margin: 0;
}

.home-welcome h1 {
  font-size: clamp(24px, 5vw, 31px);
  line-height: 1.2;
}

.home-welcome p {
  color: var(--ns-text-secondary);
  font-size: 13px;
  line-height: 1.5;
}

.home-welcome .q-btn {
  flex: 0 0 auto;
  min-height: 44px;
  border-radius: var(--radius-sm);
}

.composer-entry {
  gap: 12px;
  min-height: 72px;
  padding: 14px 18px;
  color: var(--ns-text-secondary);
  text-decoration: none;
  background: var(--ns-surface);
  border: 1px solid var(--ns-border);
  border-radius: var(--radius-lg);
}

.composer-entry > span {
  flex: 1;
  font-size: 14px;
}

.composer-entry > .q-icon {
  color: var(--ns-brand);
  font-size: 22px;
}

.composer-entry:hover {
  border-color: var(--ns-brand);
}

.discovery-strip,
.home-feed {
  display: grid;
  gap: 12px;
}

.section-heading {
  justify-content: space-between;
  min-height: 44px;
}

.section-heading > div {
  display: grid;
  gap: 2px;
}

.section-heading h2 {
  font-size: 19px;
}

.section-heading > a {
  display: flex;
  gap: 4px;
  align-items: center;
  color: var(--ns-brand);
  font-size: 12px;
  font-weight: 650;
  text-decoration: none;
  min-height: var(--touch-target);
}

.discovery-strip__links {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  overflow: hidden;
  background: var(--ns-surface);
  border: 1px solid var(--ns-border);
  border-radius: var(--radius-lg);
}

.discovery-link {
  display: grid;
  grid-template-columns: 40px minmax(0, 1fr) 20px;
  gap: 10px;
  align-items: center;
  min-height: 88px;
  padding: 14px;
  color: var(--ns-text);
  text-decoration: none;
}

.discovery-link + .discovery-link {
  border-left: 1px solid var(--ns-border);
}

.discovery-link > .q-icon:first-child {
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  color: var(--ns-brand);
  background: var(--ns-brand-soft);
  border-radius: 10px;
}

.discovery-link--weekly > .q-icon:first-child {
  color: #6257ee;
  background: #f0eeff;
}

.discovery-link--quiet > .q-icon:first-child {
  color: #557285;
  background: #edf3f6;
}

.discovery-link > div {
  display: grid;
  gap: 3px;
  min-width: 0;
}

.discovery-link strong {
  font-size: 13px;
}

.discovery-link span {
  color: var(--ns-text-secondary);
  font-size: 11px;
  line-height: 1.35;
}

.discovery-link > .q-icon:last-child {
  color: var(--ns-text-tertiary);
}

.discovery-link:hover {
  background: var(--ns-surface-hover);
}

.feed-control-note {
  display: flex;
  gap: 5px;
  align-items: center;
  color: var(--ns-brand);
  font-size: 11px;
  font-weight: 650;
}

.home-feed__list {
  overflow: hidden;
  border: 1px solid var(--ns-border);
  border-radius: var(--radius-lg);
}

.feedback-notice {
  color: var(--ns-text);
  background: var(--ns-surface);
  border: 1px solid var(--ns-border);
  color: var(--ns-brand);
}

.feedback-notice .q-btn {
  min-height: 40px;
}

.feed-state--loading {
  display: grid;
  overflow: hidden;
  border: 1px solid var(--ns-border);
  border-radius: var(--radius-lg);
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
  gap: 8px;
  justify-items: center;
  min-height: 260px;
  padding: 36px 24px;
  text-align: center;
  background: var(--ns-surface);
  border: 1px solid var(--ns-border);
  border-radius: var(--radius-lg);
}

.feed-state--message .q-icon {
  color: var(--ns-brand);
}

.feed-state--message h3,
.feed-state--message p {
  margin: 0;
}

.feed-state--message h3 {
  font-size: 17px;
}

.feed-state--message p {
  max-width: 360px;
  color: var(--ns-text-secondary);
  font-size: 13px;
  line-height: 1.5;
}

.feed-state--message .q-btn {
  min-height: 44px;
  margin-top: 4px;
}

@media (min-width: 960px) {
  .home-shell {
    padding-top: 36px;
  }
}

@media (max-width: 760px) {
  .discovery-strip__links {
    grid-template-columns: 1fr;
  }

  .discovery-link + .discovery-link {
    border-top: 1px solid var(--ns-border);
    border-left: 0;
  }
}

@media (max-width: 599px) {
  .home-shell {
    gap: 18px;
    padding: 16px 0 32px;
  }

  .home-main {
    gap: 16px;
  }

  .home-welcome,
  .composer-entry,
  .discovery-strip,
  .home-feed {
    margin-right: 12px;
    margin-left: 12px;
  }

  .home-welcome {
    align-items: flex-start;
    flex-direction: column;
    padding: 18px;
  }

  .home-welcome .q-btn {
    width: 100%;
  }

  .home-feed__list {
    margin-right: -12px;
    margin-left: -12px;
    border-right: 0;
    border-left: 0;
    border-radius: 0;
  }
}
</style>
