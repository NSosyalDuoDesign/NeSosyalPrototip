<template>
  <aside class="right-context" aria-label="Gündem ve öneriler">
    <q-input
      v-model="search"
      dense
      standout
      placeholder="NSosyal'de ara"
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

    <SurfacePanel title="Bugün konuşulanlar">
      <ol class="trend-list">
        <li v-for="trend in trends" :key="trend.label">
          <span>{{ trend.context }}</span>
          <strong>{{ trend.label }}</strong>
          <small>{{ trend.count }}</small>
        </li>
      </ol>
      <RouterLink class="panel-link" to="/discover">Tümünü keşfet</RouterLink>
    </SurfacePanel>

    <SurfacePanel title="Takip edebilirsin">
      <div v-for="person in suggestions" :key="person.handle" class="suggestion-row">
        <UserAvatar :name="person.name" :tone="person.tone" size="40px" />
        <div class="suggestion-row__identity">
          <strong>{{ person.name }}</strong>
          <span>{{ person.handle }}</span>
        </div>
        <q-btn outline no-caps label="Takip et" class="follow-button" />
      </div>
    </SurfacePanel>
  </aside>
</template>

<script setup>
import { ref } from 'vue'
import SurfacePanel from '@/components/ui/SurfacePanel.vue'
import UserAvatar from '@/components/ui/UserAvatar.vue'

const search = ref('')

const trends = [
  { context: 'Teknoloji · Gündem', label: 'Yerli girişimler', count: '1,8 B gönderi' },
  { context: 'Bilim · Bugün', label: 'Gökyüzü gözlemi', count: '864 gönderi' },
  { context: 'Kültür & Sanat', label: 'Şehirde bu hafta', count: '542 gönderi' },
]

const suggestions = [
  { name: 'Açık Bilim', handle: '@acikbilim', tone: 'violet' },
  { name: 'Oyun Atölyesi', handle: '@oyunatolyesi', tone: 'cyan' },
]
</script>

<style scoped>
.right-context {
  position: sticky;
  top: 0;
  display: grid;
  height: max-content;
  gap: var(--space-4);
  padding: var(--space-4) 0 var(--space-6) var(--space-4);
}

.context-search :deep(.q-field__control) {
  height: 44px;
  color: var(--ns-text);
  background: var(--ns-bg-subtle) !important;
  border-radius: var(--radius-md);
  box-shadow: none;
}

.trend-list {
  display: grid;
  gap: var(--space-1);
  margin: 0;
  padding: 0;
  list-style: none;
}

.trend-list li {
  display: grid;
  gap: 2px;
  padding: var(--space-3) 0;
  border-bottom: 1px solid var(--ns-border);
}

.trend-list li:last-child {
  border-bottom: 0;
}

.trend-list span,
.trend-list small,
.suggestion-row__identity span {
  color: var(--ns-text-secondary);
  font-size: 0.75rem;
}

.trend-list strong,
.suggestion-row__identity strong {
  color: var(--ns-text);
  font-size: 0.875rem;
}

.panel-link {
  display: inline-block;
  margin-top: var(--space-3);
  color: var(--ns-brand);
  font-size: 0.8125rem;
  font-weight: 600;
  text-decoration: none;
}

.suggestion-row {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) 0;
}

.suggestion-row__identity {
  display: grid;
  min-width: 0;
}

.suggestion-row__identity strong,
.suggestion-row__identity span {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.follow-button {
  min-height: 36px;
  padding-inline: var(--space-3);
  color: var(--ns-brand);
  border-radius: var(--radius-sm);
  font-size: 0.75rem;
}

@media (max-width: 1199px) {
  .right-context {
    display: none;
  }
}
</style>
