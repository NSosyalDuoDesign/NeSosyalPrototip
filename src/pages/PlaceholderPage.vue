<template>
  <q-page class="placeholder-page">
    <PageSectionHeader :title="content.title" :description="content.description" />
    <div class="placeholder-page__body">
      <q-icon :name="content.icon" size="36px" />
      <h2>{{ content.heading }}</h2>
      <p>{{ content.body }}</p>
      <q-btn flat no-caps color="primary" label="Ana sayfaya dön" to="/home" />
    </div>
  </q-page>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import PageSectionHeader from '@/components/shell/PageSectionHeader.vue'

const route = useRoute()

const pageContent = {
  discover: {
    title: 'Keşfet',
    description: 'Yeni başlıklar ve topluluklar',
    icon: 'explore',
    heading: 'Keşif alanı hazırlanıyor',
    body: 'Günlük, haftalık ve gözden kaçan içerikler sonraki geliştirme adımlarında burada buluşacak.',
  },
  create: {
    title: 'Oluştur',
    description: 'Toplulukla paylaş',
    icon: 'edit',
    heading: 'Yeni gönderi alanı hazırlanıyor',
    body: 'Gönderi oluşturma deneyimi sonraki geliştirme adımlarında bu kabuğa bağlanacak.',
  },
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
    heading: 'Profil alanı hazırlanıyor',
    body: 'Kimliğin, ilgi alanların ve paylaşımların için ayrılan bu alan yakında ayrıntılanacak.',
  },
  settings: {
    title: 'Ayarlar',
    description: 'Deneyimini kontrol et',
    icon: 'settings',
    heading: 'Tercihler alanı hazırlanıyor',
    body: 'Akış ve deneyim tercihlerini ilerleyen geliştirme adımlarında buradan yönetebileceksin.',
  },
}

const content = computed(() => pageContent[route.name] ?? pageContent.discover)
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
