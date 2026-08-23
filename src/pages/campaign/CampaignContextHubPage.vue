<template>
  <q-page class="context-hub-page">
    <main class="context-hub-shell">
      <div v-if="continuedFromCampaign" class="context-hub-continuity" role="status">
        <q-icon name="check_circle" aria-hidden="true" />
        <div>
          <strong>Aynı konuşmada devam ediyorsun</strong>
          <span>Tepkin ve açtığın sosyal katmanlar bu bağlama taşındı.</span>
        </div>
      </div>

      <header class="context-hub-bar">
        <div>
          <span>Bağlam merkezi</span>
          <strong>{{ context.sourceLabel }}</strong>
        </div>
        <div class="context-hub-bar__live">
          <i aria-hidden="true" /> {{ context.live.activeCount }} aktif
        </div>
      </header>

      <CampaignContextHero :context="context" compact />

      <CampaignReactionPanel
        :context="context"
        :selected-option-id="selectedReaction"
        :show-results="true"
        member
        @select="selectReaction"
      />

      <CampaignSocialLayers
        :context="context"
        :revealed-layers="allLayers"
        member
        @reply="replyToPerspective"
      />

      <section
        ref="participationPanel"
        class="context-participation"
        aria-labelledby="participation-title"
      >
        <header>
          <div>
            <span>Şimdi söz sende</span>
            <h2 id="participation-title">{{ context.cta.memberLabel }}</h2>
          </div>
          <q-btn flat round icon="share" aria-label="Bu bağlamı paylaş" @click="shareContext" />
        </header>

        <form @submit.prevent="publishReply">
          <UserAvatar :name="store.user.displayName" size="42px" />
          <label>
            <span class="sr-only">Bu konuşmaya görüşünü yaz</span>
            <textarea
              v-model="replyText"
              rows="3"
              maxlength="320"
              placeholder="Bu konuşmaya ne eklemek istersin?"
            />
          </label>
          <div class="context-participation__actions">
            <span>{{ replyText.length }}/320</span>
            <q-btn
              unelevated
              no-caps
              color="primary"
              label="Görüşünü paylaş"
              :disable="!replyText.trim()"
              type="submit"
            />
          </div>
        </form>

        <p v-if="interactionNotice" class="context-participation__notice" role="status">
          <q-icon name="check_circle" aria-hidden="true" /> {{ interactionNotice }}
        </p>
      </section>
    </main>
  </q-page>
</template>

