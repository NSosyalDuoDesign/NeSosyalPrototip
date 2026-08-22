<template>
  <div class="reentry-page">
    <main class="reentry-shell">
      <section class="reentry-intro" aria-labelledby="reentry-page-title">
        <span>Devamlılık, baskı değil</span>
        <h2 id="reentry-page-title">Kaldığın yerden anlamlı bir başlangıç</h2>
        <p>
          Geri geldiğinde aynı akış yerine, değişen ve sana yakın olan birkaç başlığı hızlıca gör.
        </p>
      </section>

      <ReentrySummary
        v-if="showSummary"
        :first-name="firstName"
        :topic-update="topicUpdate"
        :daily-item="dailyItem"
        :weekly-item="weeklyItem"
        :overlooked-item="overlookedItem"
        :feedback-post="feedbackPost"
        :community="communityUpdate"
        @dismiss="store.dismissReentry"
      />

      <section v-else class="reentry-collapsed" aria-live="polite">
        <q-icon
          :name="store.retention.returningUser ? 'done' : 'home'"
          size="28px"
          aria-hidden="true"
        />
        <div>
          <h2>
            {{ store.retention.returningUser ? 'Özet şimdilik kapatıldı' : 'Normal ziyaret modu' }}
          </h2>
          <p>
            {{
              store.retention.returningUser
                ? 'Akışına kesintisiz devam edebilirsin; özet bu oturumda tekrar araya girmez.'
                : 'Geri dönüş özetini değerlendirmek için deterministik ziyaret durumunu canlandırabilirsin.'
            }}
          </p>
        </div>
        <q-btn
          flat
          no-caps
          color="primary"
          :label="
            store.retention.returningUser ? 'Özeti yeniden göster' : 'Dönüş ziyaretini canlandır'
          "
          @click="showReturningSummary"
        />
      </section>

      <section class="continue-section" aria-labelledby="continue-title">
        <div class="continue-section__heading">
          <span>Akışa devam</span>
          <h2 id="continue-title">Sıradaki adımını seç</h2>
        </div>
        <div class="continue-links">
          <router-link to="/discover?tab=daily">
            <q-icon name="explore" aria-hidden="true" />
            <span><strong>Bugünü keşfet</strong><small>Günün yükselen seçkisi</small></span>
            <q-icon name="chevron_right" aria-hidden="true" />
          </router-link>
          <router-link to="/compose">
            <q-icon name="edit" aria-hidden="true" />
            <span><strong>Bir şey paylaş</strong><small>Fikrini taslak olarak başlat</small></span>
            <q-icon name="chevron_right" aria-hidden="true" />
          </router-link>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import ReentrySummary from '@/components/retention/ReentrySummary.vue'
import {
  communityUpdate,
  defaultRetentionUpdate,
  retentionHighlights,
  retentionTopicUpdates,
} from '@/data/mock-retention.js'
import { usePrototypeStore } from '@/stores/prototype.js'

const route = useRoute()
const store = usePrototypeStore()

const firstName = computed(() => store.user.displayName.split(' ')[0])
const showSummary = computed(
  () => store.retention.returningUser && !store.retention.reentryDismissed,
)
const primaryInterest = computed(() => store.user.selectedInterests[0] ?? 'teknoloji')
const topicUpdate = computed(
  () => retentionTopicUpdates[primaryInterest.value] ?? defaultRetentionUpdate,
)
const feedbackPost = computed(() => {
  const interestedPostId = Object.entries(store.postFeedback).find(
    ([, feedback]) => feedback === 'interested',
  )?.[0]
  return store.posts.find((post) => post.id === interestedPostId) ?? null
})

function personalizeItem(item) {
  const matchedInterest = store.selectedInterestItems.find((interest) =>
    item.post.topicIds.includes(interest.id),
  )
  return {
    ...item,
    personalizedReason: matchedInterest
      ? `${matchedInterest.label} ilgi alanına göre`
      : item.reason,
  }
}

const dailyItem = computed(() => ({
  ...personalizeItem(store.dailyPicks[0]),
  reentryTitle: retentionHighlights.daily,
}))
const weeklyItem = computed(() => ({
  ...personalizeItem(store.weeklyPicks[0]),
  reentryTitle: retentionHighlights.weekly,
}))
const overlookedItem = computed(() => ({
  ...personalizeItem(store.overlookedPicks[0]),
  reentryTitle: retentionHighlights.overlooked,
}))

