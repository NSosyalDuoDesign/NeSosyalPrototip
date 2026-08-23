<template>
  <div class="demo-page">
    <header class="demo-header">
      <div class="demo-header__brand">
        <div><strong>NSosyal</strong><span>Ne Sosyal? · Sunum modu</span></div>
      </div>
      <q-btn flat no-caps icon="close" label="Demo modundan çık" to="/" />
    </header>

    <main class="demo-shell">
      <section class="demo-intro" aria-labelledby="demo-title">
        <span class="demo-eyebrow">Deterministik senaryo</span>
        <h1 id="demo-title">Demo Senaryosu</h1>
        <p>
          Her adım gerekli yerel durumu hazırlar. Tüketici arayüzünden ayrı duran sunum aracı,
          yenileme sonrasında da URL üzerinden bulunduğun adımı korur.
        </p>
        <div class="demo-progress" role="status">
          <span>{{ readyCount }} adım çalışır durumda</span>
          <span>{{ integrationCount }} adım A entegrasyonu bekliyor</span>
        </div>
        <p v-if="route.query.reset === 'done'" class="demo-reset-success" aria-live="polite">
          <q-icon name="check_circle" aria-hidden="true" /> Prototip başlangıç durumuna döndü.
        </p>
      </section>

      <section class="demo-dependency-note" aria-labelledby="dependency-title">
        <q-icon name="info" size="22px" aria-hidden="true" />
        <div>
          <h2 id="dependency-title">Bağımlılık durumu</h2>
          <p>
            Eksik A ekranları uydurma bir arayüzle kapatılmadı. Onboarding, Keşif, Yapıcı Paylaşım,
            Geri Dönüş ve Sıfırlama doğrudan oynatılabilir; diğer adımlar için veri yardımcıları
            hazır.
          </p>
        </div>
      </section>

      <ol class="demo-steps" aria-label="On adımlı demo akışı">
        <li
          v-for="step in demoScenario"
          :key="step.id"
          :class="{ 'demo-step--selected': selectedStep.id === step.id }"
        >
          <span class="demo-step__number">{{ step.id }}</span>
          <div class="demo-step__content">
            <div class="demo-step__title">
              <h2>{{ step.title }}</h2>
              <span :class="`demo-status demo-status--${step.status}`">
                {{ step.status === 'ready' ? 'Hazır' : 'A entegrasyonu' }}
              </span>
            </div>
            <p>{{ step.description }}</p>
            <small v-if="step.dependency">Beklenen: {{ step.dependency }}</small>
          </div>
          <q-btn
            flat
            no-caps
            color="primary"
            :label="step.status === 'ready' ? 'Adımı aç' : 'Detayı göster'"
            :icon-right="step.status === 'ready' ? 'arrow_forward' : 'info'"
            @click="openStep(step)"
          />
        </li>
      </ol>
    </main>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { demoLocation, demoScenario, demoStepById, prepareDemoStep } from '@/data/demo-scenario.js'
import { usePrototypeStore } from '@/stores/prototype.js'

const route = useRoute()
const router = useRouter()
const store = usePrototypeStore()

const readyCount = demoScenario.filter((step) => step.status === 'ready').length
const integrationCount = demoScenario.length - readyCount
const selectedStep = computed(() => demoStepById(route.query.demoStep))

function openStep(step) {
  prepareDemoStep(store, step.id)
  router.push(demoLocation(step))
}
</script>

