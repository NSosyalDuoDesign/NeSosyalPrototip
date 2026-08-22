<template>
  <aside class="intervention" aria-labelledby="intervention-title" role="alert">
    <div class="intervention__icon" aria-hidden="true">
      <q-icon name="forum" size="22px" />
    </div>
    <div class="intervention__content">
      <h2 id="intervention-title">Bir kez daha gözden geçirmek ister misin?</h2>
      <p>
        Bu ifade karşı tarafta kırıcı algılanabilir. İstersen paylaşmadan önce düzenleyebilirsin.
      </p>

      <div v-if="showSuggestion" class="intervention__suggestion">
        <span>Daha yumuşak bir öneri</span>
        <p>{{ result.suggestedText }}</p>
        <q-btn
          flat
          no-caps
          color="primary"
          label="Öneriyi kullan"
          icon="edit_note"
          @click="$emit('use-suggestion', result.suggestedText)"
        />
      </div>

      <div class="intervention__actions">
        <q-btn flat no-caps color="primary" label="Düzenle" @click="$emit('edit')" />
        <q-btn
          v-if="result.suggestionAvailable && !showSuggestion"
          flat
          no-caps
          color="primary"
          label="Daha yumuşak öneri"
          @click="showSuggestion = true"
        />
        <q-btn
          outline
          no-caps
          color="grey-8"
          label="Yine de paylaş"
          @click="$emit('publish-anyway')"
        />
      </div>
    </div>
  </aside>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  result: {
    type: Object,
    required: true,
  },
})

defineEmits(['edit', 'publish-anyway', 'use-suggestion'])

const showSuggestion = ref(false)
</script>

<style scoped>
.intervention {
  display: grid;
  grid-template-columns: 40px minmax(0, 1fr);
  gap: 12px;
  padding: 16px;
  background: #fffaf0;
  border: 1px solid #efd9aa;
  border-radius: var(--radius-md, 12px);
}

.intervention__icon {
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  color: #9a650f;
  background: #fff1cf;
  border-radius: 10px;
}

.intervention__content {
  display: grid;
  gap: 8px;
}

.intervention h2,
.intervention p {
  margin: 0;
}

.intervention h2 {
  color: var(--ns-text, #15171a);
  font-size: 15px;
  line-height: 1.35;
}

.intervention p {
  color: var(--ns-text-secondary, #5f6670);
  font-size: 13px;
  line-height: 1.5;
}

.intervention__suggestion {
  display: grid;
  gap: 8px;
  padding: 12px;
  margin-top: 4px;
  background: var(--ns-surface, #fff);
  border: 1px solid var(--ns-border, #e6e9ed);
  border-radius: var(--radius-sm, 8px);
}

.intervention__suggestion > span {
  color: var(--ns-text-secondary, #5f6670);
  font-size: 11px;
  font-weight: 700;
}

.intervention__suggestion .q-btn {
  justify-self: start;
  min-height: 40px;
}

.intervention__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-top: 4px;
}

.intervention__actions .q-btn {
  min-height: 40px;
}

.intervention-enter-active,
.intervention-leave-active {
  overflow: hidden;
  transition:
    opacity 180ms cubic-bezier(0.2, 0, 0, 1),
    transform 180ms cubic-bezier(0.2, 0, 0, 1);
}

.intervention-enter-from,
.intervention-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}

@media (max-width: 420px) {
  .intervention {
    grid-template-columns: 1fr;
  }

  .intervention__actions {
    align-items: stretch;
    flex-direction: column;
  }

  .intervention__actions .q-btn {
    width: 100%;
  }
}

@media (prefers-reduced-motion: reduce) {
  .intervention-enter-active,
  .intervention-leave-active {
    transition: none;
  }
}
</style>
