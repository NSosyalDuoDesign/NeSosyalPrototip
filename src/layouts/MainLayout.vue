<template>
  <q-layout view="lHh Lpr lFf" class="ns-layout" :data-experience="store.user.experiencePreset">
    <q-header class="ns-mobile-header lt-md">
      <q-toolbar class="ns-mobile-toolbar">
        <q-btn
          flat
          round
          dense
          icon="menu"
          aria-label="Menüyü aç"
          class="ns-menu-button"
          @click="drawerOpen = true"
        />
        <router-link to="/" class="ns-brand" aria-label="Ne Sosyal? ana sayfa">
          <img src="/icons/favicon-96x96.png" alt="" width="36" height="36" />
          <span>Ne Sosyal?</span>
        </router-link>
        <q-space />
        <q-btn
          flat
          round
          icon="tune"
          to="/onboarding"
          aria-label="İlgi alanlarını düzenle"
          class="ns-mobile-action"
        />
        <q-avatar size="36px" color="blue-1" text-color="primary" aria-label="Deniz Yalın">
          DY
        </q-avatar>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="drawerOpen"
      show-if-above
      bordered
      :width="252"
      :breakpoint="1024"
      class="ns-sidebar"
    >
      <aside class="ns-sidebar__inner" aria-label="Ana menü">
        <div class="ns-sidebar__header">
          <router-link to="/" class="ns-brand" @click="closeDrawerOnMobile">
            <img src="/icons/favicon-96x96.png" alt="" width="40" height="40" />
            <span>Ne Sosyal?</span>
          </router-link>
          <q-btn
            flat
            round
            dense
            icon="close"
            aria-label="Menüyü kapat"
            class="lt-md"
            @click="drawerOpen = false"
          />
        </div>

        <p class="ns-sidebar__tagline">Topluluk, merak ve keşif için.</p>

        <nav class="ns-sidebar__nav" aria-label="Birincil navigasyon">
          <router-link
            to="/"
            exact-active-class="ns-sidebar-link--active"
            @click="closeDrawerOnMobile"
          >
            <q-icon name="home" aria-hidden="true" />
            <span>Ana Sayfa</span>
          </router-link>
          <router-link
            to="/discover"
            active-class="ns-sidebar-link--active"
            @click="closeDrawerOnMobile"
          >
            <q-icon name="explore" aria-hidden="true" />
            <span>Keşfet</span>
          </router-link>
          <router-link
            to="/return?mode=returning"
            active-class="ns-sidebar-link--active"
            @click="closeDrawerOnMobile"
          >
            <q-icon name="history" aria-hidden="true" />
            <span>Sen yokken</span>
          </router-link>
        </nav>

        <router-link to="/compose" class="ns-create-button" @click="closeDrawerOnMobile">
          <q-icon name="edit_square" aria-hidden="true" />
          <span>Gönderi oluştur</span>
        </router-link>

        <div class="ns-sidebar__section">
          <span class="ns-sidebar__section-title">Tercihler</span>
          <router-link to="/onboarding" @click="closeDrawerOnMobile">
            <q-icon name="tune" aria-hidden="true" />
            <div>
              <strong>İlgi alanlarım</strong>
              <small>{{ interestSummary }}</small>
            </div>
          </router-link>
          <router-link to="/demo?demo=1" @click="closeDrawerOnMobile">
            <q-icon name="smart_display" aria-hidden="true" />
            <div>
              <strong>Demo senaryosu</strong>
              <small>Sunum kontrolleri</small>
            </div>
          </router-link>
        </div>

        <div class="ns-sidebar__profile">
          <q-avatar size="42px" color="blue-1" text-color="primary">DY</q-avatar>
          <div>
            <strong>{{ store.user.displayName }}</strong>
            <span>{{ store.user.handle }}</span>
          </div>
          <q-icon name="more_horiz" aria-hidden="true" />
        </div>
      </aside>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer class="ns-mobile-footer lt-md">
      <nav aria-label="Alt navigasyon">
        <router-link to="/" aria-label="Ana Sayfa">
          <q-icon name="home" /><span>Ana Sayfa</span>
        </router-link>
        <router-link to="/discover" aria-label="Keşfet">
          <q-icon name="explore" /><span>Keşfet</span>
        </router-link>
        <router-link to="/compose" aria-label="Oluştur">
          <q-icon name="add_circle_outline" /><span>Oluştur</span>
        </router-link>
        <router-link to="/return?mode=returning" aria-label="Sen yokken">
          <q-icon name="history" /><span>Sen yokken</span>
        </router-link>
      </nav>
    </q-footer>
  </q-layout>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useQuasar } from 'quasar'
import { usePrototypeStore } from '@/stores/prototype.js'

const $q = useQuasar()
const drawerOpen = ref(false)
const store = usePrototypeStore()

const interestSummary = computed(() => {
  const labels = store.selectedInterestItems.slice(0, 2).map((interest) => interest.label)
  if (labels.length === 0) return 'Henüz seçim yapılmadı'
  const remaining = Math.max(0, store.selectedInterestItems.length - labels.length)
  return remaining ? `${labels.join(', ')} +${remaining}` : labels.join(', ')
})

function closeDrawerOnMobile() {
  if ($q.screen.lt.md) drawerOpen.value = false
}
</script>

<style scoped>
.ns-layout {
  color: var(--ns-text);
  background: var(--ns-bg-subtle);
}

