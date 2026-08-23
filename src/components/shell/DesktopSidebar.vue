<template>
  <aside class="desktop-sidebar" aria-label="Ana navigasyon">
    <RouterLink class="brand-link" to="/home" aria-label="NSosyal ana sayfa">
      <img src="/brand/nsosyal-logo.png" alt="NSosyal" width="72" height="72" />
      <span>BETA</span>
    </RouterLink>

    <nav class="desktop-nav">
      <RouterLink
        v-for="item in navItems"
        :key="item.label"
        :to="item.to"
        class="desktop-nav__item"
        active-class=""
        exact-active-class=""
        :class="{ 'desktop-nav__item--active': isItemActive(item) }"
      >
        <span class="desktop-nav__icon">
          <q-icon :name="item.icon" size="25px" />
          <q-badge v-if="item.badge" rounded color="primary" floating :label="item.badge" />
        </span>
        <span>{{ item.label }}</span>
      </RouterLink>
    </nav>

    <q-btn
      unelevated
      no-caps
      icon="draw"
      label="Yeni Gönderi"
      to="/compose"
      class="create-button"
    />
  </aside>
</template>

<script setup>
import { useRoute } from 'vue-router'

const navItems = [
  { label: 'Ana Sayfa', icon: 'home', to: '/home' },
  { label: 'Bildirimler', icon: 'notifications_none', to: '/notifications', badge: '92' },
  { label: 'Mesajlar', icon: 'chat_bubble_outline', to: '/return?mode=returning' },
  { label: 'Keşfet', icon: 'explore', to: '/discover' },
  { label: 'Nod Oyna', icon: 'pets', to: '/campaign' },
  { label: 'Topluluklar', icon: 'star_outline', to: '/discover?tab=weekly' },
  { label: 'Kaydedilenler', icon: 'bookmark_border', to: '/discover?tab=overlooked' },
  { label: 'Beğeniler', icon: 'rocket_launch', to: '/home?filter=liked' },
  { label: 'Ayarlar', icon: 'tune', to: '/settings' },
  { label: 'TEKNOFEST Kayıt', icon: 'qr_code_scanner', to: '/campaign?source=register' },
]

const route = useRoute()

function isItemActive(item) {
  return route.fullPath === item.to
}
</script>

<style scoped>
.desktop-sidebar {
  position: sticky;
  top: 0;
  display: flex;
  height: 100dvh;
  flex-direction: column;
  gap: 18px;
  padding: 30px 8px 4px;
  overflow-y: auto;
  background: var(--ns-bg);
  border-right: 1px solid var(--ns-border-strong);
  scrollbar-width: thin;
}

.brand-link {
  display: grid;
  width: 96px;
  min-height: 124px;
  place-items: center;
  align-content: start;
  gap: 0;
  padding-top: 2px;
  margin-left: 8px;
  color: var(--ns-text);
  text-decoration: none;
}

.brand-link img {
  display: block;
  width: 72px;
  height: 72px;
  object-fit: contain;
}

.brand-link span {
  margin-top: -1px;
  font-size: 0.76rem;
  letter-spacing: 0.28em;
  text-indent: 0.28em;
}

.desktop-nav {
  display: grid;
  gap: 2px;
  padding-left: 16px;
}

.desktop-nav__item {
  display: grid;
  grid-template-columns: 46px minmax(0, 1fr);
  min-height: 52px;
  align-items: center;
  gap: 8px;
  padding: 0 14px;
  color: var(--ns-text);
  font-size: 1rem;
  font-weight: 500;
  text-decoration: none;
  border-radius: var(--radius-round);
  transition:
    color var(--motion-fast) var(--ease-standard),
    background var(--motion-fast) var(--ease-standard);
}

.desktop-nav__icon {
  position: relative;
  display: grid;
  width: 42px;
  height: 42px;
  place-items: center;
  border-radius: 50%;
}

.desktop-nav__icon :deep(.q-badge) {
  top: 1px;
  right: -2px;
  min-width: 24px;
  min-height: 20px;
  padding: 2px 5px;
  font-size: 0.64rem;
  font-weight: 700;
}

.desktop-nav__item:hover {
  background: var(--ns-surface-hover);
}

.desktop-nav__item--active {
  font-weight: 700;
  background: var(--ns-nav-active);
}

.desktop-nav__item--active .desktop-nav__icon {
  color: var(--ns-brand);
  background: var(--ns-brand-soft);
}

.create-button {
  width: calc(100% - 16px);
  min-height: 46px;
  flex: 0 0 auto;
  margin-top: auto;
  margin-left: 16px;
  color: white;
  font-size: 0.93rem;
  font-weight: 650;
  background: linear-gradient(100deg, var(--ns-cyan), #3155ff);
  border-radius: var(--radius-round);
  box-shadow: 0 5px 12px rgb(35 94 220 / 18%);
}

@media (max-width: 1399px) {
  .desktop-sidebar {
    align-items: center;
    padding-inline: 10px;
  }

  .brand-link {
    width: 64px;
    min-height: 86px;
    margin-left: 0;
  }

  .brand-link img {
    width: 52px;
    height: 52px;
  }

  .brand-link span {
    font-size: 0.58rem;
  }

  .desktop-nav__item {
    display: grid;
    width: 54px;
    grid-template-columns: 1fr;
    padding: 0;
  }

  .desktop-nav {
    padding-left: 0;
  }

  .desktop-nav__item > span:last-child,
  .create-button :deep(.q-btn__content span) {
    display: none;
  }

  .desktop-nav__icon {
    margin: auto;
  }

  .create-button {
    width: 52px;
    padding: 0;
    margin-left: 0;
  }
}

@media (max-width: 959px) {
  .desktop-sidebar {
    display: none;
  }
}
</style>
