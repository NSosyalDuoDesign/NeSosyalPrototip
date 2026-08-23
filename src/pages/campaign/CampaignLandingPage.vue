<template>
  <q-page class="campaign-landing">
    <main class="campaign-landing__content">
      <section class="campaign-hero" aria-labelledby="campaign-title">
        <p class="campaign-hero__eyebrow">NSosyal keşif rotası</p>
        <h1 id="campaign-title">Şehrin içinde üç işaret. Sonunda sana ait bir keşif.</h1>
        <p class="campaign-hero__lead">
          Etrafındaki QR kodlarını takip et, ipuçlarını birleştir ve NSosyal’de saklı kalan rotayı
          aç. Kamera gerektirmeyen kısa bir prototip deneyimi.
        </p>

        <div class="campaign-hero__actions">
          <q-btn
            unelevated
            no-caps
            color="primary"
            :label="completedCount > 0 ? 'Rotaya devam et' : 'İlk ipucunu aç'"
            icon-right="arrow_forward"
            :to="nextRoute"
            class="campaign-hero__primary"
          />
          <q-btn
            v-if="completedCount > 0"
            flat
            no-caps
            color="white"
            label="Baştan başla"
            @click="restart"
          />
        </div>
      </section>

      <aside class="campaign-landing__progress" aria-label="Kampanya özeti">
        <TreasureProgress :completed="completedCount" :total="totalStages" />
        <div class="campaign-principles">
          <div><q-icon name="search" /><span>İpucunu oku</span></div>
          <div><q-icon name="qr_code_scanner" /><span>Kodu simüle et</span></div>
          <div><q-icon name="travel_explore" /><span>Keşfi aç</span></div>
        </div>
      </aside>
    </main>

    <p class="campaign-landing__note">Gerçek QR taraması veya ödül altyapısı kullanılmaz.</p>
  </q-page>
</template>

<script setup>
import { computed } from 'vue'
import TreasureProgress from '@/components/campaign/TreasureProgress.vue'
import { useTreasureHunt } from '@/composables/useTreasureHunt.js'

const { completedCount, nextStage, resetTreasureHunt, rewardUnlocked, totalStages } =
  useTreasureHunt()

const nextRoute = computed(() =>
  rewardUnlocked.value ? '/campaign/reward' : `/campaign/clue/${nextStage.value}`,
)

function restart() {
  resetTreasureHunt()
}
</script>

<style scoped>
.campaign-landing {
  display: flex;
  min-height: calc(100dvh - 60px);
  flex-direction: column;
  padding: clamp(32px, 7vw, 80px) var(--space-5) max(var(--space-5), env(safe-area-inset-bottom));
}

.campaign-landing__content {
  display: grid;
  grid-template-columns: minmax(0, 1.25fr) minmax(280px, 0.75fr);
  width: min(100%, 980px);
  align-items: center;
  gap: clamp(32px, 7vw, 80px);
  margin: auto;
}

.campaign-hero__eyebrow {
  margin: 0 0 var(--space-4);
  color: #5fd8ef;
  font-size: 0.75rem;
  font-weight: 750;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.campaign-hero h1 {
  max-width: 650px;
  margin: 0;
  color: #f5f8fb;
  font-size: clamp(2rem, 5vw, 3.5rem);
  line-height: 1.04;
  letter-spacing: -0.045em;
}

.campaign-hero__lead {
  max-width: 590px;
  margin: var(--space-5) 0 0;
  color: #aeb9c7;
  font-size: 1rem;
  line-height: 1.65;
}

.campaign-hero__actions {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--space-3);
  margin-top: var(--space-6);
}

.campaign-hero__actions .q-btn {
  min-height: var(--touch-target);
}

.campaign-hero__primary {
  min-height: 50px;
  padding-inline: var(--space-5);
  border-radius: var(--radius-md);
  font-weight: 650;
}

.campaign-landing__progress {
  display: grid;
  gap: var(--space-6);
  padding: var(--space-6);
  background: rgba(22, 33, 48, 0.86);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: var(--radius-xl);
}

.campaign-principles {
  display: grid;
  gap: var(--space-3);
  padding-top: var(--space-5);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.campaign-principles div {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  color: #c3ccd7;
  font-size: 0.875rem;
}

.campaign-principles .q-icon {
  color: #64d8ee;
  font-size: 1.25rem;
}

.campaign-landing__note {
  margin: var(--space-6) auto 0;
  color: #7f8c9c;
  font-size: 0.75rem;
  text-align: center;
}

@media (max-width: 767px) {
  .campaign-landing__content {
    grid-template-columns: minmax(0, 1fr);
  }

  .campaign-hero h1 {
    font-size: clamp(2rem, 10vw, 2.75rem);
  }

  .campaign-landing__progress {
    padding: var(--space-5);
  }
}

@media (max-width: 380px) {
  .campaign-landing {
    padding-inline: var(--space-4);
  }

  .campaign-hero__actions,
  .campaign-hero__primary {
    width: 100%;
  }
}
</style>
