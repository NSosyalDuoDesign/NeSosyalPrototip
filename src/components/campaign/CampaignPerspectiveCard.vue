<template>
  <article class="campaign-perspective">
    <header>
      <UserAvatar :name="perspective.author" :tone="perspective.tone" size="42px" />
      <div>
        <strong>{{ perspective.author }}</strong>
        <span>{{ perspective.handle }}</span>
      </div>
      <span class="campaign-perspective__label">{{ perspective.label }}</span>
    </header>
    <p>{{ perspective.body }}</p>
    <footer>
      <span
        ><q-icon name="chat_bubble_outline" aria-hidden="true" /> {{ perspective.engagement }}</span
      >
      <button type="button" aria-label="Bu görüşe yanıt ver" @click="$emit('reply')">
        Yanıtla
      </button>
    </footer>
  </article>
</template>

<script setup>
import UserAvatar from '@/components/ui/UserAvatar.vue'

defineProps({
  perspective: { type: Object, required: true },
})

defineEmits(['reply'])
</script>

<style scoped>
.campaign-perspective {
  min-width: 0;
  padding: 18px;
  color: var(--ns-text);
  background: var(--ns-surface);
  border: 1px solid var(--ns-border);
  border-radius: var(--radius-md);
}

.campaign-perspective header,
.campaign-perspective footer,
.campaign-perspective footer > span {
  display: flex;
  align-items: center;
}

.campaign-perspective header {
  gap: 10px;
}

.campaign-perspective header > div {
  display: grid;
  min-width: 0;
  margin-right: auto;
}

.campaign-perspective header strong,
.campaign-perspective header span {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.campaign-perspective header strong {
  font-size: 13px;
}

.campaign-perspective header > div span {
  color: var(--ns-text-secondary);
  font-size: 11px;
}

.campaign-perspective__label {
  flex: 0 0 auto;
  max-width: 104px;
  padding: 5px 7px;
  color: var(--ns-brand);
  font-size: 9px;
  font-weight: 750;
  background: var(--ns-brand-soft);
  border-radius: var(--radius-xs);
}

.campaign-perspective > p {
  min-height: 66px;
  margin: 16px 0;
  font-size: 13px;
  line-height: 1.55;
}

.campaign-perspective footer {
  justify-content: space-between;
  gap: 12px;
  padding-top: 12px;
  color: var(--ns-text-secondary);
  font-size: 10px;
  border-top: 1px solid var(--ns-border);
}

.campaign-perspective footer > span {
  gap: 5px;
}

.campaign-perspective footer button {
  min-width: 56px;
  min-height: 36px;
  padding: 0 6px;
  color: var(--ns-brand);
  font: inherit;
  font-weight: 700;
  background: transparent;
  border: 0;
  border-radius: var(--radius-sm);
  cursor: pointer;
}

.campaign-perspective footer button:hover {
  background: var(--ns-brand-soft);
}

@media (max-width: 380px) {
  .campaign-perspective__label {
    display: none;
  }
}
</style>
