<template>
  <header class="page-section-header">
    <div>
      <h1>{{ title }}</h1>
      <p v-if="description">{{ description }}</p>
    </div>
    <slot name="actions" />
  </header>
</template>

<script setup>
defineProps({
  title: { type: String, required: true },
  description: { type: String, default: '' },
})
</script>

<style scoped>
.page-section-header {
  display: flex;
  min-height: 64px;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
  padding: var(--space-3) var(--page-gutter);
  background: var(--ns-surface);
  border-bottom: 1px solid var(--ns-border);
}

.page-section-header h1 {
  margin: 0;
  color: var(--ns-text);
  font-size: 1.25rem;
  line-height: 1.2;
}

.page-section-header p {
  margin: var(--space-1) 0 0;
  color: var(--ns-text-secondary);
  font-size: 0.75rem;
}
</style>
