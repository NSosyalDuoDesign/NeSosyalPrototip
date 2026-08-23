<template>
  <q-page class="experience-page">
    <main class="experience-shell">
      <header class="experience-intro">
        <span>Görünüm ve kullanım</span>
        <h1>Deneyimini kendine göre ayarla</h1>
        <p>
          İçerik aynı kalır; yazı boyutu, akış yoğunluğu, açıklamalar ve hareket miktarı seçimine
          göre değişir.
        </p>
      </header>

      <div class="experience-layout">
        <section class="preset-panel" aria-labelledby="preset-title">
          <div class="preset-panel__heading">
            <div>
              <span>Deneyim tercihi</span>
              <h2 id="preset-title">Sana uygun görünümü seç</h2>
            </div>
            <span v-if="hasPendingChange" class="pending-label">Önizleniyor</span>
          </div>

          <div class="preset-options" role="radiogroup" aria-label="Deneyim görünümü">
            <button
              v-for="option in presetOptions"
              :key="option.id"
              type="button"
              class="preset-option"
              :class="{ 'preset-option--selected': draftPreset === option.id }"
              role="radio"
              :aria-checked="draftPreset === option.id"
              @click="draftPreset = option.id"
            >
              <span class="preset-option__icon"><q-icon :name="option.icon" /></span>
              <span class="preset-option__body">
                <strong>{{ option.label }}</strong>
                <small>{{ option.description }}</small>
                <span>{{ option.summary }}</span>
              </span>
              <q-icon
                :name="
                  draftPreset === option.id ? 'radio_button_checked' : 'radio_button_unchecked'
                "
                aria-hidden="true"
              />
            </button>
          </div>

          <div class="preset-actions">
            <p aria-live="polite">
              {{
                hasPendingChange
                  ? `${selectedOption.label} görünümü önizlemede. Uyguladığında tüm sayfalarda kullanılacak.`
                  : `${selectedOption.label} görünümü şu anda tüm sayfalarda etkin.`
              }}
            </p>
            <q-btn
              unelevated
              no-caps
              color="primary"
              label="Görünümü uygula"
              :disable="!hasPendingChange"
              @click="applyPreset"
            />
          </div>
        </section>

        <ExperiencePreview :preset="draftPreset" :preset-label="selectedOption.label" />
      </div>

      <section class="motion-note">
        <q-icon name="accessibility_new" size="24px" aria-hidden="true" />
        <div>
          <strong>Hareket azaltma tercihin her zaman öncelikli</strong>
          <span>
            Cihazında “hareketi azalt” açıksa geçiş ve animasyonlar seçtiğin görünümden bağımsız
            olarak en aza iner.
          </span>
        </div>
      </section>
    </main>
  </q-page>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import ExperiencePreview from '@/components/settings/ExperiencePreview.vue'
import { usePrototypeStore } from '@/stores/prototype.js'

const store = usePrototypeStore()
const draftPreset = ref(store.user.experiencePreset)

const presetOptions = Object.freeze([
  {
    id: 'fluid',
    label: 'Akışkan',
    icon: 'speed',
    description: 'Daha sıkı, daha hızlı taranan akış',
    summary: 'Kompakt boşluklar · kısa etiketler · küçük medya',
  },
  {
    id: 'balanced',
    label: 'Dengeli',
    icon: 'view_stream',
    description: 'Okunabilirlik ve yoğunluk arasında denge',
    summary: 'Standart yazı · dengeli boşluk · ölçülü hareket',
  },
  {
    id: 'comfortable',
    label: 'Rahat',
    icon: 'format_size',
    description: 'Daha büyük yazı ve daha geniş dokunma alanları',
    summary: 'Büyük yazı · ferah boşluk · açık eylem etiketleri',
  },
])

const selectedOption = computed(
  () => presetOptions.find((option) => option.id === draftPreset.value) ?? presetOptions[1],
)
const hasPendingChange = computed(() => draftPreset.value !== store.user.experiencePreset)

watch(
  () => store.user.experiencePreset,
  (preset) => {
    if (!hasPendingChange.value) draftPreset.value = preset
  },
)

function applyPreset() {
  store.setExperiencePreset(draftPreset.value)
}
</script>

<style scoped>
.experience-page {
  color: var(--ns-text);
  background: var(--ns-bg-subtle);
}

