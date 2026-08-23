<template>
  <section
    class="campaign-conversion"
    aria-labelledby="campaign-conversion-title"
    aria-live="polite"
  >
    <div class="campaign-conversion__mark" aria-hidden="true">
      <img src="/brand/nsosyal-logo.png" alt="" width="56" height="56" />
    </div>

    <div class="campaign-conversion__copy">
      <span>NSosyal geçişi · Prototip</span>
      <h2 id="campaign-conversion-title">{{ context.cta.transitionTitle }}</h2>
      <p>{{ context.cta.transitionBody }}</p>
    </div>

    <ol class="campaign-conversion__continuity" aria-label="Bağlam sürekliliği">
      <li>
        <q-icon name="check_circle" aria-hidden="true" />
        <div>
          <strong>Tepkin korundu</strong><span>{{ selectedReactionLabel }}</span>
        </div>
      </li>
      <li>
        <q-icon name="check_circle" aria-hidden="true" />
        <div>
          <strong>Bağlam korundu</strong><span>{{ context.sourceLabel }}</span>
        </div>
      </li>
      <li>
        <q-icon name="arrow_circle_right" aria-hidden="true" />
        <div><strong>Doğrudan konuşmaya geç</strong><span>Ana sayfaya yönlendirilmezsin</span></div>
      </li>
    </ol>

    <div class="campaign-conversion__actions">
      <p>Uygulama veya üyelik durumu bu frontend prototipinde güvenli biçimde simüle edilir.</p>
      <q-btn
        unelevated
        no-caps
        color="primary"
        label="NSosyal’da konuşmayı aç"
        icon-right="open_in_new"
        @click="$emit('continue')"
      />
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  context: { type: Object, required: true },
  selectedOptionId: { type: String, default: null },
})

defineEmits(['continue'])

const selectedReactionLabel = computed(
  () =>
    props.context.reaction.options.find((option) => option.id === props.selectedOptionId)?.label ??
    'Görüşün bu bağlama eklenecek',
)
</script>

<style scoped>
.campaign-conversion {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  gap: 20px 24px;
  padding: clamp(22px, 5vw, 36px);
  color: var(--ns-text);
  background: var(--ns-surface);
  border: 1px solid color-mix(in srgb, var(--ns-brand) 35%, var(--ns-border));
  border-radius: var(--radius-xl);
}

.campaign-conversion__mark {
  display: grid;
  width: 72px;
  height: 72px;
  background: var(--ns-bg);
  border: 1px solid var(--ns-border);
  border-radius: var(--radius-lg);
  place-items: center;
}

.campaign-conversion__mark img {
  display: block;
  width: 56px;
  height: 56px;
  object-fit: contain;
}

.campaign-conversion__copy > span {
  color: var(--ns-brand);
  font-size: 11px;
  font-weight: 750;
}

.campaign-conversion__copy h2 {
  margin: 5px 0 0;
  font-size: clamp(21px, 4vw, 28px);
  line-height: 1.2;
}

.campaign-conversion__copy p {
  margin: 9px 0 0;
  color: var(--ns-text-secondary);
  font-size: 13px;
  line-height: 1.55;
}

.campaign-conversion__continuity,
.campaign-conversion__actions {
  grid-column: 1 / -1;
}

.campaign-conversion__continuity {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
  padding: 0;
  margin: 0;
  list-style: none;
}

.campaign-conversion__continuity li {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  gap: 9px;
  min-width: 0;
  padding: 13px;
  background: var(--ns-bg-subtle);
  border: 1px solid var(--ns-border);
  border-radius: var(--radius-md);
}

.campaign-conversion__continuity .q-icon {
  color: var(--ns-success);
  font-size: 20px;
}

.campaign-conversion__continuity li:last-child .q-icon {
  color: var(--ns-brand);
}

.campaign-conversion__continuity li > div {
  display: grid;
  min-width: 0;
  gap: 3px;
}

.campaign-conversion__continuity strong {
  font-size: 12px;
}

.campaign-conversion__continuity span {
  overflow: hidden;
  color: var(--ns-text-secondary);
  font-size: 10px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.campaign-conversion__actions {
  display: flex;
  gap: 18px;
  align-items: center;
  justify-content: space-between;
  padding-top: 18px;
  border-top: 1px solid var(--ns-border);
}

.campaign-conversion__actions p {
  max-width: 430px;
  margin: 0;
  color: var(--ns-text-secondary);
  font-size: 10px;
  line-height: 1.45;
}

.campaign-conversion__actions .q-btn {
  flex: 0 0 auto;
  min-height: 48px;
  border-radius: var(--radius-md);
}

@media (max-width: 680px) {
  .campaign-conversion__continuity {
    grid-template-columns: minmax(0, 1fr);
  }
}

@media (max-width: 520px) {
  .campaign-conversion {
    grid-template-columns: minmax(0, 1fr);
  }

  .campaign-conversion__mark {
    width: 64px;
    height: 64px;
  }

  .campaign-conversion__actions {
    align-items: stretch;
    flex-direction: column;
  }

  .campaign-conversion__actions .q-btn {
    width: 100%;
  }
}
</style>
