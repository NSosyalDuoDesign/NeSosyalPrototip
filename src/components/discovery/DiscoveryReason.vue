<template>
  <span class="discovery-reason">
    <q-icon :name="icon" size="15px" aria-hidden="true" />
    {{ text }}
  </span>
</template>

<script setup>
defineProps({
  text: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    default: 'auto_awesome',
  },
})
</script>

<style scoped>
.discovery-reason {
  display: inline-flex;
  gap: 6px;
  align-items: center;
  width: fit-content;
  color: var(--ns-brand, #1687f8);
  font-size: 12px;
  font-weight: 600;
  line-height: 1.3;
}
</style>
