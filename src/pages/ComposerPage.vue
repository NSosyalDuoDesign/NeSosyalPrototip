<template>
  <div class="composer-page">
    <header class="composer-header">
      <q-btn flat round dense icon="close" to="/" aria-label="Gönderi oluşturmayı kapat" />
      <div>
        <span>Ne Sosyal?</span>
        <h1>Gönderi oluştur</h1>
      </div>
    </header>

    <main class="composer-shell">
      <section v-if="published" class="composer-success" aria-live="polite">
        <div class="composer-success__icon" aria-hidden="true">
          <q-icon name="check" size="28px" />
        </div>
        <h2>Gönderin paylaşıldı</h2>
        <p>Bu prototipte gönderi yerel akışa eklendi. Herhangi bir sunucuya veri gönderilmedi.</p>
        <div>
          <q-btn
            unelevated
            no-caps
            color="primary"
            label="Yeni gönderi oluştur"
            @click="startNewPost"
          />
          <q-btn flat no-caps color="primary" label="Ana sayfaya dön" to="/" />
        </div>
      </section>

      <section v-else class="composer-card" aria-labelledby="composer-title">
        <div class="composer-card__intro">
          <span class="composer-eyebrow">Söz sende</span>
          <h2 id="composer-title">Ne düşünüyorsun?</h2>
          <p>Fikrini kendi sözlerinle paylaş. Taslağın bu oturum boyunca korunur.</p>
        </div>

        <div class="composer-editor">
          <q-avatar size="44px" color="blue-1" text-color="primary">
            {{ userInitials }}
          </q-avatar>
          <div class="composer-editor__field">
            <div class="composer-editor__identity">
              <strong>{{ store.user.displayName }}</strong>
              <span>{{ store.user.handle }}</span>
            </div>
            <q-input
              ref="draftInput"
              v-model="draft"
              type="textarea"
              autogrow
              borderless
              maxlength="500"
              label="Gönderi metni"
              placeholder="Ne düşünüyorsun?"
              class="composer-input"
              input-class="composer-input__native"
            />
          </div>
        </div>

        <div v-if="store.composer.attachment" class="attachment-preview">
          <div class="attachment-preview__visual" aria-hidden="true">
            <q-icon :name="store.composer.attachment.icon" size="30px" />
          </div>
          <div>
            <strong>{{ store.composer.attachment.label }}</strong>
            <span>{{ store.composer.attachment.description }}</span>
          </div>
          <q-btn
            flat
            round
            dense
            icon="close"
            aria-label="Eki kaldır"
            @click="store.setComposerAttachment(null)"
          />
        </div>

        <transition name="intervention">
          <ConstructiveIntervention
            v-if="interventionVisible"
            :key="store.composer.draftText"
            :result="store.composer.interventionResult"
            @edit="editDraft"
            @publish-anyway="publishDraft"
            @use-suggestion="useSuggestion"
          />
        </transition>

        <div class="composer-toolbar">
          <div class="composer-toolbar__tools" aria-label="Gönderi araçları">
            <q-btn flat round icon="image" aria-label="Temsili görsel ekle" @click="attachMedia" />
            <q-btn flat round icon="poll" aria-label="Temsili anket ekle" @click="attachPoll" />
            <q-btn flat round icon="mood" aria-label="Emoji ekleme yeri" disable />
          </div>
          <div class="composer-toolbar__publish">
            <span :class="{ 'character-count--near-limit': remainingCharacters < 50 }">
              {{ remainingCharacters }}
            </span>
            <q-btn
              unelevated
              no-caps
              color="primary"
              label="Paylaş"
              :disable="!canPublish"
              @click="attemptPublish"
            />
          </div>
        </div>

        <p class="composer-privacy">
          <q-icon name="lock_outline" aria-hidden="true" /> Bu prototip gönderiyi yalnızca cihazında
          tutar.
        </p>
      </section>
    </main>
  </div>
</template>

