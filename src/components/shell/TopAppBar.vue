<template>
  <q-header class="top-app-bar">
    <q-toolbar class="top-app-bar__toolbar">
      <q-btn flat round dense icon="menu" aria-label="Menüyü aç" class="top-app-bar__action" />

      <RouterLink to="/home" class="top-app-bar__brand" aria-label="NSosyal ana sayfa">
        NSosyal
      </RouterLink>

      <q-btn
        flat
        round
        dense
        icon="notifications_none"
        aria-label="Bildirimler"
        to="/notifications"
        class="top-app-bar__action"
      />
    </q-toolbar>
  </q-header>
</template>

<style scoped>
.top-app-bar {
  display: none;
  color: var(--ns-text);
  background: color-mix(in srgb, var(--ns-surface) 94%, transparent);
  border-bottom: 1px solid var(--ns-border);
  box-shadow: none;
}

.top-app-bar__toolbar {
  min-height: var(--mobile-header-height);
  padding: env(safe-area-inset-top) var(--space-3) 0;
}

.top-app-bar__brand {
  margin: 0 auto;
  color: var(--ns-text);
  font-size: 1.0625rem;
  font-weight: 750;
  letter-spacing: -0.02em;
  text-decoration: none;
}

.top-app-bar__action {
  min-width: 44px;
  min-height: 44px;
}

@media (max-width: 959px) {
  .top-app-bar {
    display: block;
  }
}
</style>