watch(
  () => route.query.mode,
  (mode) => {
    if (mode === 'normal') store.setNormalVisit()
    if (mode === 'returning') store.seedReturningUser()
  },
  { immediate: true },
)

function showReturningSummary() {
  store.seedReturningUser()
}
</script>

<style scoped>
.reentry-page {
  min-height: 100%;
  color: var(--ns-text, #15171a);
  background: var(--ns-bg-subtle, #f7f8fa);
}

.reentry-header {
  display: flex;
  gap: 8px;
  align-items: center;
  min-height: 64px;
  padding: 8px 16px;
  background: var(--ns-surface, #fff);
  border-bottom: 1px solid var(--ns-border, #e6e9ed);
}

.reentry-header .q-btn {
  width: 44px;
  height: 44px;
  color: var(--ns-text-secondary, #5f6670);
}

.reentry-header > div {
  display: grid;
}

.reentry-header span,
.reentry-intro > span,
.continue-section__heading > span {
  color: var(--ns-brand, #1687f8);
  font-size: 11px;
  font-weight: 700;
}

.reentry-header span {
  color: var(--ns-text-secondary, #5f6670);
}

.reentry-header h1,
.reentry-intro h2,
.reentry-intro p,
.reentry-collapsed h2,
.reentry-collapsed p,
.continue-section h2 {
  margin: 0;
}

.reentry-header h1 {
  font-size: 20px;
  line-height: 1.2;
}

.reentry-shell {
  display: grid;
  gap: 24px;
  width: min(100%, 720px);
  padding: 28px 16px 56px;
  margin: 0 auto;
}

.reentry-intro {
  display: grid;
  gap: 8px;
}

.reentry-intro h2 {
  font-size: clamp(22px, 5vw, 28px);
  line-height: 1.25;
}

.reentry-intro p {
  color: var(--ns-text-secondary, #5f6670);
  font-size: 14px;
  line-height: 1.5;
}

.reentry-collapsed {
  display: grid;
  grid-template-columns: 40px minmax(0, 1fr);
  gap: 12px;
  align-items: center;
  padding: 16px;
  background: var(--ns-surface, #fff);
  border: 1px solid var(--ns-border, #e6e9ed);
  border-radius: var(--radius-md, 12px);
}

.reentry-collapsed > .q-icon {
  color: var(--ns-success, #1f9d63);
}

.reentry-collapsed > div {
  display: grid;
  gap: 4px;
}

.reentry-collapsed h2 {
  font-size: 15px;
}

.reentry-collapsed p {
  color: var(--ns-text-secondary, #5f6670);
  font-size: 12px;
  line-height: 1.45;
}

.reentry-collapsed .q-btn {
  grid-column: 2;
  justify-self: start;
  min-height: 40px;
}

.continue-section {
  display: grid;
  gap: 12px;
}

.continue-section__heading {
  display: grid;
  gap: 3px;
}

.continue-section h2 {
  font-size: 17px;
}

.continue-links {
  display: grid;
  background: var(--ns-surface, #fff);
  border: 1px solid var(--ns-border, #e6e9ed);
  border-radius: var(--radius-md, 12px);
}

.continue-links a {
  display: grid;
  grid-template-columns: 40px minmax(0, 1fr) 24px;
  gap: 12px;
  align-items: center;
  min-height: 72px;
  padding: 12px 16px;
  color: inherit;
  text-decoration: none;
}

.continue-links a + a {
  border-top: 1px solid var(--ns-border, #e6e9ed);
}

.continue-links a > .q-icon:first-child {
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  color: var(--ns-brand, #1687f8);
  background: var(--ns-brand-soft, #eaf4ff);
  border-radius: 10px;
}

.continue-links a > span {
  display: grid;
  gap: 3px;
}

.continue-links strong {
  font-size: 13px;
}

.continue-links small {
  color: var(--ns-text-secondary, #5f6670);
  font-size: 11px;
}

.continue-links a > .q-icon:last-child {
  color: var(--ns-text-tertiary, #8b929b);
}

.continue-links a:hover {
  background: var(--ns-surface-hover, #f4f6f8);
}

.continue-links a:focus-visible {
  outline: 3px solid rgb(22 135 248 / 18%);
  outline-offset: -3px;
}

@media (min-width: 600px) {
  .reentry-header {
    padding: 8px 24px;
  }

  .reentry-shell {
    padding: 40px 24px 64px;
  }
}
</style>
