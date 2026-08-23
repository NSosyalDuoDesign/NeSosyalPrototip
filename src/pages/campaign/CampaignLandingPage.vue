<template>
  <q-page class="campaign-entry-page">
    <main class="campaign-entry-shell">
      <div class="campaign-entry-note" role="note">
        <q-icon name="qr_code_scanner" aria-hidden="true" />
        <div>
          <strong>Bu QR, izlediğin veya karşılaştığın ana ait.</strong>
          <span>Üye olmadan önce topluluğun ne düşündüğünü görebilirsin.</span>
        </div>
      </div>

      <CampaignContextHero :context="context" />

      <CampaignReactionPanel
        :context="context"
        :selected-option-id="selectedReaction"
        :show-results="hasLayer('pulse')"
        @select="selectReaction"
      />

      <CampaignSocialLayers
        :context="context"
        :revealed-layers="revealedLayers"
        @convert="beginConversion"
        @reveal="revealLayer"
        @reply="revealLayer('live')"
      />

      <Transition name="campaign-conversion">
        <CampaignConversionPanel
          v-if="conversionActive"
          ref="conversionPanel"
          :context="context"
          :selected-option-id="selectedReaction"
          @continue="continueInNSosyal"
        />
      </Transition>

      <footer class="campaign-entry-footer">
        <img src="/brand/nsosyal-logo.png" alt="" width="28" height="28" />
        <p>
          Bu deneyim, dışarıdaki anı NSosyal’daki sosyal konuşmaya bağlayan frontend prototipidir.
          Kamera, konum veya gerçek üyelik kullanılmaz.
        </p>
      </footer>
    </main>
  </q-page>
</template>

<script setup>
import { computed, nextTick, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import CampaignContextHero from '@/components/campaign/CampaignContextHero.vue'
import CampaignConversionPanel from '@/components/campaign/CampaignConversionPanel.vue'
import CampaignReactionPanel from '@/components/campaign/CampaignReactionPanel.vue'
import CampaignSocialLayers from '@/components/campaign/CampaignSocialLayers.vue'
import {
  CAMPAIGN_ENTRY_MODES,
  getCampaignContext,
  resolveCampaignContextId,
} from '@/data/campaign-contexts.js'
import { usePrototypeStore } from '@/stores/prototype.js'

const route = useRoute()
const router = useRouter()
const store = usePrototypeStore()
const conversionPanel = ref(null)

const contextId = computed(() => resolveCampaignContextId(route.query.context))
const context = computed(() => getCampaignContext(contextId.value))
const selectedReaction = computed(() => store.campaign.reactions[contextId.value] ?? null)
const revealedLayers = computed(() => store.campaign.revealedLayers[contextId.value] ?? [])
const conversionActive = computed(
  () =>
    store.campaign.conversion.contextId === contextId.value &&
    store.campaign.conversion.status === 'transition',
)

watch(
  [contextId, () => route.query.mode],
  ([id, mode]) => {
    if (mode === CAMPAIGN_ENTRY_MODES.member) {
      store.seedCampaignMember(id)
      router.replace({
        name: 'campaign-context-hub',
        params: { contextId: id },
        query: {
          source: 'qr',
          ...(route.query.demo ? { demo: route.query.demo, demoStep: route.query.demoStep } : {}),
        },
      })
      return
    }

    store.setCampaignEntry(id, CAMPAIGN_ENTRY_MODES.visitor)
  },
  { immediate: true },
)

function hasLayer(layerId) {
  return revealedLayers.value.includes(layerId)
}

function selectReaction(optionId) {
  store.selectCampaignReaction(contextId.value, optionId)
}

function revealLayer(layerId) {
  store.revealCampaignLayer(contextId.value, layerId)
}

async function beginConversion() {
  store.beginCampaignConversion(contextId.value)
  await nextTick()
  conversionPanel.value?.$el?.scrollIntoView?.({ behavior: 'smooth', block: 'center' })
}

function continueInNSosyal() {
  store.completeCampaignConversion(contextId.value)
  router.push({
    name: 'campaign-context-hub',
    params: { contextId: contextId.value },
    query: {
      source: 'campaign',
      continued: '1',
      ...(route.query.demo ? { demo: route.query.demo, demoStep: route.query.demoStep } : {}),
    },
  })
}
</script>

<style scoped>
.campaign-entry-page {
  min-height: calc(100dvh - 62px);
  color: var(--ns-text);
  background: var(--ns-bg-subtle);
}

.campaign-entry-shell {
  display: grid;
  gap: 24px;
  width: min(100%, 1080px);
  padding: clamp(20px, 5vw, 52px) 20px max(48px, env(safe-area-inset-bottom));
  margin: 0 auto;
}

.campaign-entry-note,
.campaign-entry-footer {
  display: flex;
  align-items: center;
}

.campaign-entry-note {
  gap: 12px;
  width: fit-content;
  max-width: 100%;
  padding: 11px 14px;
  color: var(--ns-text-secondary);
  background: var(--ns-surface);
  border: 1px solid var(--ns-border);
  border-radius: var(--radius-md);
}

.campaign-entry-note > .q-icon {
  flex: 0 0 auto;
  color: var(--ns-brand);
  font-size: 23px;
}

.campaign-entry-note > div {
  display: grid;
  gap: 2px;
}

.campaign-entry-note strong {
  color: var(--ns-text);
  font-size: 12px;
}

.campaign-entry-note span {
  font-size: 10px;
}

.campaign-entry-footer {
  gap: 10px;
  justify-content: center;
  padding-top: 8px;
  color: var(--ns-text-tertiary);
}

.campaign-entry-footer img {
  flex: 0 0 auto;
  object-fit: contain;
}

.campaign-entry-footer p {
  max-width: 620px;
  margin: 0;
  font-size: 10px;
  line-height: 1.45;
}

.campaign-conversion-enter-active,
.campaign-conversion-leave-active {
  transition:
    opacity var(--motion-base) var(--ease-standard),
    transform var(--motion-base) var(--ease-standard);
}

.campaign-conversion-enter-from,
.campaign-conversion-leave-to {
  opacity: 0;
  transform: translateY(12px);
}

@media (max-width: 599px) {
  .campaign-entry-shell {
    gap: 18px;
    padding: 16px 12px max(36px, env(safe-area-inset-bottom));
  }

  .campaign-entry-note {
    width: 100%;
  }
}
</style>
