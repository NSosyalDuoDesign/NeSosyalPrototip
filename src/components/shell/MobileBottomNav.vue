<template>
  <q-footer class="mobile-bottom-nav">
    <nav class="mobile-bottom-nav__inner" aria-label="Mobil ana navigasyon">
      <RouterLink v-for="item in navItems" :key="item.to" :to="item.to" class="mobile-nav-item">
        <span v-if="item.primary" class="mobile-nav-item__primary">
          <q-icon :name="item.icon" size="24px" />
        </span>
        <q-icon v-else :name="item.icon" size="24px" />
        <span class="mobile-nav-item__label">{{ item.label }}</span>
      </RouterLink>
    </nav>
  </q-footer>
</template>

<script setup>
const navItems = [
  { label: 'Ana Sayfa', icon: 'home', to: '/home' },
  { label: 'Keşfet', icon: 'explore', to: '/discover' },
  { label: 'Oluştur', icon: 'add', to: '/create', primary: true },
  { label: 'Bildirimler', icon: 'notifications_none', to: '/notifications' },
  { label: 'Profil', icon: 'person_outline', to: '/profile' },
]
</script>

<style scoped>
.mobile-bottom-nav {
  display: none;
  color: var(--ns-text-secondary);
  background: var(--ns-surface);
  border-top: 1px solid var(--ns-border);
  box-shadow: none;
}

.mobile-bottom-nav__inner {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  min-height: calc(var(--mobile-nav-height) + env(safe-area-inset-bottom));
  padding: var(--space-1) var(--space-1) env(safe-area-inset-bottom);
}

.mobile-nav-item {
  display: flex;
  min-width: 0;
  min-height: 52px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 2px;
  color: var(--ns-text-secondary);
  text-decoration: none;
  border-radius: var(--radius-sm);
}

.mobile-nav-item.router-link-active {
  color: var(--ns-brand);
}

.mobile-nav-item__label {
  max-width: 100%;
  overflow: hidden;
  font-size: 0.625rem;
  font-weight: 600;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.mobile-nav-item__primary {
  display: grid;
  width: 34px;
  height: 30px;
  color: white;
  background: var(--ns-brand);
  border-radius: var(--radius-sm);
  place-items: center;
}

@media (max-width: 959px) {
  .mobile-bottom-nav {
    display: block;
  }
}
</style>
