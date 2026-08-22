<template>
  <q-layout view="hHh lpR fFf" class="campaign-layout">
    <q-header class="campaign-header">
      <q-toolbar class="campaign-header__toolbar">
        <q-btn
          flat
          round
          dense
          icon="arrow_back"
          aria-label="Ana sayfaya dön"
          to="/home"
          class="campaign-header__action"
        />
        <RouterLink to="/campaign" class="campaign-header__brand">Ne Sosyal?</RouterLink>
        <q-btn
          flat
          round
          dense
          icon="restart_alt"
          aria-label="Hazine avını baştan başlat"
          class="campaign-header__action"
          @click="restart"
        />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useTreasureHunt } from '@/composables/useTreasureHunt.js'

const router = useRouter()
const { resetTreasureHunt } = useTreasureHunt()

function restart() {
  resetTreasureHunt()
  router.push('/campaign')
}
</script>

<style scoped>
.campaign-layout {
  min-height: 100dvh;
  color: #f4f7fb;
  background:
    radial-gradient(circle at 15% 20%, rgba(32, 198, 232, 0.12), transparent 32%),
    radial-gradient(circle at 85% 80%, rgba(98, 87, 238, 0.14), transparent 34%), #0d1622;
}

.campaign-header {
  color: #f4f7fb;
  background: rgba(13, 22, 34, 0.94);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: none;
}

.campaign-header__toolbar {
  width: min(100%, 720px);
  min-height: 60px;
  margin: 0 auto;
  padding-top: env(safe-area-inset-top);
}

.campaign-header__brand {
  margin: 0 auto;
  color: #f4f7fb;
  font-weight: 750;
  letter-spacing: -0.02em;
  text-decoration: none;
}

.campaign-header__action {
  min-width: 44px;
  min-height: 44px;
  color: #c7d0dc;
}
</style>