.ns-mobile-header {
  color: var(--ns-text);
  background: rgb(255 255 255 / 96%);
  border-bottom: 1px solid var(--ns-border);
  box-shadow: none;
}

.ns-mobile-toolbar {
  min-height: 64px;
  padding: 0 12px;
}

.ns-menu-button,
.ns-mobile-action {
  width: 44px;
  height: 44px;
  color: var(--ns-text-secondary);
}

.ns-menu-button {
  margin-right: 4px;
}

.ns-mobile-action {
  margin-right: 2px;
}

.ns-brand {
  display: inline-flex;
  gap: 10px;
  align-items: center;
  color: var(--ns-text);
  font-size: 18px;
  font-weight: 800;
  text-decoration: none;
  white-space: nowrap;
}

.ns-brand img {
  border-radius: 11px;
}

.ns-sidebar :deep(.q-drawer__content) {
  overflow: hidden;
  background: var(--ns-surface);
}

.ns-sidebar__inner {
  display: flex;
  flex-direction: column;
  min-height: 100%;
  padding: 20px 16px 16px;
}

.ns-sidebar__header,
.ns-sidebar__profile {
  display: flex;
  align-items: center;
}

.ns-sidebar__header {
  justify-content: space-between;
  min-height: 48px;
}

.ns-sidebar__tagline {
  margin: 8px 8px 22px;
  color: var(--ns-text-tertiary);
  font-size: 11px;
  line-height: 1.4;
}

.ns-sidebar__nav {
  display: grid;
  gap: 4px;
}

.ns-sidebar__nav a,
.ns-sidebar__section > a {
  color: var(--ns-text-secondary);
  text-decoration: none;
  border-radius: var(--radius-sm);
}

.ns-sidebar__nav a {
  display: grid;
  grid-template-columns: 28px minmax(0, 1fr);
  gap: 12px;
  align-items: center;
  min-height: 48px;
  padding: 0 12px;
  font-size: 14px;
  font-weight: 650;
}

.ns-sidebar__nav .q-icon {
  font-size: 22px;
}

.ns-sidebar__nav a:hover,
.ns-sidebar__nav .ns-sidebar-link--active {
  color: var(--ns-brand);
  background: var(--ns-brand-soft);
}

.ns-create-button {
  display: flex;
  gap: 9px;
  align-items: center;
  justify-content: center;
  min-height: 46px;
  margin: 18px 0 24px;
  color: #fff;
  font-size: 13px;
  font-weight: 700;
  text-decoration: none;
  background: var(--ns-brand);
  border-radius: var(--radius-sm);
}

.ns-create-button:hover {
  background: #0877e8;
}

.ns-sidebar__section {
  display: grid;
  gap: 4px;
  padding-top: 16px;
  border-top: 1px solid var(--ns-border);
}

.ns-sidebar__section-title {
  padding: 0 10px 8px;
  color: var(--ns-text-tertiary);
  font-size: 10px;
  font-weight: 750;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.ns-sidebar__section > a {
  display: grid;
  grid-template-columns: 28px minmax(0, 1fr);
  gap: 10px;
  align-items: center;
  min-height: 54px;
  padding: 7px 10px;
}

.ns-sidebar__section > a:hover {
  color: var(--ns-brand);
  background: var(--ns-surface-hover);
}

.ns-sidebar__section .q-icon {
  font-size: 20px;
}

.ns-sidebar__section a > div {
  display: grid;
  gap: 2px;
  min-width: 0;
}

.ns-sidebar__section strong,
.ns-sidebar__section small {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.ns-sidebar__section strong {
  color: var(--ns-text);
  font-size: 12px;
}

.ns-sidebar__section small {
  color: var(--ns-text-tertiary);
  font-size: 10px;
}

.ns-sidebar__profile {
  gap: 10px;
  padding: 16px 8px 0;
  margin-top: auto;
  border-top: 1px solid var(--ns-border);
}

.ns-sidebar__profile > div {
  display: grid;
  flex: 1;
  min-width: 0;
}

.ns-sidebar__profile strong,
.ns-sidebar__profile span {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.ns-sidebar__profile strong {
  font-size: 12px;
}

.ns-sidebar__profile span {
  color: var(--ns-text-secondary);
  font-size: 10px;
}

.ns-sidebar__profile > .q-icon {
  color: var(--ns-text-tertiary);
}

.ns-mobile-footer {
  color: var(--ns-text-secondary);
  background: rgb(255 255 255 / 97%);
  border-top: 1px solid var(--ns-border);
  box-shadow: none;
}

.ns-mobile-footer nav {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  min-height: calc(62px + env(safe-area-inset-bottom));
  padding-bottom: env(safe-area-inset-bottom);
}

.ns-mobile-footer a {
  display: grid;
  gap: 2px;
  place-content: center;
  min-width: 0;
  color: inherit;
  font-size: 10px;
  font-weight: 650;
  text-align: center;
  text-decoration: none;
}

.ns-mobile-footer a.router-link-active {
  color: var(--ns-brand);
}

.ns-mobile-footer .q-icon {
  margin: 0 auto;
  font-size: 23px;
}

@media (max-width: 599px) {
  .ns-brand {
    font-size: 15px;
  }

  .ns-sidebar__inner {
    padding-top: 16px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .ns-layout * {
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
  }
}
</style>
