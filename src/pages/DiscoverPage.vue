<template>
  <div class="discover-page">
    <main class="discover-shell">
      <section class="discover-intro" aria-labelledby="discover-title">
        <div>
          <span class="discover-eyebrow">Meraktan keşfe</span>
          <h2 id="discover-title">Bugün burada ne keşfedebilirsin?</h2>
          <p>
            Günün ritmini yakala, haftayı toparla veya daha az kişinin gördüğü iyi içeriklere bak.
          </p>
        </div>
        <q-input
          v-model="searchDraft"
          outlined
          dense
          clearable
          debounce="0"
          label="Keşifte ara"
          placeholder="Konu, gönderi veya kişi"
          class="discover-search"
          @clear="clearSearch"
        >
          <template #prepend><q-icon name="search" aria-hidden="true" /></template>
        </q-input>
      </section>

      <q-tabs
        v-model="activeTab"
        no-caps
        align="left"
        active-color="primary"
        indicator-color="primary"
        narrow-indicator
        class="discover-tabs"
        aria-label="Keşif zaman aralığı"
      >
        <q-tab name="daily" label="Bugün" />
        <q-tab name="weekly" label="Bu Hafta" />
        <q-tab name="overlooked" label="Gözden Kaçanlar" />
      </q-tabs>

      <div class="discover-context" role="status" aria-live="polite">
        <div>
          <q-icon :name="activeContext.icon" size="20px" aria-hidden="true" />
          <div>
            <strong>{{ activeContext.title }}</strong>
            <span>{{ activeContext.description }}</span>
          </div>
        </div>
        <span>{{ visibleItems.length }} seçki</span>
      </div>

      <div class="discover-layout">
        <section class="discover-results" :aria-busy="isLoading">
          <template v-if="isLoading">
            <q-skeleton
              type="rect"
              height="320px"
              class="discover-skeleton discover-skeleton--hero"
            />
            <div v-for="index in 4" :key="index" class="discover-skeleton-row">
              <q-skeleton type="QAvatar" size="36px" />
              <div>
                <q-skeleton type="text" width="35%" />
                <q-skeleton type="text" />
                <q-skeleton type="text" width="75%" />
              </div>
            </div>
          </template>

          <div v-else-if="visibleItems.length === 0" class="discover-empty">
            <q-icon name="travel_explore" size="36px" aria-hidden="true" />
            <h3>Bu aramada bir seçki bulamadık</h3>
            <p>Başka bir kelime deneyebilir veya aramayı temizleyebilirsin.</p>
            <q-btn
              v-if="searchQuery"
              flat
              no-caps
              color="primary"
              label="Aramayı temizle"
              @click="clearSearch"
            />
          </div>

          <template v-else>
            <DiscoveryHero :item="heroItem" :interests="store.interests" :mode="activeTab" />
            <div class="discover-list">
              <DiscoveryListItem
                v-for="item in secondaryItems"
                :key="item.postId"
                :item="item"
                :interests="store.interests"
                :mode="activeTab"
              />
            </div>
          </template>
        </section>

        <aside class="rising-panel" aria-labelledby="rising-title">
          <div class="rising-panel__heading">
            <span class="discover-eyebrow">Canlı başlıklar</span>
            <h2 id="rising-title">Yükselenler</h2>
          </div>
          <ol>
            <li v-for="(topic, index) in personalizedTopics" :key="topic.id">
              <span>{{ index + 1 }}</span>
              <div>
                <strong>{{ topic.label }}</strong>
                <small>{{ topicReason(topic) }}</small>
              </div>
            </li>
          </ol>
          <router-link to="/onboarding">İlgi alanlarını düzenle</router-link>
        </aside>
      </div>
    </main>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import DiscoveryHero from '@/components/discovery/DiscoveryHero.vue'
import DiscoveryListItem from '@/components/discovery/DiscoveryListItem.vue'
import { usePrototypeStore } from '@/stores/prototype.js'

const validTabs = ['daily', 'weekly', 'overlooked']
const route = useRoute()
const router = useRouter()
const store = usePrototypeStore()
const activeTab = ref(validTabs.includes(route.query.tab) ? route.query.tab : 'daily')
const searchDraft = ref('')
const searchQuery = ref('')
let searchTimer

const contexts = {
  daily: {
    icon: 'bolt',
    title: 'Bugün',
    description: 'Şimdi yükselen ve bugün görülmeye değer içerikler.',
  },
  weekly: {
    icon: 'date_range',
    title: 'Bu Hafta',
    description: 'Hafta boyunca gelişen başlıkların kısa bir özeti.',
  },
  overlooked: {
    icon: 'visibility_off',
    title: 'Gözden Kaçanlar',
    description: 'Daha az kişinin gördüğü, ilgi alanlarına yakın içerikler.',
  },
}

