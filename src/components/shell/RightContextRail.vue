<template>
  <aside class="right-context" aria-label="Arama, profil ve popüler gündem">
    <div class="right-context__tools">
      <q-input
        v-model="search"
        dense
        outlined
        rounded
        placeholder="Arama yap"
        aria-label="NSosyal'de ara"
        class="context-search"
      >
        <template #prepend><q-icon name="search" /></template>
        <template v-if="search" #append>
          <q-icon
            name="close"
            class="cursor-pointer"
            role="button"
            aria-label="Aramayı temizle"
            @click="search = ''"
          />
        </template>
      </q-input>
      <ProfileMenu />
    </div>

    <section class="popular-panel" aria-labelledby="popular-title">
      <header>
        <h2 id="popular-title">Popüler</h2>
        <RouterLink to="/discover">Tümünü gör <q-icon name="chevron_right" /></RouterLink>
      </header>

      <ol>
        <li v-for="trend in trends" :key="trend.label">
          <q-icon name="tag" aria-hidden="true" />
          <RouterLink :to="trend.to">
            <strong>{{ trend.label }}</strong>
            <span>{{ trend.count }}</span>
          </RouterLink>
        </li>
      </ol>
    </section>

    <RouterLink to="/return?mode=returning" class="message-dock">
      <q-icon name="chat_bubble_outline" size="24px" />
      <strong>Mesajlar</strong>
      <q-icon name="keyboard_arrow_up" size="21px" />
      <q-icon name="edit_square" size="26px" class="message-dock__compose" />
    </RouterLink>
  </aside>
</template>

<script setup>
import { ref } from 'vue'
import ProfileMenu from '@/components/shell/ProfileMenu.vue'

const search = ref('')

const trends = [
  { label: 'TeknofestMaviVatan', count: '982 gönderi', to: '/discover?tab=daily' },
  { label: 'SAKARYA', count: '243 gönderi', to: '/discover?tab=daily' },
  { label: 'TEKNOFEST', count: '642 gönderi', to: '/campaign' },
  { label: 'MustafaKemalAtatürk', count: '212 gönderi', to: '/discover?tab=weekly' },
  { label: 'türkiye', count: '1,9B gönderi', to: '/discover?tab=weekly' },
]
</script>

<style scoped>
.right-context {
  position: sticky;
  top: 0;
  display: grid;
  height: 100dvh;
  align-content: start;
  gap: 42px;
  padding: 40px 12px 24px;
  background: var(--ns-bg);
}

.right-context__tools {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 66px;
  align-items: center;
  gap: 4px;
}

.context-search :deep(.q-field__control) {
  height: 50px;
  color: var(--ns-brand);
  background: var(--ns-bg) !important;
  border-radius: var(--radius-round);
}

.context-search :deep(.q-field__native),
.context-search :deep(.q-field__prepend),
.context-search :deep(.q-field__append) {
  color: var(--ns-text-secondary);
}

.context-search :deep(.q-field__native) {
  font-size: 1rem;
}

.context-search :deep(.q-field__control::before) {
  border-color: color-mix(in srgb, var(--ns-brand) 70%, var(--ns-cyan));
}

.context-search :deep(.q-field__control:hover::before) {
  border-color: var(--ns-brand);
}

.popular-panel {
  padding: 26px 30px 20px;
  background: var(--ns-surface);
  border: 1px solid var(--ns-border);
  border-radius: 18px;
}

.popular-panel header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 20px;
}

.popular-panel h2 {
  margin: 0;
  color: var(--ns-text);
  font-size: 1.12rem;
}

.popular-panel header a {
  display: inline-flex;
  align-items: center;
  color: var(--ns-text-secondary);
  font-size: 0.78rem;
  text-decoration: none;
  white-space: nowrap;
}

.popular-panel ol {
  padding: 0;
  margin: 0;
  list-style: none;
}

.popular-panel li {
  display: grid;
  grid-template-columns: 34px minmax(0, 1fr);
  gap: 8px;
  align-items: center;
  min-height: 76px;
  border-bottom: 1px solid var(--ns-border);
}

.popular-panel li:last-child {
  border-bottom: 0;
}

.popular-panel li > .q-icon {
  color: var(--ns-brand);
  font-size: 30px;
}

.popular-panel li a {
  display: grid;
  min-width: 0;
  color: var(--ns-text);
  text-decoration: none;
}

.popular-panel strong,
.popular-panel span {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.popular-panel strong {
  font-size: 0.92rem;
}

.popular-panel span {
  margin-top: 3px;
  color: var(--ns-text-tertiary);
  font-size: 0.85rem;
}

.message-dock {
  position: fixed;
  right: max(12px, calc((100vw - var(--app-max-width)) / 2 + 12px));
  bottom: 0;
  display: grid;
  grid-template-columns: auto 1fr auto auto;
  width: 360px;
  min-height: 66px;
  align-items: center;
  gap: 10px;
  padding: 0 18px;
  color: var(--ns-text);
  text-decoration: none;
  background: var(--ns-surface);
  border: 1px solid var(--ns-border);
  border-bottom: 0;
  border-radius: 18px 18px 0 0;
  box-shadow: 0 -5px 24px rgb(12 26 45 / 6%);
}

.message-dock__compose {
  margin-left: auto;
  color: var(--ns-brand);
}

@media (max-width: 1699px) {
  .right-context {
    padding-left: 20px;
  }

  .popular-panel {
    padding-inline: 22px;
  }

  .message-dock {
    width: 330px;
  }
}

@media (max-width: 1199px) {
  .right-context {
    display: none;
  }
}
</style>