.experience-shell {
  display: grid;
  gap: 24px;
  width: 100%;
  padding: 32px 20px 72px;
}

.experience-intro,
.preset-panel,
.preset-panel__heading > div,
.preset-option__body,
.motion-note > div {
  display: grid;
}

.experience-intro {
  gap: 7px;
}

.experience-intro > span,
.preset-panel__heading > div > span {
  color: var(--ns-brand);
  font-size: 11px;
  font-weight: 700;
}

.experience-intro h1,
.experience-intro p,
.preset-panel h2,
.preset-actions p {
  margin: 0;
}

.experience-intro h1 {
  font-size: clamp(24px, 5vw, 30px);
  line-height: 1.2;
}

.experience-intro p {
  color: var(--ns-text-secondary);
  font-size: 14px;
  line-height: 1.55;
}

.experience-layout {
  display: grid;
  gap: 18px;
}

.preset-panel {
  gap: 16px;
  padding: 20px;
  background: var(--ns-surface);
  border: 1px solid var(--ns-border);
  border-radius: var(--radius-lg);
}

.preset-panel__heading,
.preset-actions,
.motion-note {
  display: flex;
  gap: 16px;
  align-items: center;
  justify-content: space-between;
}

.preset-panel__heading > div {
  gap: 3px;
}

.preset-panel h2 {
  font-size: 18px;
}

.pending-label {
  color: var(--ns-brand);
  font-size: 11px;
  font-weight: 700;
}

.preset-options {
  display: grid;
  gap: 8px;
}

.preset-option {
  display: grid;
  grid-template-columns: 42px minmax(0, 1fr) 24px;
  gap: 12px;
  align-items: center;
  min-height: 92px;
  padding: 14px;
  color: var(--ns-text);
  font: inherit;
  text-align: left;
  background: var(--ns-surface);
  border: 1px solid var(--ns-border);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition:
    border-color var(--motion-fast) var(--ease-standard),
    background var(--motion-fast) var(--ease-standard);
}

.preset-option:hover {
  background: var(--ns-surface-hover);
}

.preset-option--selected {
  background: var(--ns-brand-soft);
  border-color: var(--ns-brand);
}

.preset-option__icon {
  display: grid;
  width: 42px;
  height: 42px;
  color: var(--ns-brand);
  background: var(--ns-brand-soft);
  border-radius: 10px;
  place-items: center;
}

.preset-option__body {
  gap: 3px;
  min-width: 0;
}

.preset-option__body strong {
  font-size: 14px;
}

.preset-option__body small,
.preset-option__body span,
.preset-actions p,
.motion-note span {
  color: var(--ns-text-secondary);
  line-height: 1.4;
}

.preset-option__body small {
  font-size: 12px;
}

.preset-option__body span {
  font-size: 10px;
}

.preset-option > .q-icon {
  color: var(--ns-brand);
}

.preset-actions {
  align-items: flex-end;
  padding-top: 4px;
}

.preset-actions p {
  max-width: 350px;
  font-size: 11px;
}

.preset-actions .q-btn {
  flex: 0 0 auto;
  min-height: 44px;
}

.motion-note {
  justify-content: flex-start;
  padding: 16px;
  color: var(--ns-text-secondary);
  background: var(--ns-surface);
  border: 1px solid var(--ns-border);
  border-radius: var(--radius-md);
}

.motion-note > .q-icon {
  flex: 0 0 auto;
  color: var(--ns-brand);
}

.motion-note > div {
  gap: 3px;
}

.motion-note strong {
  color: var(--ns-text);
  font-size: 13px;
}

.motion-note span {
  font-size: 11px;
}

@media (max-width: 599px) {
  .experience-shell {
    gap: 18px;
    padding: 20px 12px 40px;
  }

  .preset-panel {
    padding: 16px;
  }

  .preset-actions {
    align-items: stretch;
    flex-direction: column;
  }

  .preset-actions .q-btn {
    width: 100%;
  }
}

@media (max-width: 380px) {
  .preset-option {
    grid-template-columns: 36px minmax(0, 1fr) 20px;
    gap: 10px;
    padding: 12px;
  }

  .preset-option__icon {
    width: 36px;
    height: 36px;
  }
}
</style>
