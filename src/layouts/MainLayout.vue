<template>
  <q-layout view="hHh lpR fFf" class="ns-layout" :data-experience="store.user.experiencePreset">
    <q-header class="ns-header">
      <q-toolbar class="ns-toolbar">
        <q-btn
          flat
          round
          dense
          icon="menu"
          aria-label="Menüyü aç"
          class="lt-md ns-menu-button"
          @click="drawerOpen = true"
        />

        <router-link to="/" class="ns-brand" aria-label="Ne Sosyal? ana sayfa">
          <img src="/icons/favicon-96x96.png" alt="" width="36" height="36" />
          <span>Ne Sosyal?</span>
        </router-link>

        <nav class="ns-desktop-nav gt-sm" aria-label="Ana navigasyon">
          <router-link to="/" exact-active-class="ns-nav-link--active">
            <q-icon name="home" aria-hidden="true" /> Ana Sayfa
          </router-link>
          <router-link to="/discover" active-class="ns-nav-link--active">
            <q-icon name="explore" aria-hidden="true" /> Keşfet
          </router-link>
          <router-link to="/compose" active-class="ns-nav-link--active">
            <q-icon name="edit_square" aria-hidden="true" /> Oluştur
          </router-link>
        </nav>

        <q-space />

        <q-btn
          flat
          round
          icon="tune"
          to="/onboarding"
          aria-label="İlgi alanlarını düzenle"
          class="ns-header-action"
        />
        <q-avatar size="36px" color="blue-1" text-color="primary" aria-label="Deniz Yalın">
          DY
        </q-avatar>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="drawerOpen" behavior="mobile" :width="292" bordered>
      <div class="ns-drawer">
        <div class="ns-drawer__header">
          <router-link to="/" class="ns-brand" @click="drawerOpen = false">
            <img src="/icons/favicon-96x96.png" alt="" width="36" height="36" />
            <span>Ne Sosyal?</span>
          </router-link>
          <q-btn
            flat
            round
            dense
            icon="close"
            aria-label="Menüyü kapat"
            @click="drawerOpen = false"
          />
        </div>

        <nav class="ns-drawer__nav" aria-label="Mobil navigasyon">
          <router-link to="/" @click="drawerOpen = false">
            <q-icon name="home" /> <span>Ana Sayfa</span>
          </router-link>
          <router-link to="/discover" @click="drawerOpen = false">
            <q-icon name="explore" /> <span>Keşfet</span>
          </router-link>
          <router-link to="/compose" @click="drawerOpen = false">
            <q-icon name="edit_square" /> <span>Gönderi oluştur</span>
          </router-link>
          <router-link to="/return?mode=returning" @click="drawerOpen = false">
            <q-icon name="history" /> <span>Sen yokken</span>
          </router-link>
          <router-link to="/onboarding" @click="drawerOpen = false">
            <q-icon name="tune" /> <span>İlgi alanlarım</span>
          </router-link>
        </nav>

        <div class="ns-drawer__profile">
          <q-avatar size="42px" color="blue-1" text-color="primary">DY</q-avatar>
          <div>
            <strong>{{ store.user.displayName }}</strong>
            <span>{{ store.user.handle }}</span>
          </div>
        </div>

        <router-link to="/demo?demo=1" class="ns-demo-entry" @click="drawerOpen = false">
          <q-icon name="smart_display" /> Demo senaryosu
        </router-link>
      </div>
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
import { ref } from 'vue'
import { usePrototypeStore } from '@/stores/prototype.js'

const drawerOpen = ref(false)
const store = usePrototypeStore()
</script>

<style scoped>
.ns-layout {
  color: var(--ns-text);
  background: var(--ns-bg-subtle);
}

.ns-header {
  color: var(--ns-text);
  background: rgb(255 255 255 / 96%);
  border-bottom: 1px solid var(--ns-border);
  box-shadow: none;
}

.ns-toolbar {
  width: min(100%, 1180px);
  min-height: 64px;
  padding: 0 20px;
  margin: 0 auto;
}

.ns-menu-button {
  width: 44px;
  height: 44px;
  margin-right: 4px;
  color: var(--ns-text-secondary);
}

.ns-brand {
  display: inline-flex;
  gap: 10px;
  align-items: center;
  color: var(--ns-text);
  font-size: 17px;
  font-weight: 800;
  text-decoration: none;
  white-space: nowrap;
}

.ns-brand img {
  border-radius: 10px;
}

.ns-desktop-nav {
  display: flex;
  gap: 4px;
  align-items: stretch;
  align-self: stretch;
  margin-left: 40px;
}

.ns-desktop-nav a {
  position: relative;
  display: flex;
  gap: 7px;
  align-items: center;
  padding: 0 14px;
  color: var(--ns-text-secondary);
  font-size: 13px;
  font-weight: 650;
  text-decoration: none;
}

.ns-desktop-nav a::after {
  position: absolute;
  right: 14px;
  bottom: 0;
  left: 14px;
  height: 3px;
  content: '';
  background: transparent;
  border-radius: 3px 3px 0 0;
}

.ns-desktop-nav a:hover,
.ns-desktop-nav .ns-nav-link--active {
  color: var(--ns-brand);
}

.ns-desktop-nav .ns-nav-link--active::after {
  background: var(--ns-brand);
}

.ns-header-action {
  width: 44px;
  height: 44px;
  margin-right: 4px;
  color: var(--ns-text-secondary);
}

.ns-drawer {
  display: flex;
  flex-direction: column;
  min-height: 100%;
  padding: 16px;
  background: var(--ns-surface);
}

.ns-drawer__header,
.ns-drawer__profile {
  display: flex;
  align-items: center;
}

.ns-drawer__header {
  justify-content: space-between;
  min-height: 48px;
}

.ns-drawer__nav {
  display: grid;
  gap: 4px;
  padding: 24px 0;
}

.ns-drawer__nav a {
  display: grid;
  grid-template-columns: 28px minmax(0, 1fr);
  gap: 12px;
  align-items: center;
  min-height: 48px;
  padding: 0 12px;
  color: var(--ns-text-secondary);
  font-size: 14px;
  font-weight: 650;
  text-decoration: none;
  border-radius: var(--radius-sm);
}

.ns-drawer__nav a:hover,
.ns-drawer__nav a.router-link-active {
  color: var(--ns-brand);
  background: var(--ns-brand-soft);
}

.ns-drawer__nav .q-icon {
  font-size: 22px;
}

.ns-drawer__profile {
  gap: 10px;
  padding: 16px 8px;
  margin-top: auto;
  border-top: 1px solid var(--ns-border);
}

.ns-drawer__profile > div {
  display: grid;
}

.ns-drawer__profile strong {
  font-size: 13px;
}

.ns-drawer__profile span {
  color: var(--ns-text-secondary);
  font-size: 11px;
}

.ns-demo-entry {
  display: flex;
  gap: 8px;
  align-items: center;
  min-height: 44px;
  padding: 0 8px;
  color: var(--ns-text-tertiary);
  font-size: 12px;
  text-decoration: none;
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
  .ns-toolbar {
    padding: 0 12px;
  }

  .ns-brand span {
    font-size: 15px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .ns-layout * {
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
  }
}
</style>
