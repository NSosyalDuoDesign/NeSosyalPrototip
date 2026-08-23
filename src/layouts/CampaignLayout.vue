<template>
  <q-layout view="hHh lpR fFf" class="campaign-layout">
    <q-header class="campaign-header">
      <q-toolbar class="campaign-header__toolbar">
        <q-btn
          flat
          round
          dense
          icon="arrow_back"
          aria-label="NSosyal ana sayfasına dön"
          to="/home"
          class="campaign-header__action"
        />

        <RouterLink
          :to="brandTarget"
          class="campaign-header__brand"
          aria-label="NSosyal kampanya bağlamı"
        >
          <img src="/brand/nsosyal-logo.png" alt="" width="34" height="34" />
          <span>NSosyal</span>
        </RouterLink>

        <div class="campaign-header__actions">
          <q-btn
            flat
            round
            dense
            :icon="isDark ? 'light_mode' : 'dark_mode'"
            :aria-label="isDark ? 'Aydınlık moda geç' : 'Karanlık moda geç'"
            class="campaign-header__action"
            @click="toggleDarkMode"
          />
          <q-btn
            flat
            round
            dense
            icon="restart_alt"
            aria-label="Bağlam deneyimini sıfırla"
            class="campaign-header__action"
            @click="restart"
          />
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTheme } from '@/composables/useTheme.js'
import { resolveCampaignContextId } from '@/data/campaign-contexts.js'
import { usePrototypeStore } from '@/stores/prototype.js'

const route = useRoute()
const router = useRouter()
const store = usePrototypeStore()
const { isDark, toggleDarkMode } = useTheme()

const contextId = computed(() => resolveCampaignContextId(route.query.context))
const brandTarget = computed(() => ({
  name: 'campaign',
  query: { context: contextId.value, mode: 'visitor' },
}))

function restart() {
  store.resetCampaignContext(contextId.value)
  router.replace({
    name: 'campaign',
    query: {
      context: contextId.value,
      mode: 'visitor',
      ...(route.query.demo ? { demo: route.query.demo, demoStep: route.query.demoStep } : {}),
    },
  })
}
</script>

<style scoped>
.campaign-layout {
  min-height: 100dvh;
  color: var(--ns-text);
  background: var(--ns-bg-subtle);
}

.campaign-header {
  color: var(--ns-text);
  background: color-mix(in srgb, var(--ns-surface) 96%, transparent);
  border-bottom: 1px solid var(--ns-border);
  box-shadow: none;
}

.campaign-header__toolbar {
  width: min(100%, 1080px);
  min-height: 62px;
  padding-top: env(safe-area-inset-top);
  margin: 0 auto;
}

.campaign-header__brand,
.campaign-header__actions {
  display: flex;
  align-items: center;
}

.campaign-header__brand {
  min-height: var(--touch-target);
  gap: 8px;
  margin: 0 auto;
  color: var(--ns-text);
  font-size: 15px;
  font-weight: 750;
  text-decoration: none;
}

.campaign-header__brand img {
  display: block;
  width: 34px;
  height: 34px;
  object-fit: contain;
}

.campaign-header__actions {
  gap: 2px;
}

.campaign-header__action {
  min-width: 44px;
  min-height: 44px;
  color: var(--ns-text-secondary);
}

@media (max-width: 420px) {
  .campaign-header__toolbar {
    padding-right: 6px;
    padding-left: 6px;
  }

  .campaign-header__brand {
    gap: 5px;
    font-size: 13px;
  }

  .campaign-header__brand img {
    width: 30px;
    height: 30px;
  }
}
</style>
