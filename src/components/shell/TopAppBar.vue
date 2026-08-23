<template>
  <q-header class="top-app-bar">
    <q-toolbar class="top-app-bar__toolbar">
      <q-btn flat round dense icon="menu" aria-label="Menüyü aç" class="top-app-bar__action">
        <q-menu class="mobile-more-menu">
          <q-list style="min-width: 230px">
            <q-item v-close-popup clickable to="/context/series">
              <q-item-section avatar><q-icon name="forum" /></q-item-section>
              <q-item-section>Canlı Gündem</q-item-section>
            </q-item>
            <q-item v-close-popup clickable to="/onboarding">
              <q-item-section avatar><q-icon name="tune" /></q-item-section>
              <q-item-section>İlgi alanlarım</q-item-section>
            </q-item>
            <q-item v-close-popup clickable to="/demo?demo=1">
              <q-item-section avatar><q-icon name="smart_display" /></q-item-section>
              <q-item-section>Demo senaryosu</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>

      <RouterLink to="/home" class="top-app-bar__brand" aria-label="NSosyal ana sayfa">
        <img src="/brand/nsosyal-logo.png" alt="NSosyal" width="34" height="34" />
        <span>BETA</span>
      </RouterLink>

      <ProfileMenu compact />
    </q-toolbar>
  </q-header>
</template>

<script setup>
import ProfileMenu from '@/components/shell/ProfileMenu.vue'
</script>

<style scoped>
.top-app-bar {
  display: none;
  color: var(--ns-text);
  background: color-mix(in srgb, var(--ns-bg) 94%, transparent);
  border-bottom: 1px solid var(--ns-border);
  box-shadow: none;
  backdrop-filter: blur(14px);
}

.top-app-bar__toolbar {
  min-height: var(--mobile-header-height);
  padding: env(safe-area-inset-top) 10px 0;
}

.top-app-bar__brand {
  display: grid;
  place-items: center;
  margin: 0 auto;
  color: var(--ns-text);
  text-decoration: none;
}

.top-app-bar__brand img {
  width: 34px;
  height: 34px;
  object-fit: contain;
}

.top-app-bar__brand span {
  margin-top: -5px;
  font-size: 0.42rem;
  letter-spacing: 0.22em;
  text-indent: 0.22em;
}

.top-app-bar__action {
  min-width: 44px;
  min-height: 44px;
}

.top-app-bar :deep(.profile-trigger) {
  min-width: 44px;
  min-height: 44px;
  padding: 0;
}

@media (max-width: 959px) {
  .top-app-bar {
    display: block;
  }
}
</style>