<style scoped>
.demo-page {
  min-height: 100dvh;
  padding-bottom: 220px;
  color: var(--ns-text, #15171a);
  background: var(--ns-bg-subtle, #f7f8fa);
}

.demo-header,
.demo-header__brand,
.demo-progress,
.demo-dependency-note,
.demo-step__title {
  display: flex;
  align-items: center;
}

.demo-header {
  justify-content: space-between;
  min-height: 64px;
  padding: 8px 16px;
  background: var(--ns-surface, #fff);
  border-bottom: 1px solid var(--ns-border, #e6e9ed);
}

.demo-header__brand {
  gap: 10px;
}

.demo-header__brand > div {
  display: grid;
}

.demo-header__brand span {
  color: var(--ns-text-secondary, #5f6670);
  font-size: 10px;
  font-weight: 600;
}

.demo-header__brand strong {
  font-size: 17px;
  letter-spacing: -0.02em;
}

.demo-header .q-btn {
  min-height: 44px;
  color: var(--ns-text-secondary, #5f6670);
}

.demo-shell {
  display: grid;
  gap: 24px;
  width: min(100%, 880px);
  padding: 32px 16px 56px;
  margin: 0 auto;
}

.demo-intro {
  display: grid;
  gap: 8px;
}

.demo-eyebrow {
  color: var(--ns-brand, #1687f8);
  font-size: 12px;
  font-weight: 700;
}

.demo-intro h1,
.demo-intro p,
.demo-dependency-note h2,
.demo-dependency-note p,
.demo-step__title h2,
.demo-step__content p {
  margin: 0;
}

.demo-intro h1 {
  font-size: clamp(26px, 6vw, 36px);
  line-height: 1.2;
}

.demo-intro > p {
  max-width: 680px;
  color: var(--ns-text-secondary, #5f6670);
  font-size: 14px;
  line-height: 1.55;
}

.demo-progress {
  flex-wrap: wrap;
  gap: 8px 18px;
  margin-top: 8px;
  color: var(--ns-text-secondary, #5f6670);
  font-size: 12px;
  font-weight: 600;
}

.demo-reset-success {
  display: flex;
  gap: 6px;
  align-items: center;
  color: var(--ns-success, #1f9d63) !important;
  font-weight: 600;
}

.demo-dependency-note {
  align-items: flex-start;
  gap: 12px;
  padding: 16px;
  color: #725015;
  background: #fff9ea;
  border: 1px solid #f1d79e;
  border-radius: var(--radius-md, 12px);
}

.demo-dependency-note h2 {
  font-size: 15px;
}

.demo-dependency-note p {
  margin-top: 4px;
  font-size: 12px;
  line-height: 1.5;
}

.demo-steps {
  padding: 0;
  margin: 0;
  list-style: none;
  background: var(--ns-surface, #fff);
  border: 1px solid var(--ns-border, #e6e9ed);
  border-radius: var(--radius-lg, 16px);
}

.demo-steps li {
  display: grid;
  grid-template-columns: 36px minmax(0, 1fr) auto;
  gap: 12px;
  align-items: center;
  min-height: 92px;
  padding: 16px;
}

.demo-steps li + li {
  border-top: 1px solid var(--ns-border, #e6e9ed);
}

.demo-step--selected {
  background: var(--ns-brand-soft, #eaf4ff);
}

.demo-step__number {
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
  color: var(--ns-brand, #1687f8);
  font-size: 12px;
  font-weight: 800;
  background: var(--ns-brand-soft, #eaf4ff);
  border-radius: 50%;
}

.demo-step__content {
  display: grid;
  gap: 5px;
  min-width: 0;
}

.demo-step__title {
  flex-wrap: wrap;
  gap: 8px;
}

.demo-step__title h2 {
  font-size: 15px;
}

.demo-status {
  padding: 3px 7px;
  font-size: 10px;
  font-weight: 700;
  border-radius: 10px;
}

.demo-status--ready {
  color: #126842;
  background: #eaf8f1;
}

.demo-status--integration {
  color: #805814;
  background: #fff4d9;
}

.demo-step__content p,
.demo-step__content small {
  color: var(--ns-text-secondary, #5f6670);
  font-size: 12px;
  line-height: 1.45;
}

.demo-step__content small {
  color: #805814;
}

.demo-steps .q-btn {
  min-height: 40px;
}

@media (min-width: 600px) {
  .demo-header {
    padding: 8px 24px;
  }

  .demo-shell {
    padding: 44px 24px 72px;
  }
}

@media (max-width: 599px) {
  .demo-header .q-btn :deep(.q-btn__content span) {
    display: none;
  }

  .demo-steps li {
    grid-template-columns: 36px minmax(0, 1fr);
  }

  .demo-steps .q-btn {
    grid-column: 2;
    justify-self: start;
    padding-right: 4px;
    padding-left: 4px;
  }
}

@media (max-width: 380px) {
  .demo-shell {
    padding-right: 12px;
    padding-left: 12px;
  }

  .demo-steps li {
    padding: 14px 12px;
  }
}
</style>
