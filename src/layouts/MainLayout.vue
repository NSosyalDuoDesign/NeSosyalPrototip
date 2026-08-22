<template>
  <q-layout view="hHh lpR fFf" class="ns-app-shell">
    <TopAppBar />

    <q-page-container class="ns-page-container">
      <div class="ns-shell-grid">
        <DesktopSidebar />

        <main id="main-content" class="ns-main-column" tabindex="-1">
          <router-view />
        </main>

        <RightContextRail />
      </div>
    </q-page-container>

    <MobileBottomNav />
  </q-layout>
</template>

<script setup>
import DesktopSidebar from '@/components/shell/DesktopSidebar.vue'
import MobileBottomNav from '@/components/shell/MobileBottomNav.vue'
import RightContextRail from '@/components/shell/RightContextRail.vue'
import TopAppBar from '@/components/shell/TopAppBar.vue'
</script>