<script setup>
import { computed, nextTick, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import ConstructiveIntervention from '@/components/composer/ConstructiveIntervention.vue'
import { analyzeLanguage, DEMO_HARSH_DRAFT } from '@/services/language-intervention.js'
import { usePrototypeStore } from '@/stores/prototype.js'

const route = useRoute()
const store = usePrototypeStore()
const draftInput = ref(null)
const published = ref(false)

const draft = computed({
  get: () => store.composer.draftText,
  set: (value) => store.setComposerDraft(value),
})
const userInitials = computed(() =>
  store.user.displayName
    .split(' ')
    .slice(0, 2)
    .map((part) => part[0])
    .join(''),
)
const remainingCharacters = computed(() => 500 - store.composer.draftText.length)
const canPublish = computed(() => store.composer.draftText.trim().length > 0)
const interventionVisible = computed(
  () =>
    store.composer.interventionState === 'visible' && Boolean(store.composer.interventionResult),
)

onMounted(() => {
  if (route.query.demo === 'harsh' && !store.composer.draftText) {
    store.setComposerDraft(DEMO_HARSH_DRAFT)
  }
})

function attemptPublish() {
  if (!canPublish.value) return
  const result = analyzeLanguage(store.composer.draftText)

  if (result.severity !== 'neutral' && !store.composer.interventionDismissed) {
    store.showComposerIntervention(result)
    return
  }

  publishDraft()
}

function publishDraft() {
  store.publishComposerDraft()
  published.value = true
}

async function editDraft() {
  store.hideComposerIntervention()
  await nextTick()
  draftInput.value?.focus()
}

async function useSuggestion(suggestedText) {
  store.setComposerDraft(suggestedText)
  await nextTick()
  draftInput.value?.focus()
}

function attachMedia() {
  store.setComposerAttachment({
    type: 'image-placeholder',
    icon: 'image',
    label: 'Görsel taslağı',
    description: 'Temsili medya eki · yükleme yapılmadı',
  })
}

function attachPoll() {
  store.setComposerAttachment({
    type: 'poll-placeholder',
    icon: 'poll',
    label: 'Anket taslağı',
    description: 'Temsili anket alanı · seçenekler sonraki adımda',
  })
}

function startNewPost() {
  published.value = false
  store.clearComposer()
}
</script>

<style scoped>
.composer-page {
  min-height: 100dvh;
  color: var(--ns-text, #15171a);
  background: var(--ns-bg-subtle, #f7f8fa);
}

.composer-header {
  display: flex;
  gap: 8px;
  align-items: center;
  min-height: 64px;
  padding: 8px 16px;
  background: var(--ns-surface, #fff);
  border-bottom: 1px solid var(--ns-border, #e6e9ed);
}

.composer-header .q-btn {
  width: 44px;
  height: 44px;
  color: var(--ns-text-secondary, #5f6670);
}

.composer-header > div {
  display: grid;
}

.composer-header span {
  color: var(--ns-text-secondary, #5f6670);
  font-size: 11px;
  font-weight: 600;
}

.composer-header h1 {
  margin: 0;
  font-size: 20px;
  line-height: 1.2;
}

.composer-shell {
  width: min(100%, 720px);
  padding: 24px 16px 48px;
  margin: 0 auto;
}

.composer-card {
  display: grid;
  gap: 20px;
  padding: 20px;
  background: var(--ns-surface, #fff);
  border: 1px solid var(--ns-border, #e6e9ed);
  border-radius: var(--radius-lg, 16px);
}

.composer-card__intro {
  display: grid;
  gap: 6px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--ns-border, #e6e9ed);
}

.composer-eyebrow {
  color: var(--ns-brand, #1687f8);
  font-size: 12px;
  font-weight: 700;
}

.composer-card h2,
.composer-card p,
.composer-success h2,
.composer-success p {
  margin: 0;
}

.composer-card h2 {
  font-size: 22px;
}

.composer-card__intro p,
.composer-success p {
  color: var(--ns-text-secondary, #5f6670);
  font-size: 14px;
  line-height: 1.5;
}

.composer-editor {
  display: grid;
  grid-template-columns: 44px minmax(0, 1fr);
  gap: 12px;
}

.composer-editor__field {
  min-width: 0;
}

.composer-editor__identity {
  display: flex;
  gap: 6px;
  align-items: baseline;
  min-width: 0;
  font-size: 13px;
}

.composer-editor__identity strong,
.composer-editor__identity span {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.composer-editor__identity span {
  color: var(--ns-text-secondary, #5f6670);
}

.composer-input {
  margin-top: 4px;
}

.composer-input :deep(textarea) {
  min-height: 132px !important;
  padding: 8px 0;
  color: var(--ns-text, #15171a);
  font-size: 16px;
  line-height: 1.55;
  resize: none;
}

.attachment-preview {
  display: grid;
  grid-template-columns: 56px minmax(0, 1fr) 40px;
  gap: 12px;
  align-items: center;
  padding: 12px;
  background: var(--ns-bg-subtle, #f7f8fa);
  border: 1px solid var(--ns-border, #e6e9ed);
  border-radius: var(--radius-md, 12px);
}

.attachment-preview__visual {
  display: grid;
  place-items: center;
  width: 56px;
  height: 56px;
  color: var(--ns-brand, #1687f8);
  background: var(--ns-brand-soft, #eaf4ff);
  border-radius: 10px;
}

.attachment-preview > div:nth-child(2) {
  display: grid;
  gap: 3px;
  min-width: 0;
}

.attachment-preview strong {
  font-size: 13px;
}

.attachment-preview span {
  color: var(--ns-text-secondary, #5f6670);
  font-size: 12px;
}

.composer-toolbar {
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: space-between;
  padding-top: 12px;
  border-top: 1px solid var(--ns-border, #e6e9ed);
}

.composer-toolbar__tools,
.composer-toolbar__publish {
  display: flex;
  align-items: center;
}

.composer-toolbar__tools {
  gap: 2px;
}

.composer-toolbar__tools .q-btn {
  width: 44px;
  height: 44px;
  color: var(--ns-brand, #1687f8);
}

.composer-toolbar__publish {
  gap: 12px;
}

.composer-toolbar__publish > span {
  min-width: 28px;
  color: var(--ns-text-tertiary, #8b929b);
  font-size: 12px;
  font-variant-numeric: tabular-nums;
  text-align: right;
}

.composer-toolbar__publish .q-btn {
  min-width: 104px;
  min-height: 44px;
  border-radius: var(--radius-sm, 8px);
}

.character-count--near-limit {
  color: var(--ns-warning, #d98b16) !important;
}

.composer-privacy {
  display: flex;
  gap: 6px;
  align-items: center;
  color: var(--ns-text-tertiary, #8b929b);
  font-size: 11px;
}

.composer-success {
  display: grid;
  gap: 12px;
  justify-items: center;
  padding: 48px 24px;
  text-align: center;
  background: var(--ns-surface, #fff);
  border: 1px solid var(--ns-border, #e6e9ed);
  border-radius: var(--radius-lg, 16px);
}

.composer-success__icon {
  display: grid;
  place-items: center;
  width: 64px;
  height: 64px;
  color: var(--ns-success, #1f9d63);
  background: #eaf8f1;
  border-radius: 50%;
}

.composer-success h2 {
  font-size: 22px;
}

.composer-success > div:last-child {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
  margin-top: 8px;
}

.composer-success .q-btn {
  min-height: 44px;
}

@media (min-width: 600px) {
  .composer-header {
    padding: 8px 24px;
  }

  .composer-shell {
    padding: 40px 24px 64px;
  }

  .composer-card {
    padding: 28px;
  }
}

@media (max-width: 420px) {
  .composer-card {
    padding: 16px;
  }

  .composer-editor {
    grid-template-columns: 36px minmax(0, 1fr);
  }

  .composer-editor .q-avatar {
    font-size: 13px;
  }

  .composer-toolbar {
    align-items: stretch;
    flex-direction: column;
  }

  .composer-toolbar__publish {
    justify-content: flex-end;
  }
}
</style>
