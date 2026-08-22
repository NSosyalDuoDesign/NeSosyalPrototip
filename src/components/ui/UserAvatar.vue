<template>
  <q-avatar
    :size="size"
    :class="['user-avatar', `user-avatar--${tone}`]"
    :aria-label="`${name} profil görseli`"
  >
    {{ initials }}
  </q-avatar>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  name: { type: String, required: true },
  size: { type: String, default: '44px' },
  tone: { type: String, default: 'blue' },
})

const initials = computed(() =>
  props.name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toLocaleUpperCase('tr-TR'),
)
</script>

<style scoped>
.user-avatar {
  color: var(--ns-brand);
  font-size: 0.75rem;
  font-weight: 750;
  background: var(--ns-brand-soft);
  border: 1px solid color-mix(in srgb, var(--ns-brand) 28%, var(--ns-border));
}

.user-avatar--cyan {
  color: #087f94;
  background: #e5f9fc;
  border-color: #bcecf4;
}

.user-avatar--violet {
  color: var(--ns-violet);
  background: #f0efff;
  border-color: #d9d5ff;
}
</style>