<script setup>
import { computed, nextTick, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import CampaignContextHero from '@/components/campaign/CampaignContextHero.vue'
import CampaignReactionPanel from '@/components/campaign/CampaignReactionPanel.vue'
import CampaignSocialLayers from '@/components/campaign/CampaignSocialLayers.vue'
import UserAvatar from '@/components/ui/UserAvatar.vue'
import {
  CAMPAIGN_ENTRY_MODES,
  CAMPAIGN_LAYER_IDS,
  getCampaignContext,
  resolveCampaignContextId,
} from '@/data/campaign-contexts.js'
import { usePrototypeStore } from '@/stores/prototype.js'

const route = useRoute()
const router = useRouter()
const store = usePrototypeStore()
const replyText = ref('')
const interactionNotice = ref('')
const participationPanel = ref(null)
const allLayers = [...CAMPAIGN_LAYER_IDS]

const contextId = computed(() => resolveCampaignContextId(route.params.contextId))
const context = computed(() => getCampaignContext(contextId.value))
const selectedReaction = computed(() => store.campaign.reactions[contextId.value] ?? null)
const continuedFromCampaign = computed(() => route.query.continued === '1')

watch(
  () => route.params.contextId,
  (requestedId) => {
    const resolvedId = resolveCampaignContextId(requestedId)
    if (requestedId !== resolvedId) {
      router.replace({
        name: 'campaign-context-hub',
        params: { contextId: resolvedId },
        query: route.query,
      })
      return
    }
    store.setCampaignEntry(resolvedId, CAMPAIGN_ENTRY_MODES.member)
  },
  { immediate: true },
)

function selectReaction(optionId) {
  store.selectCampaignReaction(contextId.value, optionId)
}

async function replyToPerspective(perspective) {
  replyText.value = `${perspective.handle} `
  interactionNotice.value = ''
  await nextTick()
  participationPanel.value?.scrollIntoView?.({ behavior: 'smooth', block: 'center' })
  participationPanel.value?.querySelector?.('textarea')?.focus()
}

function publishReply() {
  if (!replyText.value.trim()) return
  interactionNotice.value = 'Görüşün bu bağlamdaki konuşmaya eklendi.'
  replyText.value = ''
}

function shareContext() {
  interactionNotice.value = 'Bağlam bağlantısı paylaşmaya hazır.'
}
</script>

<style scoped>
.context-hub-page {
  min-height: 100dvh;
  color: var(--ns-text);
  background: var(--ns-bg-subtle);
}

.context-hub-shell {
  display: grid;
  gap: 20px;
  width: 100%;
  padding: 24px 20px 80px;
}

.context-hub-continuity,
.context-hub-bar,
.context-hub-bar__live,
.context-participation > header,
.context-participation__notice {
  display: flex;
  align-items: center;
}

.context-hub-continuity {
  gap: 10px;
  padding: 12px 14px;
  color: var(--ns-success);
  background: color-mix(in srgb, var(--ns-success) 8%, var(--ns-surface));
  border: 1px solid color-mix(in srgb, var(--ns-success) 28%, var(--ns-border));
  border-radius: var(--radius-md);
}

.context-hub-continuity > .q-icon {
  flex: 0 0 auto;
  font-size: 22px;
}

.context-hub-continuity > div,
.context-hub-bar > div:first-child,
.context-participation > header > div {
  display: grid;
  gap: 2px;
}

.context-hub-continuity strong {
  font-size: 12px;
}

.context-hub-continuity span {
  color: var(--ns-text-secondary);
  font-size: 10px;
}

.context-hub-bar {
  justify-content: space-between;
  gap: 16px;
  padding-bottom: 14px;
  border-bottom: 1px solid var(--ns-border);
}

.context-hub-bar > div:first-child span,
.context-participation > header span {
  color: var(--ns-brand);
  font-size: 10px;
  font-weight: 750;
}

.context-hub-bar > div:first-child strong {
  font-size: 15px;
}

.context-hub-bar__live {
  gap: 7px;
  color: var(--ns-text-secondary);
  font-size: 10px;
  font-weight: 650;
}

.context-hub-bar__live i {
  width: 7px;
  height: 7px;
  background: var(--ns-danger);
  border-radius: 50%;
}

.context-participation {
  padding: clamp(20px, 4vw, 28px);
  color: var(--ns-text);
  background: var(--ns-surface);
  border: 1px solid var(--ns-border);
  border-radius: var(--radius-lg);
}

.context-participation > header {
  justify-content: space-between;
  gap: 16px;
}

.context-participation h2 {
  margin: 0;
  font-size: 21px;
}

.context-participation > header .q-btn {
  color: var(--ns-text-secondary);
}

.context-participation form {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  gap: 12px;
  margin-top: 18px;
}

.context-participation label {
  min-width: 0;
}

.context-participation textarea {
  display: block;
  width: 100%;
  min-height: 96px;
  padding: 12px;
  resize: vertical;
  color: var(--ns-text);
  font: inherit;
  font-size: 13px;
  line-height: 1.5;
  background: var(--ns-bg-subtle);
  border: 1px solid var(--ns-border);
  border-radius: var(--radius-md);
}

.context-participation textarea:focus {
  border-color: var(--ns-brand);
  outline: 3px solid color-mix(in srgb, var(--ns-brand) 14%, transparent);
}

.context-participation textarea::placeholder {
  color: var(--ns-text-tertiary);
}

.context-participation__actions {
  grid-column: 2;
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: space-between;
}

.context-participation__actions > span {
  color: var(--ns-text-tertiary);
  font-size: 10px;
}

.context-participation__actions .q-btn {
  min-height: 44px;
  border-radius: var(--radius-md);
}

.context-participation__notice {
  gap: 7px;
  margin: 14px 0 0 54px;
  color: var(--ns-success);
  font-size: 11px;
  font-weight: 650;
}

@media (max-width: 599px) {
  .context-hub-shell {
    gap: 16px;
    padding: 16px 12px calc(var(--mobile-nav-height) + 32px);
  }

  .context-participation form {
    grid-template-columns: minmax(0, 1fr);
  }

  .context-participation form > :deep(.user-avatar) {
    display: none;
  }

  .context-participation__actions {
    grid-column: 1;
  }

  .context-participation__notice {
    margin-left: 0;
  }
}
</style>
