<template>
  <div class="onboarding-page">
    <main class="onboarding-shell">
      <header class="onboarding-header">
        <div class="onboarding-brand">
          <span>NSosyal</span>
          <small>Kişiselleştirme</small>
        </div>
        <span class="onboarding-header__step">{{ step }} / 3</span>
      </header>

      <nav class="step-progress" aria-label="Tanışma adımları">
        <span
          v-for="item in steps"
          :key="item.id"
          class="step-progress__item"
          :class="{ 'step-progress__item--active': item.id <= step }"
        >
          <span class="step-progress__dot" aria-hidden="true"></span>
          <span class="step-progress__label">{{ item.label }}</span>
        </span>
      </nav>

      <section v-if="step === 1" class="onboarding-content onboarding-welcome">
        <div class="welcome-mark" aria-hidden="true">
          <q-icon name="tune" size="36px" />
        </div>
        <div class="onboarding-heading">
          <span class="onboarding-eyebrow">Kontrol sende</span>
          <h1>Neleri görmek istediğini sen seç.</h1>
          <p>
            İlgi alanlarını belirle; akışın seçimlerine göre şekillensin. Tercihlerini daha sonra
            dilediğin zaman değiştirebilirsin.
          </p>
        </div>
        <ul class="welcome-points">
          <li>
            <q-icon name="check" aria-hidden="true" /> Seçimlerin akışı anlaşılır biçimde etkiler.
          </li>
          <li>
            <q-icon name="check" aria-hidden="true" /> Gündemden yükselen başlıkları yine
            görebilirsin.
          </li>
          <li>
            <q-icon name="check" aria-hidden="true" /> Ne görmek istemediğini de söyleyebilirsin.
          </li>
        </ul>
      </section>

      <section v-else-if="step === 2" class="onboarding-content" aria-labelledby="interests-title">
        <div class="onboarding-heading">
          <span class="onboarding-eyebrow">İlgi alanların</span>
          <h1 id="interests-title">Sana yakın en az 3 konu seç.</h1>
          <p>İstersen hepsini seçebilirsin. Bu listeyi daha sonra değiştirmek mümkün.</p>
        </div>

        <div class="selection-status" role="status" aria-live="polite">
          <span>{{ selectedCount }} konu seçildi</span>
          <span v-if="remainingSelections > 0"
            >Devam etmek için {{ remainingSelections }} seçim daha</span
          >
          <span v-else class="selection-status__ready"><q-icon name="check" /> Hazırsın</span>
        </div>

        <div class="interest-grid">
          <InterestOption
            v-for="interest in store.interests"
            :key="interest.id"
            :interest="interest"
            :selected="store.user.selectedInterests.includes(interest.id)"
            @toggle="store.toggleInterest"
          />
        </div>
      </section>

      <PersonalizationPreview
        v-else
        class="onboarding-content"
        :interests="store.selectedInterestItems"
        :posts="previewPosts"
        :summary="feedSummary"
      />

      <footer class="onboarding-actions">
        <q-btn
          v-if="step > 1"
          flat
          no-caps
          label="Geri"
          icon="arrow_back"
          class="onboarding-actions__back"
          @click="step -= 1"
        />
        <span v-else></span>
        <q-btn
          unelevated
          no-caps
          color="primary"
          :label="step === 3 ? 'Akışıma geç' : 'Devam et'"
          :icon-right="step === 3 ? 'check' : 'arrow_forward'"
          :disable="step === 2 && selectedCount < minimumSelection"
          class="onboarding-actions__primary"
          @click="advance"
        />
      </footer>
    </main>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import InterestOption from '@/components/onboarding/InterestOption.vue'
import PersonalizationPreview from '@/components/onboarding/PersonalizationPreview.vue'
import { usePrototypeStore } from '@/stores/prototype.js'

const minimumSelection = 3
const step = ref(1)
const router = useRouter()
const store = usePrototypeStore()

const steps = [
  { id: 1, label: 'Tanış' },
  { id: 2, label: 'Seç' },
  { id: 3, label: 'Önizle' },
]

const selectedCount = computed(() => store.user.selectedInterests.length)
const remainingSelections = computed(() => Math.max(0, minimumSelection - selectedCount.value))
const previewPosts = computed(() =>
  store.personalizedFeed
    .filter((post) => post.topicIds.some((id) => store.user.selectedInterests.includes(id)))
    .slice(0, 3),
)

const feedSummary = computed(() => {
  const labels = store.selectedInterestItems.slice(0, 3).map((interest) => interest.label)
  if (labels.length === 0) return 'Seçimlerinle birlikte akışının özeti burada görünecek.'
  if (labels.length === 1) return `${labels[0]} ağırlıklı, yükselen başlıklara da açık bir akış.`

  const lastLabel = labels.pop()
  return `${labels.join(', ')} ve ${lastLabel} ağırlıklı; yükselen başlıkları da kaçırmayacağın bir akış.`
})

function advance() {
  if (step.value === 2 && selectedCount.value < minimumSelection) return

  if (step.value < 3) {
    step.value += 1
    return
  }

  store.completeOnboarding()
  router.push({ name: 'home' })
}
</script>

