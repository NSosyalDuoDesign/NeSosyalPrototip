<template>
  <q-page class="reward-page">
    <main class="reward-page__content">
      <RewardReveal v-if="rewardUnlocked" @claim="claimReward" />

      <section v-else class="reward-locked" aria-labelledby="locked-title">
        <q-icon name="lock_outline" size="44px" />
        <h1 id="locked-title">Önce rotayı tamamla</h1>
        <p>Gizli keşif, üç kampanya kodunu da bulduğunda açılacak.</p>
        <q-btn
          unelevated
          no-caps
          color="primary"
          label="Sıradaki ipucuna git"
          :to="`/campaign/clue/${nextStage}`"
        />
      </section>
    </main>
  </q-page>
</template>

<script setup>
import RewardReveal from '@/components/campaign/RewardReveal.vue'
import { useTreasureHunt } from '@/composables/useTreasureHunt.js'

const { claimReward, nextStage, rewardUnlocked } = useTreasureHunt()
</script>

<style scoped>
.reward-page {
  display: grid;
  min-height: calc(100dvh - 60px);
  padding: var(--space-8) var(--space-5) max(var(--space-8), env(safe-area-inset-bottom));
  place-items: center;
}

.reward-page__content {
  width: min(100%, 680px);
  padding: clamp(24px, 7vw, 56px);
  background: rgba(22, 33, 48, 0.88);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: var(--radius-xl);
}

.reward-locked {
  display: grid;
  justify-items: center;
  color: #aeb9c7;
  text-align: center;
}

.reward-locked h1 {
  margin: var(--space-4) 0 var(--space-2);
  color: #f5f8fb;
  font-size: 1.5rem;
}

.reward-locked p {
  margin: 0 0 var(--space-5);
}
</style>