const activeContext = computed(() => contexts[activeTab.value])
const isLoading = computed(() => route.query.state === 'loading')
const forceEmpty = computed(() => route.query.state === 'empty')
const baseItems = computed(() => {
  if (activeTab.value === 'weekly') return store.weeklyPicks
  if (activeTab.value === 'overlooked') return store.overlookedPicks
  return store.dailyPicks
})

const visibleItems = computed(() => {
  if (forceEmpty.value) return []

  const selected = new Set(store.user.selectedInterests)
  const term = searchQuery.value.trim().toLocaleLowerCase('tr-TR')

  return baseItems.value
    .map((item) => {
      const matchedInterest = store.interests.find(
        (interest) => selected.has(interest.id) && item.post.topicIds.includes(interest.id),
      )
      return {
        ...item,
        personalizedReason: matchedInterest
          ? `${matchedInterest.label} ilgi alanına göre`
          : item.reason,
        personalized: Boolean(matchedInterest),
      }
    })
    .filter((item) => {
      if (!term) return true
      const topicLabels = store.interests
        .filter((interest) => item.post.topicIds.includes(interest.id))
        .map((interest) => interest.label)
      return [item.post.body, item.post.author.displayName, item.post.author.handle, ...topicLabels]
        .join(' ')
        .toLocaleLowerCase('tr-TR')
        .includes(term)
    })
    .sort(
      (left, right) =>
        Number(right.personalized) - Number(left.personalized) || left.rank - right.rank,
    )
    .map((item, index) => ({ ...item, rank: index + 1 }))
})

const heroItem = computed(() => visibleItems.value[0])
const secondaryItems = computed(() => visibleItems.value.slice(1))
const personalizedTopics = computed(() => {
  const selected = new Set(store.user.selectedInterests)
  return [...store.discovery.risingTopics].sort((left, right) => {
    const leftMatch = left.topicIds.some((id) => selected.has(id))
    const rightMatch = right.topicIds.some((id) => selected.has(id))
    return Number(rightMatch) - Number(leftMatch) || right.score - left.score
  })
})

watch(activeTab, (tab) => {
  if (route.query.tab === tab) return
  router.replace({ query: { ...route.query, tab } })
})

watch(
  () => route.query.tab,
  (tab) => {
    const nextTab = validTabs.includes(tab) ? tab : 'daily'
    if (activeTab.value !== nextTab) activeTab.value = nextTab
  },
)

watch(searchDraft, (value) => {
  clearTimeout(searchTimer)
  searchTimer = setTimeout(() => {
    searchQuery.value = value ?? ''
  }, 250)
})

onBeforeUnmount(() => clearTimeout(searchTimer))

function clearSearch() {
  clearTimeout(searchTimer)
  searchDraft.value = ''
  searchQuery.value = ''
}

function topicReason(topic) {
  const matchedInterest = store.selectedInterestItems.find((interest) =>
    topic.topicIds.includes(interest.id),
  )
  return matchedInterest ? `${matchedInterest.label} seçimine yakın` : 'Topluluklarda yükseliyor'
}
</script>

