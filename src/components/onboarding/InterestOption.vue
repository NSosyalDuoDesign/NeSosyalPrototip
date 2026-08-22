<template>
  <button
    type="button"
    class="interest-option"
    :class="{ 'interest-option--selected': selected }"
    :aria-pressed="selected"
    @click="$emit('toggle', interest.id)"
  >
    <q-icon :name="interest.iconKey" size="22px" aria-hidden="true" />
    <span class="interest-option__copy">
      <span class="interest-option__label">{{ interest.label }}</span>
      <span class="interest-option__description">{{ interest.description }}</span>
    </span>
    <q-icon
      class="interest-option__state"
      :name="selected ? 'check_circle' : 'add_circle_outline'"
      size="20px"
      aria-hidden="true"
    />
  </button>
</template>

<script setup>
defineProps({
  interest: {
    type: Object,
    required: true,
  },
  selected: {
    type: Boolean,
    default: false,
  },
})

defineEmits(['toggle'])
</script>

<style scoped>
.interest-option {
  display: grid;
  grid-template-columns: 24px minmax(0, 1fr) 20px;
  gap: 12px;
  align-items: start;
  min-height: 88px;
  padding: 16px;
  color: var(--ns-text, #15171a);
  text-align: left;
  background: var(--ns-surface, #fff);
  border: 1px solid var(--ns-border, #e6e9ed);
  border-radius: var(--radius-md, 12px);
  cursor: pointer;
  transition:
    border-color 160ms cubic-bezier(0.2, 0, 0, 1),
    background-color 160ms cubic-bezier(0.2, 0, 0, 1),
    transform 160ms cubic-bezier(0.2, 0, 0, 1);
}

.interest-option:hover {
  background: var(--ns-surface-hover, #f4f6f8);
}

.interest-option:active {
  transform: scale(0.985);
}

.interest-option:focus-visible {
  outline: 3px solid rgb(22 135 248 / 18%);
  outline-offset: 2px;
}

.interest-option--selected {
  color: var(--ns-brand, #1687f8);
  background: var(--ns-brand-soft, #eaf4ff);
  border-color: var(--ns-brand, #1687f8);
}

.interest-option__copy {
  display: grid;
  gap: 4px;
  min-width: 0;
}

.interest-option__label {
  font-size: 14px;
  font-weight: 700;
  line-height: 1.3;
}

.interest-option__description {
  color: var(--ns-text-secondary, #5f6670);
  font-size: 12px;
  line-height: 1.4;
}

.interest-option__state {
  margin-top: 1px;
}

@media (prefers-reduced-motion: reduce) {
  .interest-option {
    transition: none;
  }
}
</style>
