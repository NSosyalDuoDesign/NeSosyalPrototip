<template>
  <header
    class="campaign-context-hero"
    :class="[
      `campaign-context-hero--${context.accent}`,
      { 'campaign-context-hero--compact': compact },
    ]"
  >
    <div class="campaign-context-hero__copy">
      <div class="campaign-context-hero__source">
        <span><q-icon :name="context.icon" aria-hidden="true" /> {{ context.sourceType }}</span>
        <span class="campaign-context-hero__live"
          ><i aria-hidden="true" /> {{ context.sourceDetail }}</span
        >
      </div>

      <p class="campaign-context-hero__label">{{ context.sourceLabel }}</p>
      <h1>{{ context.headline }}</h1>
      <p class="campaign-context-hero__hook">{{ context.hook }}</p>

      <ul class="campaign-context-hero__tags" aria-label="Konuşma başlıkları">
        <li v-for="tag in context.tags" :key="tag">{{ tag }}</li>
      </ul>
    </div>

    <aside class="campaign-context-hero__moment" :aria-label="context.momentLabel">
      <div class="campaign-context-hero__moment-icon" aria-hidden="true">
        <q-icon :name="context.icon" />
      </div>
      <span>{{ context.momentLabel }}</span>
      <strong>{{ context.visualTitle }}</strong>
      <p>{{ context.visualDetail }}</p>
      <div class="campaign-context-hero__bridge">
        <q-icon name="qr_code_2" aria-hidden="true" />
        <span>Bu anın NSosyal konuşması</span>
      </div>
    </aside>
  </header>
</template>

<script setup>
defineProps({
  context: { type: Object, required: true },
  compact: { type: Boolean, default: false },
})
</script>

<style scoped>
.campaign-context-hero {
  --campaign-accent: var(--ns-brand);

  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(260px, 0.85fr);
  gap: clamp(24px, 5vw, 52px);
  align-items: stretch;
}

.campaign-context-hero--violet {
  --campaign-accent: var(--ns-violet);
}

.campaign-context-hero--cyan {
  --campaign-accent: var(--ns-cyan);
}

.campaign-context-hero__copy {
  align-self: center;
  min-width: 0;
}

.campaign-context-hero__source,
.campaign-context-hero__source > span,
.campaign-context-hero__tags,
.campaign-context-hero__bridge {
  display: flex;
  align-items: center;
}

.campaign-context-hero__source {
  flex-wrap: wrap;
  gap: 8px 16px;
  color: var(--ns-text-secondary);
  font-size: 12px;
  font-weight: 650;
}

.campaign-context-hero__source > span {
  gap: 7px;
}

.campaign-context-hero__source .q-icon {
  color: var(--campaign-accent);
  font-size: 19px;
}

.campaign-context-hero__live i {
  width: 7px;
  height: 7px;
  background: var(--ns-danger);
  border-radius: 50%;
  box-shadow: 0 0 0 4px color-mix(in srgb, var(--ns-danger) 14%, transparent);
}

.campaign-context-hero__label {
  margin: 22px 0 8px;
  color: var(--campaign-accent);
  font-size: 12px;
  font-weight: 750;
}

.campaign-context-hero h1 {
  max-width: 680px;
  margin: 0;
  color: var(--ns-text);
  font-size: clamp(30px, 6vw, 52px);
  line-height: 1.05;
  letter-spacing: -0.04em;
}

.campaign-context-hero__hook {
  max-width: 680px;
  margin: 18px 0 0;
  color: var(--ns-text-secondary);
  font-size: 15px;
  line-height: 1.65;
}

.campaign-context-hero__tags {
  flex-wrap: wrap;
  gap: 8px;
  padding: 0;
  margin: 22px 0 0;
  list-style: none;
}

.campaign-context-hero__tags li {
  padding: 7px 10px;
  color: var(--ns-text-secondary);
  font-size: 11px;
  font-weight: 650;
  background: var(--ns-surface-hover);
  border: 1px solid var(--ns-border);
  border-radius: var(--radius-sm);
}

.campaign-context-hero__moment {
  position: relative;
  display: grid;
  align-content: end;
  min-height: 340px;
  padding: 28px;
  overflow: hidden;
  color: var(--ns-text);
  background: var(--ns-surface);
  border: 1px solid var(--ns-border-strong);
  border-radius: var(--radius-xl);
}

.campaign-context-hero__moment::before {
  position: absolute;
  top: 0;
  right: 0;
  width: 150px;
  height: 150px;
  content: '';
  background: color-mix(in srgb, var(--campaign-accent) 12%, transparent);
  border-radius: 0 0 0 100%;
}

.campaign-context-hero__moment-icon {
  position: absolute;
  top: 26px;
  left: 28px;
  display: grid;
  width: 56px;
  height: 56px;
  color: var(--campaign-accent);
  background: color-mix(in srgb, var(--campaign-accent) 12%, var(--ns-surface));
  border-radius: var(--radius-md);
  place-items: center;
}

.campaign-context-hero__moment-icon .q-icon {
  font-size: 28px;
}

.campaign-context-hero__moment > span {
  color: var(--campaign-accent);
  font-size: 11px;
  font-weight: 750;
}

.campaign-context-hero__moment strong {
  margin-top: 6px;
  font-size: 21px;
  line-height: 1.25;
}

.campaign-context-hero__moment > p {
  margin: 8px 0 0;
  color: var(--ns-text-secondary);
  font-size: 13px;
  line-height: 1.5;
}

.campaign-context-hero__bridge {
  gap: 8px;
  padding-top: 16px;
  margin-top: 18px;
  color: var(--ns-text-secondary);
  font-size: 11px;
  font-weight: 650;
  border-top: 1px solid var(--ns-border);
}

.campaign-context-hero__bridge .q-icon {
  color: var(--campaign-accent);
  font-size: 20px;
}

.campaign-context-hero--compact {
  grid-template-columns: minmax(0, 1.35fr) minmax(240px, 0.65fr);
  gap: 24px;
}

.campaign-context-hero--compact h1 {
  font-size: clamp(27px, 4vw, 38px);
}

.campaign-context-hero--compact .campaign-context-hero__moment {
  min-height: 280px;
  padding: 22px;
}

@media (max-width: 720px) {
  .campaign-context-hero,
  .campaign-context-hero--compact {
    grid-template-columns: minmax(0, 1fr);
  }

  .campaign-context-hero h1,
  .campaign-context-hero--compact h1 {
    font-size: clamp(30px, 9vw, 42px);
  }

  .campaign-context-hero__moment,
  .campaign-context-hero--compact .campaign-context-hero__moment {
    min-height: 260px;
  }
}

@media (max-width: 380px) {
  .campaign-context-hero__moment {
    padding: 22px 18px;
  }

  .campaign-context-hero__moment-icon {
    left: 18px;
  }
}
</style>