<style scoped>
.discover-page {
  min-height: 100%;
  color: var(--ns-text, #15171a);
  background: var(--ns-bg-subtle, #f7f8fa);
}

.discover-header {
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 64px;
  padding: 8px 16px;
  background: rgb(255 255 255 / 96%);
  border-bottom: 1px solid var(--ns-border, #e6e9ed);
}

.discover-header__title {
  display: flex;
  gap: 8px;
  align-items: center;
}

.discover-header__title > div {
  display: grid;
}

.discover-header__title span {
  color: var(--ns-text-secondary, #5f6670);
  font-size: 11px;
  font-weight: 600;
}

.discover-header h1,
.discover-intro h2,
.rising-panel h2,
.discover-empty h3,
.discover-empty p {
  margin: 0;
}

.discover-header h1 {
  font-size: 20px;
  line-height: 1.2;
}

.discover-header__back {
  width: 44px;
  height: 44px;
  color: var(--ns-text-secondary, #5f6670);
}

.discover-header__personalized {
  display: none;
  gap: 6px;
  align-items: center;
  color: var(--ns-brand, #1687f8);
  font-size: 12px;
  font-weight: 600;
}

.discover-shell {
  width: min(100%, 1040px);
  padding: 28px 16px 56px;
  margin: 0 auto;
}

.discover-intro {
  display: grid;
  gap: 20px;
  align-items: end;
}

.discover-intro > div:first-child {
  display: grid;
  gap: 8px;
}

.discover-eyebrow {
  color: var(--ns-brand, #1687f8);
  font-size: 12px;
  font-weight: 700;
}

.discover-intro h2 {
  font-size: clamp(22px, 5vw, 28px);
  line-height: 1.25;
}

.discover-intro p {
  max-width: 640px;
  margin: 0;
  color: var(--ns-text-secondary, #5f6670);
  font-size: 14px;
  line-height: 1.5;
}

.discover-search {
  width: 100%;
}

.discover-search :deep(.q-field__control) {
  min-height: 44px;
  background: var(--ns-surface, #fff);
  border-radius: var(--radius-md, 12px);
}

.discover-tabs {
  margin-top: 28px;
  color: var(--ns-text-secondary, #5f6670);
  border-bottom: 1px solid var(--ns-border, #e6e9ed);
}

.discover-tabs :deep(.q-tabs__content) {
  justify-content: flex-start;
  overflow-x: auto;
}

.discover-tabs :deep(.q-tab) {
  flex: 0 0 auto;
  min-height: 48px;
  padding: 0 12px;
}

.discover-context {
  display: flex;
  gap: 16px;
  align-items: center;
  justify-content: space-between;
  min-height: 72px;
  padding: 12px 0;
}

.discover-context > div {
  display: flex;
  gap: 10px;
  align-items: center;
  min-width: 0;
}

.discover-context > div > div {
  display: grid;
  min-width: 0;
}

.discover-context strong {
  font-size: 14px;
}

.discover-context span {
  color: var(--ns-text-secondary, #5f6670);
  font-size: 12px;
}

.discover-context > span {
  flex: 0 0 auto;
}

.discover-layout {
  display: grid;
  gap: 32px;
}

.discover-results {
  min-width: 0;
  min-height: 560px;
}

.discover-list {
  margin-top: 8px;
}

.discover-skeleton {
  border-radius: var(--radius-lg, 16px);
}

.discover-skeleton-row {
  display: grid;
  grid-template-columns: 36px minmax(0, 1fr);
  gap: 12px;
  padding: 20px 0;
  border-bottom: 1px solid var(--ns-border, #e6e9ed);
}

.discover-skeleton-row > div {
  display: grid;
  gap: 6px;
}

.discover-empty {
  display: grid;
  place-items: center;
  min-height: 360px;
  padding: 32px 16px;
  color: var(--ns-text-secondary, #5f6670);
  text-align: center;
  background: var(--ns-surface, #fff);
  border: 1px solid var(--ns-border, #e6e9ed);
  border-radius: var(--radius-lg, 16px);
}

.discover-empty h3 {
  color: var(--ns-text, #15171a);
  font-size: 18px;
}

.discover-empty p {
  max-width: 360px;
  font-size: 14px;
}

.rising-panel {
  display: none;
  align-self: start;
  padding: 20px;
  background: var(--ns-surface, #fff);
  border: 1px solid var(--ns-border, #e6e9ed);
  border-radius: var(--radius-md, 12px);
}

.rising-panel__heading {
  display: grid;
  gap: 4px;
}

.rising-panel h2 {
  font-size: 18px;
}

.rising-panel ol {
  padding: 0;
  margin: 16px 0;
  list-style: none;
}

.rising-panel li {
  display: grid;
  grid-template-columns: 24px minmax(0, 1fr);
  gap: 8px;
  padding: 12px 0;
  border-bottom: 1px solid var(--ns-border, #e6e9ed);
}

.rising-panel li > span {
  color: var(--ns-text-tertiary, #8b929b);
  font-size: 12px;
  font-weight: 700;
}

.rising-panel li > div {
  display: grid;
  gap: 3px;
}

.rising-panel strong {
  font-size: 13px;
  line-height: 1.35;
}

.rising-panel small {
  color: var(--ns-text-secondary, #5f6670);
  font-size: 11px;
}

.rising-panel a {
  color: var(--ns-brand, #1687f8);
  font-size: 12px;
  font-weight: 600;
  text-decoration: none;
}

@media (min-width: 600px) {
  .discover-header {
    padding: 8px 24px;
  }

  .discover-header__personalized {
    display: flex;
  }

  .discover-shell {
    padding: 36px 24px 64px;
  }

  .discover-intro {
    grid-template-columns: minmax(0, 1fr) 300px;
  }
}

@media (min-width: 960px) {
  .discover-layout {
    grid-template-columns: minmax(0, 680px) minmax(260px, 1fr);
  }

  .rising-panel {
    display: block;
  }
}

@media (max-width: 420px) {
  .discover-tabs :deep(.q-tab) {
    padding: 0 10px;
    font-size: 12px;
  }

  .discover-context > div > div span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}

@media (prefers-reduced-motion: reduce) {
  .discover-page :deep(*) {
    scroll-behavior: auto;
  }
}
</style>
