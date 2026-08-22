<template>
  <section class="surface-panel">
    <h2>{{ title }}</h2>
    <slot />
  </section>
</template>

<script setup>
defineProps({
  title: { type: String, required: true },
})
</script>

<style scoped>
.surface-panel {
  padding: var(--space-4);
  background: var(--ns-surface);
  border: 1px solid var(--ns-border);
  border-radius: var(--radius-lg);
}

.surface-panel h2 {
  margin: 0 0 var(--space-2);
  color: var(--ns-text);
  font-size: 1rem;
  line-height: 1.3;
}
</style>
