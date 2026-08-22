<template>
  <q-page class="clue-page">
    <main v-if="currentClue" class="clue-page__content">
      <header class="clue-header">
        <TreasureProgress
          :completed="completedCount"
          :total="totalStages"
          :label="`${currentClue.id}. ipucu`"
        />
        <span class="clue-header__location">{{ currentClue.location }}</span>
      </header>

      <section class="clue-copy" aria-labelledby="clue-title">
        <p>İpucu {{ currentClue.id }} / {{ totalStages }}</p>
        <h1 id="clue-title">{{ currentClue.title }}</h1>
        <blockquote>{{ currentClue.clue }}</blockquote>
        <div class="clue-copy__next">
          <q-icon name="lightbulb_outline" />
          <span>{{ currentClue.nextHint }}</span>
        </div>
      </section>

      <QrSimulationCard :loading="isScanning" @scan="scanCode" />
    </main>
  </q-page>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import QrSimulationCard from '@/components/campaign/QrSimulationCard.vue'
import TreasureProgress from '@/components/campaign/TreasureProgress.vue'
import { treasureClues, useTreasureHunt } from '@/composables/useTreasureHunt.js'

const route = useRoute()
const router = useRouter()
const isScanning = ref(false)
const { completeStage, completedCount, totalStages } = useTreasureHunt()

const stageNumber = computed(() => Number(route.params.stage))
const currentClue = computed(() => treasureClues.find((clue) => clue.id === stageNumber.value))

function ensureValidStage() {
  if (!currentClue.value) router.replace('/campaign/clue/1')
}

async function scanCode() {
  if (!currentClue.value || isScanning.value) return

  isScanning.value = true
  await new Promise((resolve) => setTimeout(resolve, 700))
  const completedStage = currentClue.value.id
  completeStage(completedStage)
  isScanning.value = false

  if (completedStage === totalStages) {
    router.push('/campaign/reward')
  } else {
    router.push(`/campaign/clue/${completedStage + 1}`)
  }
}

onMounted(ensureValidStage)
watch(() => route.params.stage, ensureValidStage)
</script>

<style scoped>
.clue-page {
  min-height: calc(100dvh - 60px);
  padding: clamp(24px, 5vw, 56px) var(--space-5) max(var(--space-6), env(safe-area-inset-bottom));
}

.clue-page__content {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(300px, 0.82fr);
  width: min(100%, 920px);
  align-items: center;
  gap: var(--space-6) clamp(32px, 6vw, 64px);
  margin: 0 auto;
}

.clue-header {
  grid-column: 1 / -1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
  padding-bottom: var(--space-5);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.clue-header__location {
  padding: var(--space-2) var(--space-3);
  color: #9ee8f5;
  font-size: 0.75rem;
  font-weight: 650;
  background: rgba(32, 198, 232, 0.1);
  border: 1px solid rgba(32, 198, 232, 0.22);
  border-radius: var(--radius-sm);
}

.clue-copy > p {
  margin: 0 0 var(--space-3);
  color: #61d6ec;
  font-size: 0.75rem;
  font-weight: 750;
}

.clue-copy h1 {
  margin: 0;
  color: #f5f8fb;
  font-size: clamp(1.75rem, 5vw, 2.75rem);
  line-height: 1.08;
  letter-spacing: -0.035em;
}

.clue-copy blockquote {
  margin: var(--space-5) 0 0;
  padding: 0 0 0 var(--space-4);
  color: #c8d1dc;
  font-size: 1rem;
  line-height: 1.7;
  border-left: 3px solid var(--ns-brand);
}

.clue-copy__next {
  display: flex;
  align-items: flex-start;
  gap: var(--space-3);
  margin-top: var(--space-5);
  color: #929fad;
  font-size: 0.8125rem;
  line-height: 1.5;
}

.clue-copy__next .q-icon {
  flex: 0 0 auto;
  color: #64d8ee;
  font-size: 1.25rem;
}

@media (max-width: 767px) {
  .clue-page__content {
    grid-template-columns: minmax(0, 1fr);
  }

  .clue-header {
    grid-column: auto;
  }
}

@media (max-width: 430px) {
  .clue-page {
    padding-inline: var(--space-4);
  }

  .clue-header {
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>
