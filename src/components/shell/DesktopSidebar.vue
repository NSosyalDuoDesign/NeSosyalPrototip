<template>
  <aside class="desktop-sidebar" aria-label="Ana navigasyon">
    <RouterLink class="brand-link" to="/home" aria-label="NSosyal ana sayfa">
      <span class="brand-link__name">NSosyal</span>
      <span class="brand-link__project">Ne Sosyal? prototipi</span>
    </RouterLink>

    <nav class="desktop-nav">
      <RouterLink v-for="item in navItems" :key="item.to" :to="item.to" class="desktop-nav__item">
        <q-icon :name="item.icon" size="24px" />
        <span>{{ item.label }}</span>
      </RouterLink>
    </nav>

    <q-btn
      unelevated
      no-caps
      color="primary"
      icon="edit"
      label="Oluştur"
      to="/compose"
      class="create-button"
    />

    <RouterLink to="/profile" class="account-link">
      <UserAvatar :name="store.user.displayName" size="40px" />
      <span class="account-link__identity">
        <strong>{{ store.user.displayName }}</strong>
        <small>{{ store.user.handle }}</small>
      </span>
      <q-icon name="more_horiz" size="20px" />
    </RouterLink>
  </aside>
</template>

<script setup>
import UserAvatar from '@/components/ui/UserAvatar.vue'
import { usePrototypeStore } from '@/stores/prototype.js'

const store = usePrototypeStore()

const navItems = [
  { label: 'Ana Sayfa', icon: 'home', to: '/home' },
  { label: 'Keşfet', icon: 'explore', to: '/discover' },
  { label: 'Sen yokken', icon: 'history', to: '/return?mode=returning' },
  { label: 'Bildirimler', icon: 'notifications_none', to: '/notifications' },
  { label: 'Profil', icon: 'person_outline', to: '/profile' },
  { label: 'İlgi Alanlarım', icon: 'tune', to: '/onboarding' },
  { label: 'Demo', icon: 'smart_display', to: '/demo?demo=1' },
  { label: 'Ayarlar', icon: 'settings', to: '/settings' },
]
</script>

<style scoped>
.desktop-sidebar {
  position: sticky;
  top: 0;
  display: flex;
  height: 100dvh;
  flex-direction: column;
  gap: var(--space-4);
  padding: var(--space-5) var(--space-4) var(--space-4);
}

.brand-link {
  display: flex;
  min-height: 52px;
  flex-direction: column;
  justify-content: center;
  padding: 0 var(--space-3);
  color: var(--ns-text);
  text-decoration: none;
  border-radius: var(--radius-md);
}

.brand-link__name {
  font-size: 1.25rem;
  font-weight: 750;
  letter-spacing: -0.025em;
}

.brand-link__project {
  color: var(--ns-text-tertiary);
  font-size: 0.7rem;
  font-weight: 600;
}

.desktop-nav {
  display: grid;
  gap: var(--space-1);
}

.desktop-nav__item {
  display: flex;
  min-height: 48px;
  align-items: center;
  gap: var(--space-3);
  padding: 0 var(--space-3);
  color: var(--ns-text-secondary);
  font-weight: 600;
  text-decoration: none;
  border-radius: var(--radius-md);
  transition:
    color var(--motion-fast) var(--ease-standard),
    background var(--motion-fast) var(--ease-standard);
}

.desktop-nav__item:hover {
  color: var(--ns-text);
  background: var(--ns-surface-hover);
}

.desktop-nav__item.router-link-active {
  color: var(--ns-brand);
  background: var(--ns-brand-soft);
}

.create-button {
  min-height: 46px;
  border-radius: var(--radius-md);
  font-weight: 650;
}

.account-link {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  align-items: center;
  gap: var(--space-3);
  min-height: 64px;
  margin-top: auto;
  padding: var(--space-2);
  color: var(--ns-text);
  text-decoration: none;
  border-radius: var(--radius-md);
}

.account-link:hover {
  background: var(--ns-surface-hover);
}

.account-link__identity {
  display: grid;
  min-width: 0;
}

.account-link__identity strong,
.account-link__identity small {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.account-link__identity strong {
  font-size: 0.875rem;
}

.account-link__identity small {
  color: var(--ns-text-secondary);
}

@media (max-width: 1199px) {
  .desktop-sidebar {
    align-items: center;
    padding-inline: var(--space-2);
  }

  .brand-link {
    align-items: center;
    padding-inline: 0;
  }

  .brand-link__name {
    font-size: 1rem;
  }

  .brand-link__project,
  .desktop-nav__item span,
  .create-button :deep(.q-btn__content span),
  .account-link__identity,
  .account-link > .q-icon {
    display: none;
  }

  .desktop-nav__item {
    width: 48px;
    justify-content: center;
    padding: 0;
  }

  .create-button {
    width: 48px;
    padding: 0;
  }

  .account-link {
    display: flex;
    justify-content: center;
    padding: var(--space-1);
  }
}

@media (max-width: 959px) {
  .desktop-sidebar {
    display: none;
  }
}
</style>
