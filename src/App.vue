<template>
  <router-view />
  <DemoToolbar />
</template>

<script setup>
import DemoToolbar from '@/components/demo/DemoToolbar.vue'
import { useTheme } from '@/composables/useTheme.js'

useTheme()
</script>
