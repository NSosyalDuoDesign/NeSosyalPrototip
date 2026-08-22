<template>
  <section class="reentry-summary" aria-labelledby="reentry-title">
    <header class="reentry-summary__header">
      <div class="reentry-summary__title">
        <div class="reentry-summary__mark" aria-hidden="true">
          <q-icon name="waving_hand" size="20px" />
        </div>
        <div>
          <span>Tekrar hoş geldin, {{ firstName }}</span>
          <h2 id="reentry-title">Sen yokken</h2>
        </div>
      </div>
      <q-btn
        flat
        round
        dense
        icon="close"
        aria-label="Sen yokken özetini kapat"
        @click="$emit('dismiss')"
      />
    </header>

    <div class="reentry-summary__update">
      <q-icon name="trending_up" size="20px" aria-hidden="true" />
      <div>
        <strong>{{ topicUpdate.title }}</strong>
        <p>{{ topicUpdate.description }}</p>
      </div>
    </div>

    <div v-if="feedbackPost" class="reentry-summary__feedback">
      <q-icon name="tune" size="18px" aria-hidden="true" />
      <span>
        Geçen sefer <strong>“İlgileniyorum”</strong> dediğin başlıklardan yeni bir seçki hazırladık.
      </span>
    </div>

    <div class="reentry-summary__items">
      <router-link to="/discover?tab=daily" class="reentry-item">
        <div class="reentry-item__icon reentry-item__icon--daily" aria-hidden="true">
          <q-icon name="bolt" />
        </div>
        <div>
          <span>Bugünün keşfi</span>
          <strong>{{ dailyItem.reentryTitle }}</strong>
          <small>{{ dailyItem.personalizedReason }}</small>
        </div>
        <q-icon name="chevron_right" aria-hidden="true" />
      </router-link>

      <router-link to="/discover?tab=weekly" class="reentry-item">
        <div class="reentry-item__icon" aria-hidden="true">
          <q-icon name="date_range" />
        </div>
        <div>
          <span>Haftayı yakala</span>
          <strong>{{ weeklyItem.reentryTitle }}</strong>
          <small>Hafta boyunca gelişenlerden</small>
        </div>
        <q-icon name="chevron_right" aria-hidden="true" />
      </router-link>

      <router-link to="/discover?tab=overlooked" class="reentry-item">
        <div class="reentry-item__icon reentry-item__icon--quiet" aria-hidden="true">
          <q-icon name="visibility_off" />
        </div>
        <div>
          <span>Gözden kaçmış olabilir</span>
          <strong>{{ overlookedItem.reentryTitle }}</strong>
          <small>Daha az kişinin gördüğü</small>
        </div>
        <q-icon name="chevron_right" aria-hidden="true" />
      </router-link>
    </div>

    <div class="reentry-summary__community">
      <q-icon name="groups" size="20px" aria-hidden="true" />
      <div>
        <span>Topluluklarından</span>
        <strong>{{ community.name }}</strong>
        <p>{{ community.description }}</p>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  firstName: {
    type: String,
    required: true,
  },
  topicUpdate: {
    type: Object,
    required: true,
  },
  dailyItem: {
    type: Object,
    required: true,
  },
  weeklyItem: {
    type: Object,
    required: true,
  },
  overlookedItem: {
    type: Object,
    required: true,
  },
  feedbackPost: {
    type: Object,
    default: null,
  },
  community: {
    type: Object,
    required: true,
  },
})

defineEmits(['dismiss'])
</script>

