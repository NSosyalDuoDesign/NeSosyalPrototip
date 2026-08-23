<template>
  <q-page class="placeholder-page">
    <PageSectionHeader :title="content.title" :description="content.description" />
    <div class="placeholder-page__body">
      <q-icon :name="content.icon" size="36px" />
      <h2>{{ content.heading }}</h2>
      <p>{{ content.body }}</p>
      <q-btn
        flat
        no-caps
        color="primary"
        :label="content.actionLabel ?? 'Ana sayfaya dön'"
        :to="content.actionTo ?? '/home'"
      />
    </div>
  </q-page>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import PageSectionHeader from '@/components/shell/PageSectionHeader.vue'
import { usePrototypeStore } from '@/stores/prototype.js'

const route = useRoute()
const store = usePrototypeStore()

const pageContent = {
  notifications: {
    title: 'Bildirimler',
    description: 'Seni ilgilendiren gelişmeler',
    icon: 'notifications_none',
    heading: 'Henüz yeni bildirimin yok',
    body: 'Yeni etkileşimler ve takip ettiğin başlıklardaki gelişmeler burada görünecek.',
  },
  profile: {
    title: 'Profil',
    description: '@ahmetzor',
    icon: 'person_outline',
    heading: 'Kişisel alanın',
    body: 'Kimliğin, ilgi alanların ve paylaşımların bu giriş noktasında bir araya gelir.',
  },
}

const content = computed(() => {
  if (route.name === 'profile') {
    return {
      ...pageContent.profile,
      description: store.user.handle,
      heading: store.user.displayName,
      body: store.user.bio,
      actionLabel: 'İlgi alanlarımı düzenle',
      actionTo: '/onboarding',
    }
  }

  return pageContent[route.name] ?? pageContent.notifications
})
</script>

<style scoped>
.placeholder-page {
  min-height: 100%;
  background: var(--ns-surface);
}

.placeholder-page__body {
  display: flex;
  min-height: 420px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: var(--space-8) var(--page-gutter);
  color: var(--ns-text-secondary);
  text-align: center;
}

.placeholder-page__body h2 {
  margin: var(--space-4) 0 var(--space-2);
  color: var(--ns-text);
  font-size: 1.125rem;
}

.placeholder-page__body p {
  max-width: 420px;
  margin: 0 0 var(--space-4);
  line-height: 1.5;
}
</style>