<style scoped>
.onboarding-page {
  min-height: 100dvh;
  padding: 20px 16px 32px;
  color: var(--ns-text, #15171a);
  background: var(--ns-bg-subtle, #f7f8fa);
}

.onboarding-shell {
  width: min(100%, 920px);
  min-height: calc(100dvh - 52px);
  margin: 0 auto;
  padding: 24px;
  background: var(--ns-surface, #fff);
  border: 1px solid var(--ns-border, #e6e9ed);
  border-radius: var(--radius-lg, 16px);
}

.onboarding-header,
.onboarding-brand,
.onboarding-actions,
.selection-status {
  display: flex;
  align-items: center;
}

.onboarding-header {
  justify-content: space-between;
}

.onboarding-brand {
  display: grid;
  gap: 1px;
}

.onboarding-brand > span {
  font-size: 17px;
  font-weight: 750;
  letter-spacing: -0.02em;
}

.onboarding-brand > small {
  color: var(--ns-text-secondary);
  font-size: 10px;
  font-weight: 600;
}

.onboarding-header__step {
  color: var(--ns-text-secondary, #5f6670);
  font-size: 13px;
  font-weight: 600;
}

.step-progress {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin: 28px 0 40px;
}

.step-progress__item {
  position: relative;
  display: grid;
  gap: 6px;
  justify-items: center;
  color: var(--ns-text-tertiary, #8b929b);
  font-size: 11px;
  font-weight: 600;
}

.step-progress__item::before,
.step-progress__item::after {
  position: absolute;
  top: 5px;
  width: 50%;
  height: 2px;
  content: '';
  background: var(--ns-border, #e6e9ed);
}

.step-progress__item::before {
  right: 50%;
}

.step-progress__item::after {
  left: 50%;
}

.step-progress__item:first-child::before,
.step-progress__item:last-child::after {
  display: none;
}

.step-progress__dot {
  z-index: 1;
  width: 12px;
  height: 12px;
  background: var(--ns-border-strong, #d8dde3);
  border: 3px solid var(--ns-surface, #fff);
  border-radius: 50%;
  box-shadow: 0 0 0 1px var(--ns-border-strong, #d8dde3);
  transition:
    background var(--motion-fast) var(--ease-standard),
    box-shadow var(--motion-fast) var(--ease-standard),
    transform var(--motion-fast) var(--ease-standard);
}

.step-progress__item--active {
  color: var(--ns-brand, #1687f8);
}

.step-progress__item--active .step-progress__dot {
  background: var(--ns-brand, #1687f8);
  box-shadow: 0 0 0 1px var(--ns-brand, #1687f8);
  transform: scale(1.08);
}

.onboarding-content {
  min-height: 452px;
}

.onboarding-welcome {
  display: grid;
  align-content: start;
  justify-items: center;
  text-align: center;
}

.welcome-mark {
  display: grid;
  place-items: center;
  width: 72px;
  height: 72px;
  margin-bottom: 24px;
  color: var(--ns-brand, #1687f8);
  background: var(--ns-brand-soft, #eaf4ff);
  border-radius: 20px;
}

.onboarding-heading {
  display: grid;
  gap: 8px;
  max-width: 640px;
}

.onboarding-eyebrow {
  color: var(--ns-brand, #1687f8);
  font-size: 12px;
  font-weight: 700;
}

.onboarding-heading h1,
.onboarding-heading p {
  margin: 0;
}

.onboarding-heading h1 {
  font-size: clamp(22px, 5vw, 30px);
  line-height: 1.2;
}

.onboarding-heading p {
  color: var(--ns-text-secondary, #5f6670);
  font-size: 15px;
  line-height: 1.55;
}

.welcome-points {
  display: grid;
  gap: 12px;
  width: min(100%, 540px);
  padding: 0;
  margin: 32px 0 0;
  color: var(--ns-text-secondary, #5f6670);
  text-align: left;
  list-style: none;
}

.welcome-points li {
  display: flex;
  gap: 10px;
  align-items: center;
}

.welcome-points .q-icon {
  flex: 0 0 24px;
  display: grid;
  place-items: center;
  width: 24px;
  height: 24px;
  color: var(--ns-success, #1f9d63);
  background: #eaf8f1;
  border-radius: 50%;
}

.selection-status {
  justify-content: space-between;
  min-height: 44px;
  margin: 20px 0 12px;
  color: var(--ns-text-secondary, #5f6670);
  font-size: 13px;
}

.selection-status__ready {
  color: var(--ns-success, #1f9d63);
  font-weight: 600;
}

.interest-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
}

.onboarding-actions {
  justify-content: space-between;
  gap: 16px;
  padding-top: 24px;
  margin-top: 24px;
  border-top: 1px solid var(--ns-border, #e6e9ed);
}

.onboarding-actions__back,
.onboarding-actions__primary {
  min-height: 44px;
  border-radius: var(--radius-sm, 8px);
}

.onboarding-actions__back {
  color: var(--ns-text-secondary, #5f6670);
}

.onboarding-actions__primary {
  min-width: 140px;
}

@media (min-width: 390px) {
  .interest-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 720px) {
  .onboarding-page {
    padding: 32px 24px;
  }

  .onboarding-shell {
    min-height: calc(100dvh - 64px);
    padding: 32px 40px;
  }

  .interest-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (max-width: 389px) {
  .onboarding-shell {
    padding: 20px 16px;
  }

  .step-progress__label {
    font-size: 10px;
  }

  .selection-status {
    align-items: flex-start;
    flex-direction: column;
    justify-content: center;
  }
}
</style>