<style scoped>
.reentry-summary {
  overflow: hidden;
  background: var(--ns-surface, #fff);
  border: 1px solid var(--ns-border, #e6e9ed);
  border-radius: var(--radius-lg, 16px);
}

.reentry-summary__header,
.reentry-summary__title,
.reentry-summary__update,
.reentry-summary__feedback,
.reentry-summary__community,
.reentry-item {
  display: flex;
  align-items: center;
}

.reentry-summary__header {
  justify-content: space-between;
  padding: 16px;
  border-bottom: 1px solid var(--ns-border, #e6e9ed);
}

.reentry-summary__title {
  gap: 10px;
}

.reentry-summary__title > div:last-child {
  display: grid;
}

.reentry-summary__title span,
.reentry-summary__community span,
.reentry-item span {
  color: var(--ns-text-secondary, #5f6670);
  font-size: 11px;
  font-weight: 600;
}

.reentry-summary h2,
.reentry-summary p {
  margin: 0;
}

.reentry-summary h2 {
  font-size: 18px;
  line-height: 1.25;
}

.reentry-summary__mark {
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  color: var(--ns-brand, #1687f8);
  background: var(--ns-brand-soft, #eaf4ff);
  border-radius: 10px;
}

.reentry-summary__header > .q-btn {
  width: 44px;
  height: 44px;
  color: var(--ns-text-secondary, #5f6670);
}

.reentry-summary__update,
.reentry-summary__feedback,
.reentry-summary__community {
  gap: 10px;
  padding: 12px 16px;
}

.reentry-summary__update {
  align-items: flex-start;
  color: var(--ns-brand, #1687f8);
  background: var(--ns-brand-soft, #eaf4ff);
}

.reentry-summary__update > div,
.reentry-summary__community > div {
  display: grid;
  gap: 3px;
}

.reentry-summary__update strong {
  color: var(--ns-text, #15171a);
  font-size: 13px;
}

.reentry-summary__update p,
.reentry-summary__community p {
  color: var(--ns-text-secondary, #5f6670);
  font-size: 12px;
  line-height: 1.45;
}

.reentry-summary__feedback {
  align-items: flex-start;
  color: var(--ns-text-secondary, #5f6670);
  font-size: 12px;
  line-height: 1.45;
  border-bottom: 1px solid var(--ns-border, #e6e9ed);
}

.reentry-summary__feedback .q-icon {
  color: var(--ns-brand, #1687f8);
}

.reentry-summary__items {
  display: grid;
}

.reentry-item {
  display: grid;
  grid-template-columns: 40px minmax(0, 1fr) 24px;
  gap: 12px;
  min-height: 88px;
  padding: 12px 16px;
  color: inherit;
  text-decoration: none;
  border-bottom: 1px solid var(--ns-border, #e6e9ed);
  transition: background-color 160ms cubic-bezier(0.2, 0, 0, 1);
}

.reentry-item:hover {
  background: var(--ns-surface-hover, #f4f6f8);
}

.reentry-item:focus-visible {
  outline: 3px solid rgb(22 135 248 / 18%);
  outline-offset: -3px;
}

.reentry-item__icon {
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  color: #6257ee;
  background: #f0eeff;
  border-radius: 10px;
}

.reentry-item__icon--daily {
  color: var(--ns-brand, #1687f8);
  background: var(--ns-brand-soft, #eaf4ff);
}

.reentry-item__icon--quiet {
  color: #557285;
  background: #edf3f6;
}

.reentry-item > div:nth-child(2) {
  display: grid;
  gap: 3px;
  min-width: 0;
}

.reentry-item strong {
  color: var(--ns-text, #15171a);
  font-size: 13px;
  font-weight: 600;
  line-height: 1.4;
}

.reentry-item small {
  color: var(--ns-brand, #1687f8);
  font-size: 11px;
}

.reentry-item > .q-icon {
  color: var(--ns-text-tertiary, #8b929b);
}

.reentry-summary__community {
  align-items: flex-start;
  background: var(--ns-bg-subtle, #f7f8fa);
}

.reentry-summary__community > .q-icon {
  color: var(--ns-brand, #1687f8);
}

.reentry-summary__community strong {
  font-size: 13px;
}

@media (prefers-reduced-motion: reduce) {
  .reentry-item {
    transition: none;
  }
}
</style>
