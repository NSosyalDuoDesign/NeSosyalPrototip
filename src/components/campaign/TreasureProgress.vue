<template>
  <div
    class="treasure-progress"
    :aria-label="`Hazine avında ${completed} / ${total} adım tamamlandı`"
  >
    <q-circular-progress
      show-value
      :value="percentage"
      size="72px"
      :thickness="0.12"
      color="primary"
      track-color="blue-grey-9"
      class="treasure-progress__ring"
    >
      <span>{{ completed }}/{{ total }}</span>
    </q-circular-progress>
    <div>
      <strong>{{ label }}</strong>
      <span>{{
        completed === total ? 'Tüm kodlar bulundu' : `${total - completed} keşif daha var`
      }}</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  completed: { type: Number, required: true },
  total: { type: Number, required: true },
  label: { type: String, default: 'Keşif ilerlemesi' },
})

const percentage = computed(() => (props.total > 0 ? (props.completed / props.total) * 100 : 0))
</script>

<style scoped>
.treasure-progress {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  color: #f4f7fb;
}

.treasure-progress__ring {
  flex: 0 0 auto;
}

.treasure-progress__ring span {
  font-size: 0.875rem;
  font-weight: 750;
}

.treasure-progress > div:last-child {
  display: grid;
  gap: var(--space-1);
}

.treasure-progress strong {
  font-size: 0.9375rem;
}

.treasure-progress > div:last-child span {
  color: #aeb9c7;
  font-size: 0.8125rem;
}
</style>
