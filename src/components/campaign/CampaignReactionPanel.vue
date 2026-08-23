<template>
  <section class="campaign-reaction" aria-labelledby="campaign-reaction-title">
    <header class="campaign-reaction__heading">
      <div>
        <span>{{ member ? 'Sen ne düşünüyorsun?' : 'Önce sen söyle' }}</span>
        <h2 id="campaign-reaction-title">{{ context.reaction.question }}</h2>
      </div>
      <q-icon name="how_to_vote" aria-hidden="true" />
    </header>

    <p class="campaign-reaction__helper">{{ context.reaction.helper }}</p>

    <div class="campaign-reaction__options" role="group" aria-label="Görüş seçenekleri">
      <button
        v-for="option in context.reaction.options"
        :key="option.id"
        type="button"
        class="campaign-reaction__option"
        :class="{ 'campaign-reaction__option--selected': selectedOptionId === option.id }"
        :aria-pressed="selectedOptionId === option.id"
        @click="$emit('select', option.id)"
      >
        <q-icon
          :name="selectedOptionId === option.id ? 'check_circle' : 'radio_button_unchecked'"
          aria-hidden="true"
        />
        <span>{{ option.label }}</span>
      </button>
    </div>

    <Transition name="campaign-reveal">
      <div v-if="showResults" class="campaign-pulse" aria-live="polite">
        <header>
          <div>
            <span>Topluluk ne diyor?</span>
            <strong>{{ context.pulse.participantCount }} kişi yanıtladı</strong>
          </div>
          <span class="campaign-pulse__delta">Son 10 dk. {{ context.pulse.recentDelta }}</span>
        </header>

        <div class="campaign-pulse__distribution" aria-label="Topluluk yanıt dağılımı">
          <div v-for="option in context.reaction.options" :key="option.id">
            <div>
              <span>
                {{ option.shortLabel }}
                <small v-if="selectedOptionId === option.id">Senin seçimin</small>
              </span>
              <strong>%{{ option.percentage }}</strong>
            </div>
            <span class="campaign-pulse__track" aria-hidden="true">
              <span :style="{ width: `${option.percentage}%` }" />
            </span>
          </div>
        </div>

        <p><q-icon name="groups" aria-hidden="true" /> {{ context.pulse.summary }}</p>
        <small>{{ context.pulse.nuance }}</small>
      </div>
    </Transition>
  </section>
</template>

<script setup>
defineProps({
  context: { type: Object, required: true },
  selectedOptionId: { type: String, default: null },
  showResults: { type: Boolean, default: false },
  member: { type: Boolean, default: false },
})

defineEmits(['select'])
</script>

<style scoped>
.campaign-reaction {
  padding: clamp(20px, 4vw, 32px);
  color: var(--ns-text);
  background: var(--ns-surface);
  border: 1px solid var(--ns-border);
  border-radius: var(--radius-lg);
}

.campaign-reaction__heading,
.campaign-reaction__heading > div,
.campaign-pulse header,
.campaign-pulse header > div {
  display: flex;
}

.campaign-reaction__heading {
  gap: 20px;
  align-items: flex-start;
  justify-content: space-between;
}

.campaign-reaction__heading > div,
.campaign-pulse header > div {
  flex-direction: column;
}

.campaign-reaction__heading span,
.campaign-pulse header span {
  color: var(--ns-brand);
  font-size: 11px;
  font-weight: 750;
}

.campaign-reaction__heading h2 {
  max-width: 620px;
  margin: 5px 0 0;
  font-size: clamp(20px, 4vw, 28px);
  line-height: 1.25;
}

.campaign-reaction__heading > .q-icon {
  flex: 0 0 auto;
  color: var(--ns-brand);
  font-size: 28px;
}

.campaign-reaction__helper {
  margin: 10px 0 0;
  color: var(--ns-text-secondary);
  font-size: 13px;
  line-height: 1.5;
}

.campaign-reaction__options {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
  margin-top: 22px;
}

.campaign-reaction__option {
  display: flex;
  gap: 9px;
  align-items: center;
  min-height: 56px;
  padding: 10px 12px;
  color: var(--ns-text);
  font: inherit;
  font-size: 13px;
  font-weight: 650;
  text-align: left;
  background: var(--ns-bg);
  border: 1px solid var(--ns-border);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition:
    border-color var(--motion-fast) var(--ease-standard),
    background-color var(--motion-fast) var(--ease-standard),
    transform var(--motion-fast) var(--ease-standard);
}

.campaign-reaction__option:hover {
  background: var(--ns-surface-hover);
  border-color: var(--ns-border-strong);
}

.campaign-reaction__option:active {
  transform: scale(0.98);
}

.campaign-reaction__option .q-icon {
  flex: 0 0 auto;
  color: var(--ns-text-tertiary);
  font-size: 20px;
}

.campaign-reaction__option--selected {
  color: var(--ns-brand);
  background: var(--ns-brand-soft);
  border-color: var(--ns-brand);
}

.campaign-reaction__option--selected .q-icon {
  color: var(--ns-brand);
}

.campaign-pulse {
  padding-top: 26px;
  margin-top: 26px;
  border-top: 1px solid var(--ns-border);
}

.campaign-pulse header {
  gap: 16px;
  align-items: center;
  justify-content: space-between;
}

.campaign-pulse header strong {
  margin-top: 3px;
  font-size: 16px;
}

.campaign-pulse__delta {
  color: var(--ns-text-secondary) !important;
  font-weight: 650;
}

.campaign-pulse__distribution {
  display: grid;
  gap: 14px;
  margin-top: 20px;
}

.campaign-pulse__distribution > div > div {
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 7px;
}

.campaign-pulse__distribution span {
  color: var(--ns-text-secondary);
  font-size: 12px;
  font-weight: 650;
}

.campaign-pulse__distribution small {
  margin-left: 6px;
  color: var(--ns-brand);
  font-size: 10px;
}

.campaign-pulse__distribution strong {
  font-size: 13px;
}

.campaign-pulse__track {
  display: block;
  height: 8px;
  overflow: hidden;
  background: var(--ns-surface-hover);
  border: 1px solid var(--ns-border);
  border-radius: var(--radius-round);
}

.campaign-pulse__track > span {
  display: block;
  height: 100%;
  background: var(--ns-brand);
  border-radius: inherit;
  transition: width var(--motion-slow) var(--ease-standard);
}

.campaign-pulse > p {
  display: flex;
  gap: 8px;
  align-items: flex-start;
  margin: 22px 0 0;
  font-size: 14px;
  font-weight: 650;
  line-height: 1.5;
}

.campaign-pulse > p .q-icon {
  flex: 0 0 auto;
  margin-top: 2px;
  color: var(--ns-brand);
  font-size: 19px;
}

.campaign-pulse > small {
  display: block;
  margin-top: 7px;
  color: var(--ns-text-secondary);
  font-size: 12px;
  line-height: 1.5;
}

.campaign-reveal-enter-active,
.campaign-reveal-leave-active {
  transition:
    opacity var(--motion-base) var(--ease-standard),
    transform var(--motion-base) var(--ease-standard);
}

.campaign-reveal-enter-from,
.campaign-reveal-leave-to {
  opacity: 0;
  transform: translateY(8px);
}

@media (max-width: 680px) {
  .campaign-reaction__options {
    grid-template-columns: minmax(0, 1fr);
  }

  .campaign-reaction__option {
    min-height: 52px;
  }
}

@media (max-width: 420px) {
  .campaign-pulse header {
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>
