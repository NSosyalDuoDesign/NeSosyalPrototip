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
          <q-avatar size="42px" color="blue-1" text-color="primary">DY</q-avatar>
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
        </section>
      </div>

      <aside class="home-aside" aria-label="Kısayollar ve gündem">
        <section class="aside-section">
          <span class="home-eyebrow">Kaldığın yerden</span>
          <h2>Sen yokken neler oldu?</h2>
          <p>
            İlgi alanlarında değişen başlıkları ve daha az kişinin gördüğü içerikleri kısa bir
            özette yakala.
          </p>
          <q-btn
            flat
            no-caps
            color="primary"
            label="Geri dönüş özetini aç"
            icon-right="arrow_forward"
            to="/return?mode=returning"
          />
        </section>

        <section class="aside-section aside-section--topics">
          <div class="aside-heading"><span>Yükselenler</span><q-icon name="trending_up" /></div>
          <ol>
            <li v-for="(topic, index) in risingTopics" :key="topic.id">
              <span>{{ index + 1 }}</span>
              <div>
                <strong>{{ topic.label }}</strong
                ><small>{{ topic.description }}</small>
              </div>
            </li>
          </ol>
          <router-link to="/discover?tab=daily">Bugünün tamamını keşfet</router-link>
        </section>

        <section class="aside-section aside-section--values">
          <q-icon name="forum" aria-hidden="true" />
          <div>
            <strong>Fikrini söyle, kişiyi değil.</strong>
            <span>Paylaşırken yapıcı dil desteği yanında.</span>
          </div>
          <router-link to="/compose">Gönderi oluştur</router-link>
        </section>
      </aside>
    </main>
  </q-page>
</template>

<script setup>
import { computed, ref } from 'vue'
import HomeFeedPost from '@/components/feed/HomeFeedPost.vue'
import { usePrototypeStore } from '@/stores/prototype.js'

const store = usePrototypeStore()
const displayedPostIds = ref(store.personalizedFeed.slice(0, 6).map((post) => post.id))

const firstName = computed(() => store.user.displayName.split(' ')[0])
const selectedLabels = computed(() => {
  const labels = store.selectedInterestItems.slice(0, 3).map((interest) => interest.label)
  if (labels.length === 0) return 'henüz belirlenmemiş ilgi alanı'
  if (labels.length === 1) return labels[0]
  const last = labels.pop()
  return `${labels.join(', ')} ve ${last}`
})
const visibleFeed = computed(() => {
  const postsById = Object.fromEntries(store.personalizedFeed.map((post) => [post.id, post]))
  return displayedPostIds.value.map((postId) => postsById[postId]).filter(Boolean)
})
const risingTopics = computed(() => store.discovery.risingTopics.slice(0, 4))

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
  display: grid;
  gap: 28px;
  width: min(100%, 1100px);
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
.section-heading,
.aside-heading,
.aside-section--values {
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
.section-heading h2,
.aside-section h2,
.aside-section p {
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

.home-aside {
  display: none;
  gap: 16px;
  align-content: start;
}

.aside-section {
  padding: 18px;
  background: var(--ns-surface);
  border: 1px solid var(--ns-border);
  border-radius: var(--radius-md);
}

.aside-section h2 {
  margin-top: 5px;
  font-size: 18px;
  line-height: 1.3;
}

.aside-section p {
  margin-top: 8px;
  color: var(--ns-text-secondary);
  font-size: 12px;
  line-height: 1.5;
}

.aside-section > .q-btn {
  min-height: 40px;
  padding-right: 0;
  padding-left: 0;
  margin-top: 8px;
  font-size: 12px;
}

.aside-heading {
  justify-content: space-between;
  font-size: 14px;
  font-weight: 750;
}

.aside-heading .q-icon {
  color: var(--ns-brand);
}

.aside-section--topics ol {
  padding: 0;
  margin: 12px 0;
  list-style: none;
}

.aside-section--topics li {
  display: grid;
  grid-template-columns: 24px minmax(0, 1fr);
  gap: 8px;
  padding: 11px 0;
  border-bottom: 1px solid var(--ns-border);
}

.aside-section--topics li > span {
  color: var(--ns-text-tertiary);
  font-size: 11px;
  font-weight: 750;
}

.aside-section--topics li > div {
  display: grid;
  gap: 3px;
}

.aside-section--topics strong {
  font-size: 12px;
}

.aside-section--topics small {
  color: var(--ns-text-secondary);
  font-size: 10px;
}

.aside-section--topics > a,
.aside-section--values > a {
  color: var(--ns-brand);
  font-size: 11px;
  font-weight: 650;
  text-decoration: none;
}

.aside-section--values {
  display: grid;
  grid-template-columns: 36px minmax(0, 1fr);
  gap: 10px;
}

.aside-section--values > .q-icon {
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  color: var(--ns-brand);
  background: var(--ns-brand-soft);
  border-radius: 9px;
}

.aside-section--values > div {
  display: grid;
  gap: 3px;
}

.aside-section--values strong {
  font-size: 12px;
}

.aside-section--values span {
  color: var(--ns-text-secondary);
  font-size: 10px;
  line-height: 1.4;
}

.aside-section--values > a {
  grid-column: 2;
}

@media (min-width: 960px) {
  .home-shell {
    grid-template-columns: minmax(0, 720px) minmax(260px, 1fr);
    padding-top: 36px;
  }

  .home-aside {
    display: grid;
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
