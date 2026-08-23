<template>
  <div class="demo-page">
    <header class="demo-header">
      <div class="demo-header__brand">
        <div><strong>NSosyal</strong><span>NSosyal · Sunum modu</span></div>
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
          <span
            ><q-icon name="check_circle" aria-hidden="true" /> {{ readyCount }} adımın tamamı
            çalışır durumda</span
          >
        </div>
        <p v-if="route.query.reset === 'done'" class="demo-reset-success" aria-live="polite">
          <q-icon name="check_circle" aria-hidden="true" /> Prototip başlangıç durumuna döndü.
        </p>
      </section>

      <section
        class="demo-dependency-note demo-dependency-note--ready"
        aria-labelledby="dependency-title"
      >
        <q-icon name="task_alt" size="22px" aria-hidden="true" />
        <div>
          <h2 id="dependency-title">Uçtan uca demo hazır</h2>
          <p>
            Kampanyadan kişisel akışa, keşiften geri dönüş özetine kadar tüm adımlar aynı yerel
            state üzerinde oynatılabilir.
          </p>
        </div>
      </section>

      <section class="demo-contexts" aria-labelledby="demo-contexts-title">
        <header>
          <div>
            <span>QR bağlam laboratuvarı</span>
            <h2 id="demo-contexts-title">Aynı yapı, farklı dış dünya anları</h2>
          </div>
          <p>Ziyaretçi değer akışını veya doğrudan üye girişini tek tıkla göster.</p>
        </header>

        <div class="demo-contexts__grid">
          <article v-for="context in campaignContexts" :key="context.id">
            <q-icon :name="context.icon" aria-hidden="true" />
            <div>
              <span>{{ context.sourceType }}</span>
              <strong>{{ context.sourceLabel }}</strong>
              <p>{{ context.headline }}</p>
            </div>
            <div class="demo-contexts__actions">
              <q-btn
                outline
                no-caps
                color="primary"
                label="Ziyaretçi"
                @click="openCampaignContext(context.id, CAMPAIGN_ENTRY_MODES.visitor)"
              />
              <q-btn
                flat
                no-caps
                color="primary"
                label="NSosyal üyesi"
                @click="openCampaignContext(context.id, CAMPAIGN_ENTRY_MODES.member)"
              />
            </div>
          </article>
        </div>
      </section>

      <ol class="demo-steps" :aria-label="`${demoScenario.length} adımlı demo akışı`">
        <li
          v-for="step in demoScenario"
          :key="step.id"
          :class="{ 'demo-step--selected': selectedStep.id === step.id }"
        >
          <span class="demo-step__number">{{ step.id }}</span>
          <div class="demo-step__content">
            <div class="demo-step__title">
              <h2>{{ step.title }}</h2>
              <span class="demo-status demo-status--ready">Hazır</span>
            </div>
            <p>{{ step.description }}</p>
          </div>
          <q-btn
            flat
            no-caps
            color="primary"
            label="Adımı aç"
            icon-right="arrow_forward"
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
import {
  CAMPAIGN_ENTRY_MODES,
  campaignContexts,
  campaignEntryLocation,
} from '@/data/campaign-contexts.js'
import { demoLocation, demoScenario, demoStepById, prepareDemoStep } from '@/data/demo-scenario.js'
import { usePrototypeStore } from '@/stores/prototype.js'

const route = useRoute()
const router = useRouter()
const store = usePrototypeStore()

const readyCount = demoScenario.filter((step) => step.status === 'ready').length
const selectedStep = computed(() => demoStepById(route.query.demoStep))

function openStep(step) {
  prepareDemoStep(store, step.id)
  router.push(demoLocation(step))
}

function openCampaignContext(contextId, mode) {
  if (mode === CAMPAIGN_ENTRY_MODES.member) store.seedCampaignMember(contextId)
  else store.seedCampaignVisitor(contextId)

  router.push(
    campaignEntryLocation(contextId, mode, {
      demo: '1',
      demoStep: mode === CAMPAIGN_ENTRY_MODES.member ? '2' : '1',
    }),
  )
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

.demo-dependency-note--ready {
  color: #126842;
  background: #effaf4;
  border-color: #b9e3cc;
}

.demo-dependency-note h2 {
  font-size: 15px;
}

.demo-dependency-note p {
  margin-top: 4px;
  font-size: 12px;
  line-height: 1.5;
}

.demo-contexts {
  display: grid;
  gap: 16px;
}

.demo-contexts > header {
  display: flex;
  gap: 16px;
  align-items: end;
  justify-content: space-between;
}

.demo-contexts > header > div {
  display: grid;
  gap: 3px;
}

.demo-contexts > header span {
  color: var(--ns-brand);
  font-size: 11px;
  font-weight: 700;
}

.demo-contexts > header h2,
.demo-contexts > header p,
.demo-contexts__grid article p {
  margin: 0;
}

.demo-contexts > header h2 {
  font-size: 19px;
}

.demo-contexts > header p {
  max-width: 320px;
  color: var(--ns-text-secondary);
  font-size: 11px;
  line-height: 1.45;
}

.demo-contexts__grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
}

.demo-contexts__grid article {
  display: grid;
  grid-template-columns: 42px minmax(0, 1fr);
  gap: 12px;
  padding: 14px;
  background: var(--ns-surface);
  border: 1px solid var(--ns-border);
  border-radius: var(--radius-md);
}

.demo-contexts__grid article > .q-icon {
  display: grid;
  width: 42px;
  height: 42px;
  color: var(--ns-brand);
  background: var(--ns-brand-soft);
  border-radius: var(--radius-sm);
  place-items: center;
}

.demo-contexts__grid article > div:nth-child(2) {
  display: grid;
  min-width: 0;
  gap: 3px;
}

.demo-contexts__grid article span {
  color: var(--ns-brand);
  font-size: 9px;
  font-weight: 700;
}

.demo-contexts__grid article strong {
  overflow: hidden;
  font-size: 12px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.demo-contexts__grid article p {
  color: var(--ns-text-secondary);
  font-size: 10px;
  line-height: 1.4;
}

.demo-contexts__actions {
  grid-column: 1 / -1;
  display: flex;
  gap: 8px;
  justify-content: flex-end;
  padding-top: 9px;
  border-top: 1px solid var(--ns-border);
}

.demo-contexts__actions .q-btn {
  min-height: 38px;
  font-size: 10px;
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
  min-height: var(--touch-target);
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

  .demo-contexts > header {
    align-items: flex-start;
    flex-direction: column;
  }

  .demo-contexts__grid {
    grid-template-columns: minmax(0, 1fr);
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
