<template>
  <aside v-if="demoActive" class="demo-toolbar" aria-label="Demo senaryosu kontrolleri">
    <button
      v-if="!expanded"
      type="button"
      class="demo-toolbar__trigger"
      aria-label="Demo kontrollerini aç"
      @click="expanded = true"
    >
      <q-icon name="smart_display" size="20px" aria-hidden="true" />
      <span>Demo {{ currentStep.id }}/10</span>
    </button>

    <div v-else class="demo-toolbar__panel">
      <header>
        <div>
          <span>Sunum aracı · {{ currentStep.id }}/10</span>
          <strong>{{ currentStep.shortTitle }}</strong>
        </div>
        <q-btn
          flat
          round
          dense
          icon="expand_more"
          aria-label="Demo kontrollerini küçült"
          @click="expanded = false"
        />
      </header>

      <p v-if="currentStep.status === 'integration'" class="demo-toolbar__dependency">
        <q-icon name="construction" aria-hidden="true" /> A entegrasyonu bekleniyor
      </p>
      <p v-else>{{ currentStep.description }}</p>

      <div class="demo-toolbar__actions">
        <q-btn flat no-caps label="Tüm adımlar" :to="demoOverviewLocation" />
        <q-btn
          v-if="currentStep.id === 10"
          unelevated
          no-caps
          color="negative"
          label="Prototipi sıfırla"
          @click="confirmReset = true"
        />
        <q-btn
          v-else
          unelevated
          no-caps
          color="primary"
          label="Sonraki adım"
          icon-right="arrow_forward"
          @click="openStep(currentStep.id + 1)"
        />
      </div>
    </div>

    <q-dialog v-model="confirmReset">
      <q-card class="demo-reset-dialog">
        <q-card-section>
          <h2>Prototip sıfırlansın mı?</h2>
          <p>İlgi alanları, öneri geri bildirimleri ve deneyim tercihi bu cihazda temizlenecek.</p>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn v-close-popup flat no-caps label="Vazgeç" />
          <q-btn unelevated no-caps color="negative" label="Sıfırla" @click="resetDemo" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </aside>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  demoLocation,
  demoStepById,
  prepareDemoStep,
  resetDemoState,
} from '@/data/demo-scenario.js'
import { usePrototypeStore } from '@/stores/prototype.js'

const route = useRoute()
const router = useRouter()
const store = usePrototypeStore()
const expanded = ref(route.name === 'demo')
const confirmReset = ref(false)

const demoActive = computed(() => route.name === 'demo' || Boolean(route.query.demo))
const currentStep = computed(() => demoStepById(route.query.demoStep))
const demoOverviewLocation = computed(() => ({
  name: 'demo',
  query: { demo: '1', demoStep: String(currentStep.value.id) },
}))

watch(
  () => route.name,
  (name) => {
    expanded.value = name === 'demo'
  },
)

function openStep(stepId) {
  const step = demoStepById(stepId)
  prepareDemoStep(store, step.id)
  router.push(demoLocation(step))
}

function resetDemo() {
  resetDemoState(store)
  confirmReset.value = false
  router.replace({ name: 'demo', query: { demo: '1', demoStep: '1', reset: 'done' } })
}
</script>

<style scoped>
.demo-toolbar {
  position: fixed;
  right: max(12px, env(safe-area-inset-right));
  bottom: max(12px, env(safe-area-inset-bottom));
  z-index: 4000;
  color: #eef2f7;
  font-size: 12px;
}

.demo-toolbar__trigger,
.demo-toolbar__panel {
  color: inherit;
  background: #20242a;
  border: 1px solid #3a414b;
  box-shadow: 0 8px 24px rgb(0 0 0 / 22%);
}

.demo-toolbar__trigger {
  display: flex;
  gap: 8px;
  align-items: center;
  min-height: 44px;
  padding: 0 14px;
  font: inherit;
  font-weight: 700;
  cursor: pointer;
  border-radius: 22px;
}

.demo-toolbar__trigger:focus-visible {
  outline: 3px solid rgb(94 173 255 / 55%);
  outline-offset: 2px;
}

.demo-toolbar__panel {
  width: min(340px, calc(100vw - 24px));
  padding: 14px;
  border-radius: 12px;
}

.demo-toolbar__panel header,
.demo-toolbar__actions {
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: space-between;
}

.demo-toolbar__panel header > div {
  display: grid;
  gap: 2px;
}

.demo-toolbar__panel header span {
  color: #aeb7c2;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.demo-toolbar__panel header strong {
  font-size: 14px;
}

.demo-toolbar__panel header .q-btn {
  flex: 0 0 40px;
  color: #d9e0e7;
}

.demo-toolbar__panel p {
  margin: 12px 0;
  color: #cbd2da;
  line-height: 1.45;
}

.demo-toolbar__dependency {
  display: flex;
  gap: 6px;
  align-items: center;
  color: #ffcd70 !important;
}

.demo-toolbar__actions {
  padding-top: 10px;
  border-top: 1px solid #3a414b;
}

.demo-toolbar__actions .q-btn {
  min-height: 40px;
  font-size: 12px;
}

.demo-toolbar__actions .q-btn:first-child {
  color: #d9e0e7;
}

.demo-reset-dialog {
  width: min(420px, calc(100vw - 32px));
  border-radius: 12px;
}

.demo-reset-dialog h2,
.demo-reset-dialog p {
  margin: 0;
}

.demo-reset-dialog h2 {
  font-size: 19px;
}

.demo-reset-dialog p {
  margin-top: 8px;
  color: #5f6670;
  font-size: 13px;
  line-height: 1.5;
}

@media (max-width: 420px) {
  .demo-toolbar {
    right: max(8px, env(safe-area-inset-right));
    bottom: max(8px, env(safe-area-inset-bottom));
  }

  .demo-toolbar__panel {
    width: calc(100vw - 16px);
  }
}
</style>
